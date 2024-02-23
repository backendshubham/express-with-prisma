// middleware/authMiddleware.js

const jwtUtils = require('../libraries/jwtUtils');

// Middleware function to check JWT token
const checkToken = (req, res, next) => {
    // Get token from request headers, query parameters, or cookies
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify token
        const decoded = jwtUtils.verifyToken(token);
        // Attach decoded payload to request object
        req.user = decoded;
        // Continue to next middleware
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = {
    checkToken,
};
