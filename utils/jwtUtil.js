const jwt = require('jsonwebtoken');

// Secret key for signing JWT tokens (keep this secret)
const JWT_SECRET = 'JHJKDJKHKJHEJK#K%H';

// Function to generate JWT token
const generateToken = (payload, expiresIn = '1h') => {
    try {
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
        return token;
    } catch (error) {
        throw new Error('Error generating JWT token');
    }
};

// Function to verify JWT token
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid JWT token');
    }
};


module.exports = {
    generateToken,
    verifyToken
};
