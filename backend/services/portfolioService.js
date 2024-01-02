// backend/services/portfolioService.js
const { getPortfolioByUserId } = require("../controllers/portfolioController");
const Portfolio = require("../models/Portfolio");
const axios = require("axios");
const YAHOO_API_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart";

const portfolioService = {
  // Function to get the current price from Yahoo Finance API
  getCurrentPrice: async (symbol) => {
    try {
      const response = await axios.get(
        `${YAHOO_API_BASE_URL}/${symbol}?region=US&lang=en-US&includePrePost=false&interval=2m&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance`,
      );
      const currentPrice =
        response.data.chart.result[0].meta.regularMarketPrice;
      return currentPrice;
    } catch (error) {
      console.error(
        `Error fetching current price for ${symbol}:`,
        error.message,
      );
      throw error;
    }
  },

  // Function to calculate the profit and loss
  calculateProfitAndLoss: async (userId) => {
    // Query to get the user's purchased stocks
    const userStocksQuery =
      "SELECT stock_symbol, purchase_price, quantity FROM user_stocks WHERE user_id = $1";
    try {
      const { rows: userStocks } = await pool.query(userStocksQuery, [userId]);
      const profitLossPromises = userStocks.map(async (stock) => {
        const currentPrice = await getCurrentPrice(stock.stock_symbol);
        const profitLoss =
          (currentPrice - stock.purchase_price) * stock.quantity;
        return {
          symbol: stock.stock_symbol,
          quantity: stock.quantity,
          purchasePrice: stock.purchase_price,
          currentPrice,
          profitLoss,
        };
      });

      const profitLossResults = await Promise.all(profitLossPromises);

      // Optional: Aggregate total profit/loss here if needed
      const totalProfitLoss = profitLossResults.reduce(
        (acc, stock) => acc + stock.profitLoss,
        0,
      );

      return {
        individualStocks: profitLossResults,
        totalProfitLoss,
      };
    } catch (error) {
      console.error("Error calculating profit and loss:", error.message);
      throw error;
    }
  },
  // Function to get all portfolios by user_id

  getPortfolioByUserId: async (user_id) => {
    try {
      const portfolio = await Portfolio.findAll({
        where: { user_id },
      });
      return portfolio;
    } catch (error) {
      console.error(
        `Error getting portfolio for user ${user_id}:`,
        error.message,
      );
      throw error;
    }
  },

  // Function to update the portfolio
  updatePortfolio: async (p_id, updatedPortfolio) => {
    try {
      const portfolio = await Portfolio.update(updatedPortfolio, {
        where: { p_id },
        returning: true,
      });
      return portfolio[1][0];
    } catch (error) {
      console.error(`Error updating portfolio ${p_id}:`, error.message);
      throw error;
    }
  },

  // Function to delete the portfolio
  deletePortfolio: async (p_id) => {
    try {
      await Portfolio.destroy({ where: { p_id } });
    } catch (error) {
      console.error(`Error deleting portfolio ${p_id}:`, error.message);
      throw error;
    }
  },
};

module.exports = {
  portfolioService,
  getCurrentPrice: portfolioService.getCurrentPrice,
  calculateProfitAndLoss: portfolioService.calculateProfitAndLoss,
  getPortfolioByUserId: portfolioService.getPortfolioByUserId,
  updatePortfolio: portfolioService.updatePortfolio,
  deletePortfolio: portfolioService.deletePortfolio,
};
