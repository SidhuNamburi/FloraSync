// routes/allplants.js

const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant'); // Assuming you have a Plant model

// Route to get all plants
router.get('/', async (req, res) => {
  try {
    // Fetch all plants from the database
    const plants = await Plant.find();

    if (!plants || plants.length === 0) {
      return res.status(404).json({ message: 'No plants found' });
    }

    // Return the plants directly
    return res.status(200).json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    return res.status(500).json({ message: 'Failed to fetch plants', error: error.message });
  }
});

module.exports = router;
