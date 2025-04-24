const express = require('express');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const rateLimit = require('express-rate-limit');

dotenv.config();

const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('❌ Missing GEMINI_API_KEY in environment variables!');
}

const genAI = new GoogleGenerativeAI(apiKey);

// In-memory cache and token tracker
const responseCache = new Map();
const tokenUsage = new Map(); // key: IP, value: { tokens: totalTokens, timestamp: Date.now() }

const TOKEN_LIMIT_PER_MIN = 32000;

// Request limiters
const minuteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  message: 'Rate limit exceeded: Max 2 requests per minute.',
});

const dailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 50,
  message: 'Rate limit exceeded: Max 50 requests per day.',
});

// Helper to count tokens (approximation)
function countTokens(text) {
  return text.split(/\s+/).length * 1.5; // Rough estimation: 1 word = ~1.5 tokens
}

// Middleware to enforce token limit
function tokenLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  const { message, plantInfo } = req.body;
  const prompt = buildPrompt(message || '', plantInfo || {});
  const estimatedTokens = countTokens(prompt);

  const record = tokenUsage.get(ip) || { tokens: 0, timestamp: now };

  // Reset token count if over a minute has passed
  if (now - record.timestamp > 60 * 1000) {
    record.tokens = 0;
    record.timestamp = now;
  }

  if (record.tokens + estimatedTokens > TOKEN_LIMIT_PER_MIN) {
    return res.status(429).json({
      reply: `Token rate limit exceeded. Please wait a moment before sending another request.`,
    });
  }

  record.tokens += estimatedTokens;
  tokenUsage.set(ip, record);
  next();
}

router.post('/chat', minuteLimiter, dailyLimiter, tokenLimiter, async (req, res) => {
  const { message, plantInfo } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Please ask a question about your plant." });
  }

  if (!plantInfo || !plantInfo.name) {
    return res.status(400).json({ reply: "Plant information is missing or incomplete." });
  }

  const cacheKey = `${plantInfo.name}:${message}`.toLowerCase();
  if (responseCache.has(cacheKey)) {
    return res.json({
      reply: responseCache.get(cacheKey),
      cached: true,
    });
  }

  try {
    const prompt = buildPrompt(message, plantInfo);

    if (process.env.NODE_ENV === 'development' && !apiKey) {
      const devResponse = generateDevResponse(message, plantInfo);
      responseCache.set(cacheKey, devResponse);
      return res.json({ reply: devResponse });
    }

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();

    if (!reply) {
      throw new Error("Empty reply from Gemini");
    }

    responseCache.set(cacheKey, reply);
    return res.json({ reply, source: "Gemini API" });

  } catch (error) {
    console.error('Chatbot error:', error.message || error.code);
    const fallbackResponse = getFallbackResponse(error, message, plantInfo);
    return res.status(500).json({
      reply: fallbackResponse,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

function buildPrompt(message, plantInfo) {
  return `As a plant care expert, answer this question about ${plantInfo.name}:

Question: "${message}"

Plant Details:
- Type: ${plantInfo.species || 'unknown'}
- Light: ${plantInfo.careDetails?.light || 'not specified'}
- Water: ${plantInfo.careDetails?.water || 'not specified'}
- Temp: ${plantInfo.careDetails?.temp || 'not specified'}
- Humidity: ${plantInfo.careDetails?.humidity || 'not specified'}

Provide:
1. Specific answer to the question
2. Additional care tips
3. Warning signs
Keep response under 150 words and format it properly`;
}

function generateDevResponse(message, plantInfo) {
  const tips = [
    `Water your ${plantInfo.name} when the top inch of soil is dry.`,
    `${plantInfo.name} prefers ${plantInfo.careDetails?.light || 'moderate'} light.`,
    `Maintain temperature around ${plantInfo.careDetails?.temp || '18-24°C'}.`,
    `Watch for yellow leaves, which may indicate overwatering.`
  ];
  return `[DEV] Re: "${message}" - ${tips[Math.floor(Math.random() * tips.length)]}`;
}

function getFallbackResponse(error, message, plantInfo) {
  const fallbacks = [
    `I'm having trouble accessing plant care info. Try asking about ${plantInfo.name}'s ${['watering', 'light', 'temperature'][Math.floor(Math.random() * 3)]} needs.`,
    `The plant expert service is slow right now. For ${plantInfo.name}, ${['water when soil is dry', 'avoid direct sunlight', 'mist leaves regularly'][Math.floor(Math.random() * 3)]}.`,
    `I can't process your question right now. ${plantInfo.name} typically needs ${plantInfo.careDetails?.water || 'weekly'} watering.`
  ];

  if (error.code === 'ECONNABORTED') {
    return `The plant expert took too long to respond. ${fallbacks[0]}`;
  }
  if (error.response?.status === 429) {
    return "Too many requests to the plant care service. Please wait a moment.";
  }

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

module.exports = router;
