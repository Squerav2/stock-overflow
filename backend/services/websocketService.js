const WebSocket = require("ws");
const stockService = require("./stockService");

const initializeWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  const sendMultipleStockData = async () => {
    // Define the symbols you want to fetch here or get them from somewhere else
    const symbols = ["BTC-USD", "ETH-USD", "DOGE-USD"];
    try {
      const stockData = await stockService.getMultipleStockData(symbols);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(stockData));
        }
      });
    } catch (error) {
      console.error(
        "Error fetching/sending multiple stock data:",
        error.message,
      );
    }
  };

  // Fetch and send stock data immediately when the server starts
  sendMultipleStockData();

  // Set up an interval to fetch and send stock data every 10 seconds
  setInterval(sendMultipleStockData, 10000);

  wss.on("connection", (socket) => {
    console.log("Client connected");

    // If you want to send data immediately when a new client connects
    sendMultipleStockData();

    socket.on("close", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = { initializeWebSocket };
