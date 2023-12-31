// routes/stockRoutes.js
const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

router.post("/multiple", stockController.getMultipleStocksInfo);

module.exports = router;
