// models/Users.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database"); // Adjust the import path to where your Sequelize instance is configured.

class Users extends Model {}

Users.init(
  {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: [7, 20],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW
    // }
  },
  {
    // Model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Users", // We need to choose the model name
    timestamps: false,
    tableName: "users", // We can specify the table name
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ["password"] },
      },
    },
  },
);

module.exports = Users; // Export the model directly
