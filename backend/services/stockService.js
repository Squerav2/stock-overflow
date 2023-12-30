// services/stockService.js
const axios = require('axios');

const YAHOO_API_BASE_URL = 'https://query1.finance.yahoo.com/v8/finance/chart';
const YAHOO_API_MODULE_PATH = '?module=history';
const YAHOO_API_REGION = '&region=TR';
const YAHOO_API_INTERVAL = '&interval=1m';

const getStockData = async (symbol) => {
  try {
    const response = await axios.get(
      `${YAHOO_API_BASE_URL}/${symbol}${YAHOO_API_MODULE_PATH}${YAHOO_API_REGION}${YAHOO_API_INTERVAL}`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    throw error;
  }
};

// Test call
// getStockData('BTC-USD')
//   .then(data => {
//     const historicalData = data.chart.result[0]; // Assuming there is only one result for simplicity

//     if (historicalData) {
//       console.log('Symbol:', historicalData.meta.symbol);
//       console.log('Time Period:', historicalData.meta.validRanges[0]);
//       console.log('Stock Data:', historicalData.indicators.quote[0]);
//     } else {
//       console.log('No historical data available for the given symbol.');
//     }
//   })
//  .catch(error => console.error('Error:', error.message));


module.exports = {
  getStockData,
};
