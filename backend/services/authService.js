const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users"); // Update the path to where your User model is located

const JWT_SECRET =
  process.env.JWT_SECRET || "cfDdhZ43KIA5j74__6Im25IFNqhXPteQNpARxR4l5Mc="; // Secret key for JWT
const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

const authService = {
  registerUser: async (userData) => {
    try {
      const { username, password, name, surname, email, phone } = userData;

      // Check if user already exists with this username
      const existingUserByUsername = await User.findOne({
        where: { username },
      });
      if (existingUserByUsername) {
        throw new Error("User already exists with this username");
      }

      // Check if user already exists with this email
      const existingUserByEmail = await User.findOne({ where: { email } });
      if (existingUserByEmail) {
        throw new Error("User already exists with this email");
      }

      // Check if user already exists with this phone
      const existingUserByPhone = await User.findOne({ where: { phone } });
      if (existingUserByPhone) {
        throw new Error("User already exists with this phone");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Create the user record in the database
      const newUser = await User.create({
        username,
        name,
        surname,
        email,
        phone,
        password: hashedPassword,
        verified: false, // Initially, the user should not be verified
      });

      // Exclude password from the result
      const { password: _, ...userWithoutPassword } = newUser.get({
        plain: true,
      });
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  },

  loginUser: async (username, password) => {
    console.log("Received username:", username); // Log the received username
    console.log("Received password:", password); // Log the received password
    try {
      // Find the user by username and include the password for comparison

      const user = await User.scope("withPassword").findOne({
        where: { username },
      });
      console.log("Fetched user:", user); // Log the fetched user object

      if (!user) {
        throw new Error("User not found");
      }

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Password is incorrect");
      }

      // User matched, create JWT payload
      const payload = {
        user_id: user.user_id,
        username: user.username,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
      };

      // Sign token
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      // Return the token and user data
      return { token, user: payload };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = authService;
