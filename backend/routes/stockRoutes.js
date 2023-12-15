// routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Define stock routes
router.get('/:symbol', stockController.getStockInfo);

module.exports = router;
