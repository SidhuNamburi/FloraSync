const express = require('express');
const bcrypt = require('bcryptjs');
const OTP = require('../models/OTP');
const User = require('../models/User');

const router = express.Router();

router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;

    if (!email || !newPassword || !otp) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const otpRecord = await OTP.findOne({ email: email.toLowerCase().trim(), otp, verified: true });

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

module.exports = router;
