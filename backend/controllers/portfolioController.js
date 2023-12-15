// controllers/portfolioController.js
const portfolioService = require('../services/portfolioService');

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await portfolioService.getPortfolio();
    res.json({ portfolio });
  } catch (error) {
    console.error('Error getting portfolio:', error.message);
    res.status(500).json({ error: 'Failed to get portfolio' });
  }
};

const addStockToPortfolio = async (req, res) => {
  const { symbol, companyName, quantity, purchasePrice } = req.body;

  try {
    await portfolioService.addToPortfolio(symbol, companyName, quantity, purchasePrice);
    res.json({ message: 'Stock added to portfolio' });
  } catch (error) {
    console.error('Error adding stock to portfolio:', error.message);
    res.status(500).json({ error: 'Failed to add stock to portfolio' });
  }
};
//add updateStockInPortfolio function
const updateStockInPortfolio = async (req, res) => {
  const { symbol, companyName, quantity, purchasePrice } = req.body;

  try {
    await portfolioService.updateStockInPortfolio(symbol, companyName, quantity, purchasePrice);
    res.json({ message: 'Stock updated in portfolio' });
  } catch (error) {
    console.error('Error updating stock in portfolio:', error.message);
    res.status(500).json({ error: 'Failed to update stock in portfolio' });
  }
};
// add deleteStockFromPortfolio function
const deleteStockFromPortfolio = async (req, res) => {
  const { symbol } = req.body;

  try {
    await portfolioService.deleteStockFromPortfolio(symbol);
    res.json({ message: 'Stock deleted from portfolio' });
  } catch (error) {
    console.error('Error deleting stock from portfolio:', error.message);
    res.status(500).json({ error: 'Failed to delete stock from portfolio' });
  }
};
module.exports = {
    getPortfolio,
    addStockToPortfolio,
    updateStockInPortfolio,
    deleteStockFromPortfolio,
};
