const express = require("express");
const router = express.Router();
const Plant = require("../models/Plant");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

// Route to associate an existing plant with a user
router.post("/add-plant", verifyToken, async (req, res) => {
  const { plantId } = req.body;

  if (!plantId) {
    return res.status(400).json({ message: "Plant ID is required" });
  }

  try {
    // Check if plant exists
    const existingPlant = await Plant.findById(plantId);
    if (!existingPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Add plant to user's list (if not already added)
    const user = await User.findById(req.user.userId);

    if (!user.plants.includes(plantId)) {
      user.plants.push(plantId);
      await user.save();
    }

    res.status(200).json({
      message: "Plant associated with user successfully",
      plant: existingPlant,
    });
  } catch (error) {
    console.error("Error associating plant:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
