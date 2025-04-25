const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();  // To access environment variables

// Route to handle location data (get from IP or from frontend)
router.post('/location', async (req, res) => {
  const { latitude, longitude } = req.body;

  // If latitude and longitude are sent from the frontend
  if (latitude && longitude) {
    return res.json({ latitude, longitude, city: 'Unknown', country: 'Unknown' });
  }

  // Fallback if latitude and longitude are not provided (use IP geolocation)
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'YOUR_TEST_IP';
  console.log('User IP:', ip);  // Log the IP to check

  try {
    const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_API_KEY}`);
    console.log('GeoData Response:', response.data);  // Log the full response

    const { latitude, longitude, city, country } = response.data;

    if (latitude && longitude) {
      return res.json({ latitude, longitude, city, country });
    } else {
      return res.status(404).json({ error: 'Location data not found' });
    }
  } catch (error) {
    console.error('Error fetching location:', error);
    return res.status(500).json({ error: 'Failed to fetch location data' });
  }
});

module.exports = router;
