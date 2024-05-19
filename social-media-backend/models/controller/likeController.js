const { Like, Post } = require('../models');

const createLike = async (req, res) => {
    const { userId } = req.user;
    const { postId } = req.body;
    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const like = await Like.findOrCreate({ where: { userId, postId } });
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteLike = async (req, res) => {
    const { userId } = req.user;
    const { postId } = req.params;
    try {
        const like = await Like.findOne({ where: { userId, postId } });
        if (!like) {
            return res.status(404).json({ error: 'Like not found' });
        }
        await like.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createLike, deleteLike };
