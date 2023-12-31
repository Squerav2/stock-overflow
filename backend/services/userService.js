// backend/services/userService.js

const Users = require("../models/Users");

const getUserbyUsername = async (username) => {
  const user = await Users.findOne({ where: { username } });

  return user;
};

const getUserbyId = async (id) => {
  const user = await Users.findOne({ where: { user_id: id } }); // Use the correct column name
  return user;
};

console.log(getUserbyId(1));

module.exports = {
  getUserbyUsername,
  getUserbyId,
};
