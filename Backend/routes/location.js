const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import the User model
const authenticate = require("../middleware/verifyToken"); // Custom middleware to authenticate users

// Update user's location
router.post("/location", authenticate, async (req, res) => {  // Remove '/api' part here
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude and longitude are required." });
  }

  try {
    // Find user and update their location
    const user = await User.findById(req.user.userId); 
    // req.user.id comes from the authenticate middleware
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update latitude and longitude
    user.latitude = latitude;
    user.longitude = longitude;

    await user.save(); // Save the user's updated location

    return res.status(200).json({ message: "Location updated successfully.", location: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error, please try again later." });
  }
});

module.exports = router;
