


const { User } = require('../models');

const findUsers = async (req, res) => {
    const { query } = req.query;
    try {
        const users = await User.findAll({ where: { username: query } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const followUser = async (req, res) => {
    const { userId } = req.user;
    const { followeeId } = req.body;
    try {
        const user = await User.findByPk(followeeId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.addFollower(userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { findUsers, followUser };
