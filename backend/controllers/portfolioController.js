// backend/controllers/portfolioController.js
const Portfolio = require('../models/Portfolio');
const portfolioService = require('../services/portfolioService');

const portfolioController = {
  createPortfolio: async (req, res) => {
    try {
      const portfolio = await Portfolio.create(req.body);
      res.status(201).json(portfolio);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },


  getPortfolioByUserId: async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const portfolio = await portfolioService.getPortfolioByUserId(user_id);
      if (portfolio) {
        res.json(portfolio);
      } else {
        res.status(404).json({ error: 'Portfolio not found for the given user' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = portfolioController;
