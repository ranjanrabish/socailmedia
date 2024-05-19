const express = require('express');
const router = express.Router();
const { createLike, deleteLike } = require('../controllers/likeController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, createLike);
router.delete('/:postId', authenticate, deleteLike);

module.exports = router;
