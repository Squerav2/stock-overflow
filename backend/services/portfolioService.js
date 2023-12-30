// backend/services/portfolioService.js

const portfolioModel = require('../models/Portfolio');
const axios = require('axios');


const YAHOO_API_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';

// Function to get the current price from Yahoo Finance API
const getCurrentPrice = async (symbol) => {
  try {
    const response = await axios.get(`${YAHOO_API_BASE_URL}/${symbol}?region=US&lang=en-US&includePrePost=false&interval=2m&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance`);
    const currentPrice = response.data.chart.result[0].meta.regularMarketPrice;
    return currentPrice;
  } catch (error) {
    console.error(`Error fetching current price for ${symbol}:`, error.message);
    throw error;
  }
};

// Function to calculate the profit and loss
const calculateProfitAndLoss = async (userId) => {
  // Query to get the user's purchased stocks
  const userStocksQuery = 'SELECT stock_symbol, purchase_price, quantity FROM user_stocks WHERE user_id = $1';
  try {
    const { rows: userStocks } = await pool.query(userStocksQuery, [userId]);
    const profitLossPromises = userStocks.map(async (stock) => {
      const currentPrice = await getCurrentPrice(stock.stock_symbol);
      const profitLoss = (currentPrice - stock.purchase_price) * stock.quantity;
      return {
        symbol: stock.stock_symbol,
        quantity: stock.quantity,
        purchasePrice: stock.purchase_price,
        currentPrice,
        profitLoss
      };
    });
    
    const profitLossResults = await Promise.all(profitLossPromises);
    
    // Optional: Aggregate total profit/loss here if needed
    const totalProfitLoss = profitLossResults.reduce((acc, stock) => acc + stock.profitLoss, 0);

    return {
      individualStocks: profitLossResults,
      totalProfitLoss
    };
  } catch (error) {
    console.error('Error calculating profit and loss:', error.message);
    throw error;
  }
};
const getPortfolio = async () => {
  return portfolioModel.getPortfolio();
};

const addToPortfolio = async (symbol, companyName, quantity, purchasePrice) => {
  return portfolioModel.addToPortfolio(symbol, companyName, quantity, purchasePrice);
};

// add updateStockInPortfolio function
const updateStockInPortfolio = async (symbol, companyName, quantity, purchasePrice) => {
  return portfolioModel.updateStockInPortfolio(symbol, companyName, quantity, purchasePrice);
};
// add deleteStockFromPortfolio function
const deleteStockFromPortfolio = async (symbol) => {
  return portfolioModel.deleteStockFromPortfolio(symbol);
};

module.exports = {
    getPortfolio,
    addToPortfolio,
    updateStockInPortfolio,
    deleteStockFromPortfolio,
    calculateProfitAndLoss,
};
