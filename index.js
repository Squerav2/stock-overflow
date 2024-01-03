require("dotenv").config();

const cors = require("cors");

const express = require("express");
const http = require("http");
const path = require("path");

const app = express();

const server = http.createServer(app);

const sequelize = require("./database"); // Adjust the path to your database.js

// Importing routes
const authRoutes = require("./backend/routes/authRoutes");
const portfolioRouter = require("./backend/routes/portfolioRoutes");
const stockRoutes = require("./backend/routes/stockRoutes");
const watchlistRoutes = require("./backend/routes/watchlistRoutes");
const userRoutes = require("./backend/routes/userRoutes");

// Import WebSocket service
const websocketService = require("./backend/services/websocketService");
const { getUserbyId } = require("./backend/controllers/userController");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // This line is crucial for parsing JSON request bodies
app.use(express.urlencoded({ extended: true })); // Add this line in index.js to parse URL encoded bodies
app.use(cors());
// Route to serve the registration page
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public/register.html"));
});

// Route to serve the login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html")); // Ensure you have a login.html file in your public directory
});

// getUserbyId(1)
//     .then(user => {
//         console.log("User data:", user);
//     })
//     .catch(error => {
//         console.error("Error fetching user:", error);
//     });

// getPortfolioByUserId(1)
// .then(portfolio => {
//   console.log("portfolio", portfolio);
// }
//   )

// Use routes
app.use("/auth", authRoutes);
app.use("/portfolio", portfolioRouter);
app.use("/stock", stockRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/user", userRoutes);

// Initialize WebSocket Service
websocketService.initializeWebSocket(server);

// Sync all models that are not already in the database
sequelize.sync();

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
