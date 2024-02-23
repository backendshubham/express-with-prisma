const express = require('express');
const auth = express.Router();
const authController = require('./../controllers/authController.js');

// Mount user routes

auth.post('/signup', authController.signup);

auth.post('/login', authController.login);

module.exports = auth;