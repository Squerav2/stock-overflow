const WebSocket = require("ws");
const stockService = require("./stockService");
const Sequelize = require("sequelize"); // Make sure Sequelize is installed and imported

const initializeWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message", async (message) => {
      try {
        // Parse the incoming message to determine the type of request
        const request = JSON.parse(message);

        if (request.type === "getSingleStock") {
          const stockData = await stockService.getStockData(request.symbol);
          socket.send(JSON.stringify({ type: "stockData", data: stockData })); // Send back to the requesting client
        } else if (request.type === "getMultipleStocks") {
          let stocksData;
          if (request.symbols && request.symbols.length > 0) {
            stocksData = await stockService.getMultipleStockData(
              request.symbols,
            );
          } else {
            const allStockSymbols = await stockService.getAllStockSymbols();
            const symbols = allStockSymbols.map((stock) => stock.symbol);
            stocksData = await stockService.getMultipleStockData(symbols);
          }
          socket.send(JSON.stringify({ type: "stocksData", data: stocksData }));
        } else if (request.type === "searchStocks") {
          // Implement the search functionality
          const searchResults = await stockService.searchStocks(
            request.searchTerm,
          );
          socket.send(
            JSON.stringify({ type: "searchResults", results: searchResults }),
          ); // Send back to the requesting client
        } else if (request.type === "getAllStocksData") {
          // New implementation for getting all stocks data
          await getAllStocksData(socket);
        }
      } catch (error) {
        console.error("Error handling message:", error.message);
        socket.send(JSON.stringify({ error: "Error processing your request" }));
      }
    });

    socket.on("close", () => {
      console.log("Client disconnected");
    });
  });
};
// Function to get all stocks data
async function getAllStocksData(socket) {
  try {
    const allStockSymbols = await stockService.getAllStockSymbols();
    const symbols = allStockSymbols.map((stock) => stock.symbol);

    const allStocksData = await stockService.getMultipleStockData(symbols);
    socket.send(JSON.stringify({ type: "allStocksData", data: allStocksData }));
  } catch (error) {
    console.error("Error in getAllStocksData:", error.message);
    socket.send(JSON.stringify({ error: "Error fetching all stocks data" }));
  }
}

module.exports = { initializeWebSocket };
