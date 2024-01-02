// models/Watchlist.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database"); // Adjust the import path to where your Sequelize instance is configured.

class Watchlist extends Model {}

Watchlist.init(
  {
    // Define the model attributes here
    w_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Model options go here
    sequelize, // Pass the connection instance
    modelName: "Watchlist", // Choose the model name
    timestamps: false, // Set to true to handle createdAt and updatedAt by Sequelize
    tableName: "watchlist", // Specify the table name if different from model name
    // Define scopes and defaultScope if needed
  },
);

module.exports = Watchlist; // Export the model
