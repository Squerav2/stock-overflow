// routes/watchlistRoutes.js
const express = require("express");
const watchlistController = require("../controllers/watchlistController");
const router = express.Router();

router.get("/:user_id", watchlistController.getWatchlistByUserId);
router.post("/", watchlistController.addToWatchlist);
router.delete("/:stock_id", watchlistController.deleteStockFromWatchlist);

module.exports = router;
