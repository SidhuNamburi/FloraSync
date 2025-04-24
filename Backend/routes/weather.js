const express = require('express');
const router = express.Router();

// Define your route
router.get('/weather', (req, res) => {
  // Your logic to handle the weather request
  res.json({ weather: 'sunny' });
});

module.exports = router;
