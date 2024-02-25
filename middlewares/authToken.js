// middleware/authMiddleware.js

const jwtUtils = require('./../utils/jwtUtil');
const {encryptId, decryptId} = require('./../libraries/encryption');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Middleware function to check JWT token
const checkToken = async(req, res, next) => {
    // Get token from request headers, query parameters, or cookies
    const token = req.headers.token ? req.headers.token : null;

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify token
        const decoded = jwtUtils.verifyToken(token);

           // Decrypt ID from decoded token
           const decryptedId = decryptId(decoded.id);
        
           // Retrieve record using decrypted ID
           const userRecord = await prisma.user.findUnique({
               where: {
                   id: parseInt(decryptedId)
               }
           });
           delete userRecord.password;
           userRecord.id = encryptId(userRecord.id)
           
           if (!userRecord) {
               return res.status(404).json({ error: 'User not found' });
           }

        req.user = userRecord;
        // Continue to next middleware
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = {
    checkToken,
};
