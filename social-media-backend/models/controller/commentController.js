const { Post, User, Like, Comment } = require('../models');

const createPost = async (req, res) => {
    const { userId } = req.user;
    const { content, media_url } = req.body;
    try {
        const post = await Post.create({ userId, content, media_url });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getFeed = async (req, res) => {
    const { userId } = req.user;
    try {
        const user = await User.findByPk(userId, { include: [{ model: User, as: 'Followees' }] });
        const followees = user.Followees.map(followee => followee.id);
        const posts = await Post.findAll({
            where: {
                userId: followees.concat(userId)
            },
            include: [{ model: User }, { model: Like }, { model: Comment }]
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostDetails = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findByPk(postId, {
            include: [{ model: User }, { model: Like }, { model: Comment }]
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPost, getFeed, getPostDetails };
