const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Watchlist = sequelize.define('Watchlist', {
    w_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', 
        key: 'user_id'
      }
    },
    Stock_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Stock', 
        key: 'symbol'
      }
    }
  });

  return Watchlist;
};
