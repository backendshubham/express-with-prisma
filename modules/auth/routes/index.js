const express = require('express');
const auth = express.Router();
const authController = require('./../controllers/authController.js');
const {checkToken} = require('./../../../middlewares/authToken.js');


// Mount user routes

auth.post('/signup', authController.signup);

auth.post('/login', authController.login);

auth.get('/user-detail', checkToken, authController.userDetail);

module.exports = auth;