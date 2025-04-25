// backend/routes/plants.js
const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant'); // Your Plant model

// Route to get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();

    if (!plants || plants.length === 0) {
      return res.status(404).json({ message: 'No plants found' });
    }

    // Convert MongoDB documents to plain objects and map _id to id
    const plantsWithId = plants.map((plant) => {
      const { _id, ...rest } = plant.toObject();
      return { id: _id.toString(), ...rest }; // Ensure _id is converted to string for consistency
    });

    return res.status(200).json(plantsWithId);
  } catch (error) {
    console.error('Error fetching plants:', error);
    return res.status(500).json({ message: 'Failed to fetch plants', error: error.message });
  }
});

module.exports = router;
