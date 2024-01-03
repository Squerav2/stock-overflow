// backend/controllers/userController.js

const userService = require("../services/userService");

const getUserbyUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await userService.getUserbyUsername(username);

    if (user) {
      res.json({ message: "User found", username: user.username });
    } else {
      res.status(401).json({ error: "Invalid username" });
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "User not found" });
  }
};

// Function to get user by user_id

const getUserbyId = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await userService.getUserbyId(user_id);

    if (user) {
      res.json({ message: "User found", user });
    } else {
      res.status(401).json({ error: "Invalid user_id" });
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "User not found" });
  }
};

// Function to update user

const updateUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const updatedUser = await userService.updateUser(user_id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete user
const deleteUser = async (req, res) => {
  const { user_id } = req.body;

  try {
    const user = await userService.deleteUser(user_id);

    if (user) {
      res.json({ message: "User deleted", user_id: user.user_id });
    } else {
      res.status(401).json({ error: "Invalid user_id" });
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    res.status(500).json({ error: "User not found" });
  }
};

module.exports = {
  getUserbyUsername,
  getUserbyId,
  deleteUser,
  updateUser,
};
