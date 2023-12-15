// controllers/authController.js
const authService = require('../services/authService');

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    await authService.registerUser(username, password);
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.loginUser(username, password);

    if (user) {
      // You may generate and send a token here for authentication purposes
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = {
  register,
  login,
};
