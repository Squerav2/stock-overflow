// models/Stock.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database"); // Adjust the import path to where your Sequelize instance is configured.

class Stock extends Model {}

Stock.init(
  {
    // Model attributes are defined here
    symbol: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    s_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true, // assuming the logo is not mandatory
    },
    // You can add additional fields here if needed
  },
  {
    // Model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Stock", // We need to choose the model name
    timestamps: false, // Set to true if you want Sequelize to handle createdAt and updatedAt
    tableName: "stock", // We can specify the table name
    // You can define scopes and defaultScope here if needed
  },
);

module.exports = Stock; // Export the model directly
