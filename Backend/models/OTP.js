const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  otp: {
    type: String,
    required: [true, 'OTP is required'],
    minlength: [6, 'OTP must be 6 characters'],
    maxlength: [6, 'OTP must be 6 characters']
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expiration time is required'],
    index: { expires: '5m' } // Auto-delete after 5 minutes
  },
  verified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('OTP', OTPSchema);