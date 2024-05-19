const express = require('express');
const router = express.Router();
const { createPost, getFeed, getPostDetails } = require('../controllers/postController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, createPost);
router.get('/feed', authenticate, getFeed);
router.get('/:postId', authenticate, getPostDetails);

module.exports = router;
