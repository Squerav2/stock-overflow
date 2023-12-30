// backend/controllers/userController.js

const userService = require('../services/userService');

const getUserbyUsername = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await userService.getUserbyUsername(username);

        if (user) {
            res.json({ message: 'User found', username: user.username });
        } else {
            res.status(401).json({ error: 'Invalid username' });
        }
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ error: 'User not found' });
    }
}

const getUserbyId = async (req, res) => {
    const { id } = req.body;

    try {
        const user = await userService.getUserbyId(id);

        if (user) {
            res.json({ message: 'User found', username: user.username });
        } else {
            res.status(401).json({ error: 'Invalid username' });
        }
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ error: 'User not found' });
    }
}


module.exports = {
    getUserbyUsername,
    getUserbyId,
};