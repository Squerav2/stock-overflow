const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Stock = sequelize.define('Stock', {
    symbol: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    s_name: DataTypes.STRING,
    Logo: DataTypes.TEXT
  });

  return Stock;
};