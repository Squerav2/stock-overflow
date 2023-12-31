// services/stockService.js
const axios = require("axios");

const YAHOO_API_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart";
const YAHOO_API_MODULE_PATH = "?module=history";
const YAHOO_API_REGION = "&region=TR";
const YAHOO_API_INTERVAL = "&interval=1m";

const getStockData = async (symbol) => {
  try {
    const response = await axios.get(
      `${YAHOO_API_BASE_URL}/${symbol}${YAHOO_API_MODULE_PATH}${YAHOO_API_REGION}${YAHOO_API_INTERVAL}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    throw error;
  }
};

// Function to send the latest stock data
const getLatestStockData = async () => {
  try {
    const stockData = await getStockData("BTC-USD");
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
};

const formatStockData = (stockData, symbol) => {
  const latestQuote = stockData.chart.result[0].indicators.quote[0];
  return {
    symbol,
    open: latestQuote.open[latestQuote.open.length - 1],
    low: latestQuote.low[latestQuote.low.length - 1],
    high: latestQuote.high[latestQuote.high.length - 1],
    close: latestQuote.close[latestQuote.close.length - 1],
    volume: latestQuote.volume[latestQuote.volume.length - 1],
  };
};

const getMultipleStockData = async (symbols) => {
  try {
    const promises = symbols.map((symbol) =>
      getStockData(symbol).then((stockData) =>
        formatStockData(stockData, symbol),
      ),
    );
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Error fetching multiple stock data:", error.message);
    throw error;
  }
};
module.exports = {
  getStockData,
  getLatestStockData,
  getMultipleStockData,
  formatStockData,
};
