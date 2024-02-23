const express = require('express');
const router = express.Router();

// Import routes from modules
const moduleRoutes = require('./../modules/auth/routes/index');

// Use routes from modules
router.use('/', moduleRoutes);

module.exports = router;