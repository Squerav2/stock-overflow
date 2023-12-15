// backend/routes/watchlistRoutes.js
// routes/portfolioRoutes.js
const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');


// Add a stock to the portfolio
router.post('/add', portfolioController.addStockToPortfolio);
// Get the portfolio
router.get('/', portfolioController.getPortfolio);

// Update a stock in the portfolio
router.put('/update', portfolioController.updateStockInPortfolio);

// Delete a stock from the portfolio
router.delete('/delete', portfolioController.deleteStockFromPortfolio);

module.exports = router;
