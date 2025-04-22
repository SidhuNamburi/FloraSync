const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

router.get('/plants', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('plants');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const plants = user.plants || []; // Default to empty array if no plants
    return res.status(200).json({
      success: true,
      data: plants,
      message: plants.length ? 'Plants fetched successfully' : 'No plants saved yet.',
    });
  } catch (error) {
    console.error('Error fetching plants:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch plants',
      error: error.message,
    });
  }
});

module.exports = router;
