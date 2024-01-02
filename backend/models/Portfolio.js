// models/Portfolio.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database"); // Adjust the import path to where your Sequelize instance is configured.

class Portfolio extends Model {}

Portfolio.init(
  {
    // Model attributes are defined here
    p_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // 'Users' refers to table name
        key: "user_id", // 'user_id' is the column name in the Users table
      },
    },
    stock_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 0, // assuming quantity cannot be negative
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.0, // assuming price cannot be negative
      },
    },
  },
  {
    // Model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Portfolio", // We need to choose the model name
    timestamps: false, // Set to true if you want Sequelize to handle createdAt and updatedAt
    tableName: "portfolio", // We can specify the table name
    // You can define scopes and defaultScope here if needed
  },
);

module.exports = Portfolio; // Export the model directly
