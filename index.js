require('dotenv').config();
const { getStockData } = require('./backend/services/stockService');

const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

// Example route for the home page
app.get('/', async (req, res) => {
  try {
    const defaultSymbol = 'AAPL'; // example default symbol
    const symbol = req.query.symbol || defaultSymbol;
    const stockData = await getStockData(symbol);
    const historicalData = stockData.chart.result[0];

    if (historicalData) {
      const timestamps = historicalData.timestamp.map((timestamp) => new Date(timestamp * 1000));

      const limitedData = {
        symbol: historicalData.meta.symbol,
        timePeriod: historicalData.meta.validRanges[0],
        stockData: {
          timestamps,
          open: historicalData.indicators.quote[0].open,
          low: historicalData.indicators.quote[0].low,
          high: historicalData.indicators.quote[0].high,
          close: historicalData.indicators.quote[0].close,
          volume: historicalData.indicators.quote[0].volume,
        },
      };

      res.json(limitedData);
    } else {
      res.status(404).json({ error: 'No historical data available for the given symbol.' });
    }
  } catch (error) {
    console.error('Error fetching stock data:', error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Function to send the latest stock data
async function sendLatestStockData(socket) {
  try {
    const stockData = await getStockData('AAPL'); // Replace 'AAPL' with your desired symbol
    const latestQuote = stockData.chart.result[0].indicators.quote[0];
    const latestData = {
      open: latestQuote.open[latestQuote.open.length - 1],
      low: latestQuote.low[latestQuote.low.length - 1],
      high: latestQuote.high[latestQuote.high.length - 1],
      close: latestQuote.close[latestQuote.close.length - 1],
      volume: latestQuote.volume[latestQuote.volume.length - 1]
    };
    socket.send(JSON.stringify(latestData));
  } catch (error) {
    console.error('Error sending stock update:', error.message);
  }
}

// WebSocket handling
wss.on('connection', (socket) => {
  console.log('Client connected');

  // Send stock data immediately upon connection
  sendLatestStockData(socket);

  // Then continue to send updates at intervals
  const updateInterval = setInterval(() => {
    sendLatestStockData(socket);
  }, 5000); // Adjust this interval as needed

  socket.on('close', () => {
    console.log('Client disconnected');
    clearInterval(updateInterval);
  });
});

// Routes
const authRoutes = require('./backend/routes/authRoutes');
const portfolioRoutes = require('./backend/routes/portfolioRoutes');
const stockRoutes = require('./backend/routes/stockRoutes');
const watchlistRoutes = require('./backend/routes/watchlistRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/stock', stockRoutes);
app.use('/watchlist', watchlistRoutes);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
