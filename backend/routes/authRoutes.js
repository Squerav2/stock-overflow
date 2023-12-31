// backend/routes/authRoutes.js
const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

// Route for user registration
authRouter.post('/register', authController.registerUser);

// Route for user login
authRouter.post('/login', authController.loginUser);

module.exports = authRouter;
