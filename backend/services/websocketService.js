// websocketService.js
const WebSocket = require("ws");
const stockService = require("./stockService");

const initializeWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (socket) => {
    console.log("Client connected");

    const updateInterval = setInterval(async () => {
      try {
        const latestData = await stockService.getLatestStockData();
        socket.send(JSON.stringify(latestData));
      } catch (error) {
        console.error("Error sending stock update:", error.message);
      }
    }, 10000); // Update every 10 seconds

    socket.on("close", () => {
      console.log("Client disconnected");
      clearInterval(updateInterval);
    });
  });
};

module.exports = { initializeWebSocket };
