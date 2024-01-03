// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route to get a user by username
router.post("/getUserByUsername", userController.getUserbyUsername);

// Route to get a user by user_id
router.get("/getUserById/:user_id", userController.getUserbyId);

// Route to delete a user by user_id
router.delete("/deleteUser:user_id", userController.deleteUser);

// Route to update a user by user_id
router.put("/updateUser/:user_id", userController.updateUser);

module.exports = router;
