// backend/routes/watchlistRoutes.js
// routes/portfolioRoutes.js
const express = require("express");
const portfolioRouter = express.Router();
const portfolioController = require("../controllers/portfolioController");

// Define the route for creating a portfolio
portfolioRouter.post("/create", portfolioController.createPortfolio);

// Define the route for getting a portfolio by ID
portfolioRouter.get("/user/:user_id", portfolioController.getPortfolioByUserId);

// Define the route for updating a portfolio
portfolioRouter.put("/:p_id", portfolioController.updatePortfolio);

// Define the route for deleting a portfolio
portfolioRouter.delete("/:p_id", portfolioController.deletePortfolio);

module.exports = portfolioRouter;
