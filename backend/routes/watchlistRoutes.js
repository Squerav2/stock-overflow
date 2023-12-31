// routes/watchlistRoutes.js
const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlistController");

// Get the watchlist
router.get("/", watchlistController.getWatchlist);

// Add a stock to the watchlist
router.post("/add", watchlistController.addStockToWatchlist);

module.exports = router;
