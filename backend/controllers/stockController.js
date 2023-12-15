// controllers/stockController.js
const stockService = require('../services/stockService');

const getStockInfo = async (req, res) => {
  const { symbol } = req.params;

  try {
    const stockData = await stockService.getStockData(symbol);
    res.json(stockData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stock data' });
  }
};


module.exports = {
  getStockInfo,
};
