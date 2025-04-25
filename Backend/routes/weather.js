// weather.js (Backend route)
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// OpenWeatherMap API Key from environment variable
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// GET /api/user/weather?latitude=...&longitude=...
router.get('/weather', async (req, res) => {
  const { latitude, longitude, units = 'metric', lang = 'en' } = req.query;  // Fetch latitude and longitude from query parameters

  // Log the received parameters for debugging
  console.log('Received latitude:', latitude, 'longitude:', longitude);

  // Check if latitude and longitude are provided
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    // Fetch weather data from OpenWeatherMap API
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: OPENWEATHERMAP_API_KEY,
        units,
        lang,
      },
    });

    const data = response.data;
    const weather = {
      location: data.name, // City name
      country: data.sys.country, // Country code
      description: data.weather[0].description, // Weather description
      temperature: data.main.temp, // Temperature
      feels_like: data.main.feels_like, // Feels like temperature
      humidity: data.main.humidity, // Humidity percentage
      windSpeed: data.wind.speed, // Wind speed
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, // Weather icon
    };

    // Send the weather data as a response
    res.json(weather);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

module.exports = router;
