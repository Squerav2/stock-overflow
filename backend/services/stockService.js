// services/stockService.js
const axios = require("axios");

const YAHOO_API_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart";
const YAHOO_API_MODULE_PATH = "?module=history";
const YAHOO_API_REGION = "&region=TR";
const YAHOO_API_INTERVAL = "&interval=1m";

const Stock = require("../models/Stock");
const Sequelize = require("sequelize");

const stockService = {
  getStockData: async (symbol) => {
    try {
      const response = await axios.get(
        `${YAHOO_API_BASE_URL}/${symbol}${YAHOO_API_MODULE_PATH}${YAHOO_API_REGION}${YAHOO_API_INTERVAL}`,
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching stock data:", error.message);
      throw error;
    }
  },
  getLatestStockData: async () => {
    try {
      const stockData = await stockService.getStockData("BTC-USD");
      const latestQuote = stockData.chart.result[0].indicators.quote[0];
      return {
        open: latestQuote.open[latestQuote.open.length - 1],
        low: latestQuote.low[latestQuote.low.length - 1],
        high: latestQuote.high[latestQuote.high.length - 1],
        close: latestQuote.close[latestQuote.close.length - 1],
        volume: latestQuote.volume[latestQuote.volume.length - 1],
      };
    } catch (error) {
      console.error("Error fetching latest stock data:", error.message);
      throw error;
    }
  },
  formatStockData: (stockData, symbol) => {
    const latestQuote = stockData.chart.result[0].indicators.quote[0];
    return {
      symbol,
      open: latestQuote.open[latestQuote.open.length - 1],
      low: latestQuote.low[latestQuote.low.length - 1],
      high: latestQuote.high[latestQuote.high.length - 1],
      close: latestQuote.close[latestQuote.close.length - 1],
      volume: latestQuote.volume[latestQuote.volume.length - 1],
    };
  },
  getMultipleStockData: async (symbols) => {
    try {
      const promises = symbols.map((symbol) =>
        stockService
          .getStockData(symbol)
          .then((stockData) => stockService.formatStockData(stockData, symbol)),
      );
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      console.error("Error fetching multiple stock data:", error.message);
      throw error;
    }
  },
  searchStocks: async (searchTerm) => {
    try {
      const results = await Stock.findAll({
        where: {
          symbol: {
            [Sequelize.Op.iLike]: `${searchTerm}%`, // Case-insensitive 'like' search
          },
        },
        limit: 5, // Limit the results to 5 items or however many you prefer
      });
      return results.map((stock) => stock.dataValues); // Return a simple array of objects
    } catch (error) {
      console.error("Error during stock search:", error);
      throw error; // Rethrow the error and let the calling function handle it
    }
  },
  getAllStocks: async () => {
    try {
      const stocks = await Stock.findAll();
      return stocks;
    } catch (error) {
      console.error("Error fetching all stocks:", error.message);
      throw error;
    }
  },
  // Function to get symbols of all stocks

  getAllStockSymbols: async () => {
    try {
      const stocks = await Stock.findAll({
        attributes: ["symbol"],
      });
      return stocks;
    } catch (error) {
      console.error("Error fetching all stocks:", error.message);
      throw error;
    }
  },
  getStockInfo: async (symbol) => {
    try {
      const stock = await Stock.findByPk(symbol);
      return stock;
    } catch (error) {
      console.error("Error fetching stock info:", error.message);
      throw error;
    }
  },
};

module.exports = {
  stockService,
  getAllStocks: stockService.getAllStocks,
  getStockInfo: stockService.getStockInfo,
  searchStocks: stockService.searchStocks,
  getMultipleStocksData: stockService.getMultipleStockData,
  getLatestStockData: stockService.getLatestStockData,
  getStockData: stockService.getStockData,
  formatStockData: stockService.formatStockData,
  getAllStockSymbols: stockService.getAllStockSymbols,
};
