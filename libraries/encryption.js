const crypto = require('crypto');

// Encryption key (keep this secret)
const ENCRYPTION_KEY = 'KJHDKFH#E#I$HKJK%JLKH^LKH#%';

// Function to encrypt an ID
const encryptId = (id) => {
    const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
    let encryptedId = cipher.update(id.toString(), 'utf8', 'hex');
    encryptedId += cipher.final('hex');
    return encryptedId;
};

// Function to decrypt an ID
const decryptId = (encryptedId) => {
    const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
    let decryptedId = decipher.update(encryptedId, 'hex', 'utf8');
    decryptedId += decipher.final('utf8');
    return decryptedId;
};

module.exports = {
    encryptId,
    decryptId,
};