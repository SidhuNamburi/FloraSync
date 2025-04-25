const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const rateLimit = require("express-rate-limit");
const axios = require("axios");

dotenv.config();

const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const responseCache = new Map();
const tokenUsage = new Map();

const TOKEN_LIMIT_PER_MIN = 32000;

// Rate limiting configuration
const minuteLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  message: "Rate limit exceeded: Max 2 requests per minute.",
});

const dailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 50,
  message: "Rate limit exceeded: Max 50 requests per day.",
});

function countTokens(text) {
  return Math.round(text.split(/\s+/).length * 1.5);
}

// Token usage limiter
function tokenLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const { message, plantInfo } = req.body;
  const prompt = buildPrompt(message || "", plantInfo || {}, {});
  const estimatedTokens = countTokens(prompt);

  const record = tokenUsage.get(ip) || { tokens: 0, timestamp: now };

  if (now - record.timestamp > 60 * 1000) {
    record.tokens = 0;
    record.timestamp = now;
  }

  if (record.tokens + estimatedTokens > TOKEN_LIMIT_PER_MIN) {
    return res.status(429).json({
      reply: "Token rate limit exceeded. Please wait a moment before sending another request.",
    });
  }

  record.tokens += estimatedTokens;
  tokenUsage.set(ip, record);
  next();
}

// Chatbot route
router.post("/chatbot", minuteLimiter, dailyLimiter, tokenLimiter, async (req, res) => {
  const { message, plantInfo, latitude, longitude } = req.body;
  console.log(latitude,longitude);
  if (!message) {
    return res.status(400).json({ reply: "Please ask a question about your plant." });
  }

  if (!plantInfo || !plantInfo.name) {
    return res.status(400).json({ reply: "Plant information is missing or incomplete." });
  }

  if (!apiKey && process.env.NODE_ENV !== "development") {
    return res.status(500).json({ reply: "Gemini API key is missing." });
  }

  let weather = {};
  if (latitude && longitude) {
    try {
      const weatherUrl = `http://localhost:5000/api/user/weather?latitude=${latitude}&longitude=${longitude}`;
      const weatherResponse = await axios.get(weatherUrl, { timeout: 3000 });
      if (!weatherResponse.data || !weatherResponse.data.temperature || !weatherResponse.data.humidity) {
        throw new Error("Incomplete weather data from the weather API.");
      }

      weather = weatherResponse.data;
    } catch (error) {
      console.warn("Weather fetch failed:", error.message);
    }
  }

  const safeMessage = message.replace(/\n/g, " ");
  const prompt = buildPrompt(safeMessage, plantInfo, weather);

  const shouldCache = !latitude || !longitude;
  const cacheKey = shouldCache ? `${plantInfo.name}:${safeMessage}`.toLowerCase() : null;

  if (shouldCache && responseCache.has(cacheKey)) {
    return res.json({
      reply: responseCache.get(cacheKey),
      cached: true,
    });
  }

  try {
    if (process.env.NODE_ENV === "development" && !apiKey) {
      const devResponse = generateDevResponse(safeMessage, plantInfo);
      if (shouldCache) responseCache.set(cacheKey, devResponse);
      return res.json({ reply: devResponse });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    if (!reply) throw new Error("Empty reply from Gemini");

    if (shouldCache) responseCache.set(cacheKey, reply);
    return res.json({ reply, source: "Gemini API" });
  } catch (error) {
    console.error("Chatbot error:", error.message || error.code);
    console.error("Request body:", req.body);

    const fallbackResponse = getFallbackResponse(error, safeMessage, plantInfo);
    return res.status(500).json({
      reply: fallbackResponse,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Prompt builder
function buildPrompt(message, plantInfo, weather = {}) {
  return `
As a plant care expert, answer this question about ${plantInfo.name}:

Question: "${message}"

Plant Details:
- Type: ${plantInfo.species || "unknown"}
- Light: ${plantInfo.careDetails?.light || "not specified"}
- Water: ${plantInfo.careDetails?.water || "not specified"}
- Temp: ${plantInfo.careDetails?.temp || "not specified"}
- Humidity: ${plantInfo.careDetails?.humidity || "not specified"}

Current Weather at User's Location:
- Location: ${weather.location || "unknown"}, ${weather.country || ""}
- Temperature: ${weather.temperature || "N/A"}°C (feels like ${weather.feels_like || "N/A"}°C)
- Humidity: ${weather.humidity || "N/A"}%
- Wind: ${weather.windSpeed || "N/A"} m/s
- Condition: ${weather.description || "N/A"}

Provide:
1. Specific answer to the question
2. Additional care tips
3. Warning signs
Keep response under 150 words and format it properly.
  `;
}

// Development fallback
function generateDevResponse(message, plantInfo) {
  const tips = [
    `Water your ${plantInfo.name} when the top inch of soil is dry.`,
    `${plantInfo.name} prefers ${plantInfo.careDetails?.light || "moderate"} light.`,
    `Maintain temperature around ${plantInfo.careDetails?.temp || "18-24°C"}.`,
    `Watch for yellow leaves, which may indicate overwatering.`,
  ];
  return `[DEV] Re: "${message}" - ${tips[Math.floor(Math.random() * tips.length)]}`;
}

// Error fallback
function getFallbackResponse(error, message, plantInfo) {
  const fallbacks = [
    `I'm having trouble accessing plant care info. Try asking about ${plantInfo.name}'s ${["watering", "light", "temperature"][Math.floor(Math.random() * 3)]} needs.`,
    `The plant expert service is slow right now. For ${plantInfo.name}, ${["water when soil is dry", "avoid direct sunlight", "mist leaves regularly"][Math.floor(Math.random() * 3)]}.`,
    `I can't process your question right now. ${plantInfo.name} typically needs ${plantInfo.careDetails?.water || "weekly"} watering.`,
  ];

  if (error.code === "ECONNABORTED") {
    return `The plant expert took too long to respond. ${fallbacks[0]}`;
  }
  if (error.response?.status === 429) {
    return "Too many requests to the plant care service. Please wait a moment.";
  }

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

module.exports = router;
