// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const authService = require("../services/authService");

// Usually, you would obtain the secret from an environment variable for security
const JWT_SECRET =
  process.env.JWT_SECRET || "cfDdhZ43KIA5j74__6Im25IFNqhXPteQNpARxR4l5Mc=";
const JWT_EXPIRES_IN = "1h";

const authController = {
  registerUser: async (req, res) => {
    try {
      // This will call the registerUser function from authService.js
      const userWithoutPassword = await authService.registerUser(req.body);

      // Respond with the user data without password
      return res.status(201).json({
        message: "User registered successfully",
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error("Error registering the user:", error.message);
      return res.status(500).json({
        error: "Registration failed",
        message: error.message,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the user exists
      const user = await User.scope("withPassword").findOne({
        where: { username },
      });

      if (!user || !user.password) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      if (!password || !user.password) {
        return res.status(400).json({ error: "Invalid request" });
      }

      // Check if the password is correct
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.log("Received password:", password); // Log the received username
          console.log("User's password:", user.password); // Log the received password
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }
      } catch (error) {
        console.error("Error during password comparison:", error);
        return res.status(500).json({ error: "An error occurred" });
      }

      // Create a token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      // Respond with token
      return res.json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      console.error("Error logging in:", error.message);
      return res.status(500).json({
        error: "Login failed",
        message: error.message,
      });
    }
  },
};

module.exports = authController;

// const registerUser = async (req, res) => {
//   try {
//     const { username, password, name, surname, email, phone } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // // Create the user record in the database
//     // const newUser = await User.create({
//     //   username,
//     //   name,
//     //   surname,
//     //   email,
//     //   phone,
//     //   password: hashedPassword, // Store the hashed password, not the plaintext password
//     //   verified: false
//     // });

//     // Respond with success but do not log the user in automatically
//     // You might want to implement email verification first
//     return res.status(201).json({
//       message: 'User registered successfully',
//     });
//   } catch (error) {
//     console.error('Error registering the user:', error.message);
//     return res.status(500).json({
//       error: 'Registration failed',
//       message: error.message
//     });
//   }
// };

// const loginUser = async (req, res) => {

//   try {
//     const { username, password } = req.body;

//     // Check if the user exists
//         // Override the default scope to include the password
//         const user = await User.scope('withPassword').findOne({ where: { username } })

//     // console.log(user); // Check the retrieved user object

//     if (!user || !user.password) {
//       console.log("AAAAAAAA", password, "user.password", user.password)
//       return res.status(401).json({ error: 'Invalid username or password' });
//   }

//     if (!password || !user.password) {
//       console.log("password", password, "user.password", user.password)
//       return res.status(400).json({ error: 'Invalid request' });
//   }

//     // Check if the password is correct
//     try {
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("Received password:", password); // Log the received username
//       console.log("User's password:", user.password); // Log the received password
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }
//   } catch (error) {
//     console.error('Error during password comparison:', error);
//     return res.status(500).json({ error: 'An error occurred' });
// }
//     // Create a token
//     const token = jwt.sign(
//       { id: user.id },
//       JWT_SECRET,
//       { expiresIn: JWT_EXPIRES_IN }
//     );

//     // Respond with token
//     return res.json({
//       message: 'Login successful',
//       token
//     });
//   } catch (error) {
//     console.error('Error logging in:', error.message);
//     return res.status(500).json({
//       error: 'Login failed',
//       message: error.message
//     });
//   }
// };
