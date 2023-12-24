const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Portfolio = sequelize.define('Portfolio', {
    p_id: {
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

  return Portfolio;
};
