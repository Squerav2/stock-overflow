// controllers/stockController.js
const stockService = require("../services/stockService");

const getStockInfo = async (req, res) => {
  const { symbol } = req.params;

  try {
    const stockData = await stockService.getStockData(symbol);
    res.json(stockData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stock data" });
  }
};

// controllers/stockController.js

const getMultipleStocksInfo = async (req, res) => {
  try {
    const symbols = req.body.symbols; // Assuming symbols are sent in request body
    const stocksData = await stockService.getMultipleStockData(symbols);
    res.json(stocksData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching multiple stocks data" });
  }
};

module.exports = {
  getStockInfo,
  getMultipleStocksInfo,
};

module.exports = {
  getStockInfo,
  getMultipleStocksInfo,
};
