// controllers/stockController.js
const stockService = require("../services/stockService");
const Stock = require("../models/Stock"); // Import the Stock model

const searchStocks = async (req, res) => {
  const searchTerm = req.query.term; // Get the search term from query params

  try {
    const results = await Stock.findAll({
      where: {
        symbol: {
          [Sequelize.Op.like]: `${searchTerm.toUpperCase()}%`, // Search for stocks that start with the search term
        },
      },
      limit: 10, // Limit the results to 10 items (optional)
    });

    // Send the results back to the client
    res.json(results);
  } catch (error) {
    console.error("Error during stock search:", error.message);
    res.status(500).json({ error: "Error searching for stocks" });
  }
};
const getStockInfo = async (req, res) => {
  const { symbol } = req.params;

  try {
    const stockData = await stockService.getStockData(symbol);
    res.json(stockData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching stock data" });
  }
};

const getAllStocks = async (req, res) => {
  try {
    const stocks = await stockService.getAllStocks();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching all stocks" });
  }
};

const getMultipleStocksInfo = async (req, res) => {
  try {
    const symbols = req.body.symbols; // Assuming symbols are sent in request body
    const stocksData = await stockService.getMultipleStockData(symbols);
    res.json(stocksData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching multiple stocks data" });
  }
};

const getAllStockSymbols = async (req, res) => {
  try {
    const stocks = await stockService.getAllStockSymbols();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching all stocks" });
  }
};

module.exports = {
  getStockInfo,
  getMultipleStocksInfo,
  searchStocks,
  getAllStockSymbols,
  getAllStocks,
};
