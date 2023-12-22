const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Users = sequelize.define('Users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    namee: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    passwordd: DataTypes.STRING,
    verified: DataTypes.BOOLEAN
  });

  return Users;
};