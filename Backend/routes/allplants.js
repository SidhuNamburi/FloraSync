// routes/allplants.js

const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant'); // Assuming you have a Plant model

// Route to get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find();
    console.log('🌿 All plants:', plants);  // Check if plants data is fetched properly

    if (!plants || plants.length === 0) {
      return res.status(404).json({ message: 'No plants found' });
    }

    // Keep the _id field and send back plant data
    const plantsWithId = plants.map(plant => {
      const { _id, ...rest } = plant.toObject(); // Convert to plain object first
      return { id: _id, ...rest }; // Keep the _id as 'id'
    });

    console.log('🌿 Plants with ID:', plantsWithId);  // Log the cleaned data with id

    return res.status(200).json(plantsWithId);
  } catch (error) {
    console.error('Error fetching plants:', error);
    return res.status(500).json({ message: 'Failed to fetch plants', error: error.message });
  }
});

module.exports = router;
