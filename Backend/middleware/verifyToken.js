const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  // If no token is provided, send a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach decoded user data to the request object for use in route handlers
    req.user = decoded; // decoded.userId will now be available

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, send a 403 Forbidden response
    return res.status(403).json({ message: 'Invalid token or expired token.' });
  }
};

module.exports = verifyToken;
