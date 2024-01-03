// backend/services/userService.js

const Users = require("../models/Users");

const userService = {
  getUserbyUsername: async (username) => {
    try {
      const user = await Users.findOne({ where: { username } });

      return user;
    } catch (error) {
      throw error;
    }
  },

  getUserbyId: async (user_id) => {
    try {
      const user = await Users.findOne({ where: { user_id } });
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Function to update user

  updateUser: async (user_id, updatedUser) => {
    try {
      const user = await Users.update(updatedUser, {
        where: { user_id },
        returning: true,
      });
      return user[1][0];
    } catch (error) {
      console.error(`Error updating user ${user_id}:`, error.message);
      throw error;
    }
  },

  // Function to delete user
  deleteUser: async (user_id) => {
    try {
      await Users.destroy({ where: { user_id } });
    } catch (error) {
      console.error(`Error deleting user ${user_id}:`, error.message);
      throw error;
    }
  },
};

module.exports = {
  userService,
  getUserbyUsername: userService.getUserbyUsername,
  getUserbyId: userService.getUserbyId,
  deleteUser: userService.deleteUser,
  updateUser: userService.updateUser,
};
