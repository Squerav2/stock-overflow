// routes/stockRoutes.js
const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

router.post("/multiple", stockController.getMultipleStocksInfo);
router.get("/search", stockController.searchStocks); // Add a route for the search endpoint
router.get("/all", stockController.getAllStocks); // Add a route for the get all stocks endpoint
router.get("/info/:symbol", stockController.getStockInfo);
router.get("/symbols", stockController.getAllStockSymbols); // Add a route for the get all stocks endpoint

module.exports = router;
