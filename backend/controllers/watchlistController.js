// controllers/watchlistController.js
const watchlistService = require("../services/watchlistService");

const watchlistController = {
  getWatchlistByUserId: async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const watchlist = await watchlistService.getWatchlistByUserId(user_id);
      res.json(watchlist);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  addToWatchlist: async (req, res) => {
    try {
      const { symbol, companyName } = req.body;
      const stock = await watchlistService.addToWatchlist(symbol, companyName);
      res.json(stock);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteStockFromWatchlist: async (req, res) => {
    try {
      const { symbol } = req.params;
      const stock = await watchlistService.deleteStockFromWatchlist(symbol);
      res.json(stock);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = watchlistController;
