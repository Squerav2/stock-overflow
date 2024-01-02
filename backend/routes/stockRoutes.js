// routes/stockRoutes.js
const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

router.post("/multiple", stockController.getMultipleStocksInfo);
router.get("/search", stockController.searchStocks); // Add a route for the search endpoint

module.exports = router;
