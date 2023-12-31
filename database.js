// database.js

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("stock_overflow", "postgres", "postgres", {
  host: "localhost",
  port: 5433,
  dialect: "postgres",
  logging: console.log,
});

module.exports = sequelize;
