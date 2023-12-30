// database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('stock_overflow', 'postgres', 'postgres', { // Replace 'postgres' with your database username and password.
  host: 'localhost', // Replace with the appropriate hostname if different.
  port: 5433, // Ensure this is the correct port where PostgreSQL is running.
  dialect: 'postgres',
  logging: console.log, // Set to console.log to see the queries being executed.
});

module.exports = sequelize;
