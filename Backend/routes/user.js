const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Plant = require('../models/Plant');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

router.get('/plants', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('plants');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.status(200).json({ 
      success: true,
      plants: user.plants 
    });
  } catch (error) {
    console.error("Error fetching user plants:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch plants",
      error: error.message 
    });
  }
});

// Route to add a new plant for the user
router.post('/plants', verifyToken, async (req, res) => {
  const { name, species, description, light, water, temp, humidity, imageUrl } = req.body;

  try {
    // Create a new plant object
    const newPlant = new Plant({
      name,
      species,
      description,
      light,
      water,
      temp,
      humidity,
      imageUrl
    });

    // Save the new plant to the database
    await newPlant.save();

    // Find the user and add the plant to their list
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.plants.push(newPlant._id);
    await user.save();

    res.status(201).json({ message: 'Plant added successfully', plant: newPlant });
  } catch (error) {
    console.error("Error adding plant:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to remove a plant from the user's collection
router.delete('/plants/:id', verifyToken, async (req, res) => {
  const plantId = req.params.id;

  try {
    // Find the user
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the plant is in the user's collection
    if (!user.plants.includes(plantId)) {
      return res.status(400).json({ message: 'Plant not found in user\'s collection' });
    }

    // Remove the plant from the user's plants array
    user.plants = user.plants.filter((plant) => plant.toString() !== plantId);
    await user.save();

    // Optionally, delete the plant from the database
    await Plant.findByIdAndDelete(plantId);

    res.status(200).json({ message: 'Plant removed successfully' });
  } catch (error) {
    console.error("Error removing plant:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
