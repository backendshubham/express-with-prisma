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

module.exports = {
    generateToken,
};
