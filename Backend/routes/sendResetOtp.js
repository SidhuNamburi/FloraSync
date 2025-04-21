const express = require('express');
const nodemailer = require('nodemailer');
const OTP = require('../models/OTP');
const User = require('../models/User');

const router = express.Router();

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

router.post('/send-reset-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: "Valid email required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(200).json({ success: true, message: "If this email exists, we've sent an OTP" });
    }

    await OTP.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await new OTP({ email, otp, expiresAt }).save();

    const mailOptions = {
      from: `"FloroSync" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Password Reset OTP',
      html: `<p>Your OTP is:</p><h2>${otp}</h2><p>Expires in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "If this email exists, we've sent an OTP" });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

module.exports = router;
