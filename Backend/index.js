require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { rateLimit } = require('express-rate-limit');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const connectDB = require('./dbms');

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

const User = require('./models/User');
const OTP = require('./models/OTP');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Apply rate limiting to auth routes
app.use('/api/auth', authLimiter);
app.use('/api', apiLimiter);

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      success: true,
      message: 'Signup successful',
      user: { id: newUser._id, username: newUser.username, email: newUser.email },
      token
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Send Reset OTP
app.post('/api/auth/send-reset-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Valid email required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      // Don't reveal if email exists or not
      return res.status(200).json({ 
        success: true, 
        message: "If this email exists, we've sent an OTP" 
      });
    }

    await OTP.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await new OTP({ email, otp, expiresAt }).save();

    const mailOptions = {
      from: `"FloroSync" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Password Reset OTP',
      html: `
        <p>You requested a password reset. Your OTP is:</p>
        <h2>${otp}</h2>
        <p>This code will expire in 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: "If this email exists, we've sent an OTP" 
    });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// Verify OTP
app.post('/api/auth/verify-reset-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({ success: false, message: "Valid email and 6-digit OTP required" });
    }

    const otpRecord = await OTP.findOne({ 
      email: email.toLowerCase().trim(), 
      otp 
    });
    
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    await OTP.updateOne({ _id: otpRecord._id }, { verified: true });

    const tempToken = generateTempToken(email);
    res.status(200).json({ 
      success: true, 
      message: "OTP verified", 
      tempToken 
    });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;

    if (!email || !newPassword || !otp) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const otpRecord = await OTP.findOne({ 
      email: email.toLowerCase().trim(), 
      otp, 
      verified: true 
    });
    
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Invalid or unverified OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.updateOne({ email }, { password: hashedPassword });

    await OTP.deleteMany({ email });

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

function generateTempToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});