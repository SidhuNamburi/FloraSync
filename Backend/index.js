require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { rateLimit } = require('express-rate-limit');
const connectDB = require('./dbms');  // Your DB connection setup

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",  // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Rate limiting for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting middleware only to authentication routes
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/auth', require('./routes/signup'));
app.use('/api/auth', require('./routes/login'));
app.use('/api/auth', require('./routes/sendResetOtp'));
app.use('/api/auth', require('./routes/verifyResetOtp'));
app.use('/api/auth', require('./routes/resetPassword'));
app.use('/api/user', require('./routes/user'));  // Routes related to user, like /api/user/plants
app.use('/api/user', require('./routes/addPlants'));  // Route for adding a plant
app.use('/api/plants', require('./routes/allplants'));  // Route for getting all plants
app.use('/api/user', require('./routes/weather'));  // Route for getting weather data
app.use('/api/chat', require('./routes/chatbot'));  // Route for chatbot interaction
app.use('/api', require('./routes/location'));  // Route for location data

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
