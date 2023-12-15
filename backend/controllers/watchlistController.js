// controllers/watchlistController.js
const watchlistService = require('../services/watchlistService');

const getWatchlist = async (req, res) => {
  try {
    const watchlist = await watchlistService.getWatchlist();
    res.json({ watchlist });
  } catch (error) {
    console.error('Error getting watchlist:', error.message);
    res.status(500).json({ error: 'Failed to get watchlist' });
  }
};
       
const addStockToWatchlist = async (req, res) => {
  const { symbol, companyName } = req.body;

  try {
    await watchlistService.addToWatchlist(symbol, companyName);
    res.json({ message: 'Stock added to watchlist' });
  } catch (error) {
    console.error('Error adding stock to watchlist:', error.message);
    res.status(500).json({ error: 'Failed to add stock to watchlist' });
  }
};

module.exports = {
  getWatchlist,
  addStockToWatchlist,
};
