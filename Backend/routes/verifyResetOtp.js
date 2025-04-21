const express = require('express');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/verify-reset-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({ success: false, message: "Valid email and 6-digit OTP required" });
    }

    const otpRecord = await OTP.findOne({ email: email.toLowerCase().trim(), otp });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    await OTP.updateOne({ _id: otpRecord._id }, { verified: true });

    const tempToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.status(200).json({ success: true, message: "OTP verified", tempToken });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
