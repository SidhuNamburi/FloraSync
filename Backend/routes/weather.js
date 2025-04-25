const express = require('express');
const axios = require('axios');  // For making HTTP requests
const router = express.Router();

// OpenWeatherMap API Key (replace with your actual API key)
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Route to get weather based on location (latitude and longitude)
router.get('/weather', async (req, res) => {
  // Fetch location data (latitude and longitude)
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    // Fetch weather data from OpenWeatherMap API
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: OPENWEATHERMAP_API_KEY,
        units: 'metric',  // Temperature in Celsius
      },
    });

    // Extract weather information from the response
    const weatherData = response.data;
    const weather = {
      description: weatherData.weather[0].description,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
    };

    // Send the weather data as a response
    res.json(weather);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

module.exports = router;
