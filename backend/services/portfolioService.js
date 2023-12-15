// services/portfolioService.js
const portfolioModel = require('../models/Portfolio');

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
};
