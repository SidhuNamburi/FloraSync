const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
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

module.exports = router;
