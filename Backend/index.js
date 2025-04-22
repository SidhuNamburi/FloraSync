require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { rateLimit } = require('express-rate-limit');
const connectDB = require('./dbms');

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

// Connect to database
connectDB();

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/auth', require('./routes/signup'));
app.use('/api/auth', require('./routes/login'));
app.use('/api/auth', require('./routes/sendResetOtp'));
app.use('/api/auth', require('./routes/verifyResetOtp'));
app.use('/api/auth', require('./routes/resetPassword'));
app.use('/api/user', require('./routes/user'));  // Routes related to user, like /api/user/plants
app.use('/api/user', require('./routes/addPlants'));  // Route for adding a plant
app.use('/api/plants', require('./routes/allplants'));  // Corrected route for getting all plants

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
