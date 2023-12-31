// backend/routes/watchlistRoutes.js
// routes/portfolioRoutes.js
const express = require('express');
const portfolioRouter = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Define the route for creating a portfolio
portfolioRouter.post('/create', portfolioController.createPortfolio);

// Define the route for getting a portfolio by ID
portfolioRouter.get('/user/:user_id', portfolioController.getPortfolioByUserId);

module.exports = portfolioRouter;
