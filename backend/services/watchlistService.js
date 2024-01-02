// services/watchlistService.js
const { get } = require("mongoose");
const Watchlist = require("../models/Watchlist");

const watchlistService = {
  // Function to get all stocks in the watchlist by user_id
  getWatchlistByUserId: async (user_id) => {
    try {
      const watchlist = await Watchlist.findAll({
        where: { user_id },
      });
      return watchlist;
    } catch (error) {
      throw new Error(error);
    }
  },

  addToWatchlist: async (symbol, companyName) => {
    try {
      const stock = await Watchlist.create({ symbol, companyName });
      return stock;
    } catch (error) {
      throw new Error(error);
    }
  },

  deleteStockFromWatchlist: async (symbol) => {
    try {
      const stock = await Watchlist.findOneAndDelete({ symbol });
      return stock;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = {
  watchlistService,
  getWatchlistByUserId: watchlistService.getWatchlistByUserId,
  addToWatchlist: watchlistService.addToWatchlist,
  deleteStockFromWatchlist: watchlistService.deleteStockFromWatchlist,
};
