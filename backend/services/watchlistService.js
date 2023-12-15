// services/watchlistService.js
const watchlistModel = require('../models/Watchlist');

const getWatchlist = async () => {
  return watchlistModel.getWatchlist();
};

const addToWatchlist = async (symbol, companyName) => {
  return watchlistModel.addToWatchlist(symbol, companyName);
};

module.exports = {
  getWatchlist,
  addToWatchlist,
};
