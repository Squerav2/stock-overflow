// services/authService.js
const bcrypt = require('bcrypt'); // For password hashing (you may need to install it with npm install bcrypt)
const UserModel = require('../models/User'); // Assuming you have a User model

const registerUser = async (username, password) => {
  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database
  const user = new UserModel({
    username,
    password: hashedPassword,
  });

  return user.save();
};

const loginUser = async (username, password) => {
  // Find the user in the database
  const user = await UserModel.findOne({ username });

  // Check if the user exists and the password is correct
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }

  return null; // Authentication failed
};

module.exports = {
  registerUser,
  loginUser,
};
