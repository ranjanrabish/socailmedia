const express = require('express');
const router = express.Router();
const { findUsers, followUser } = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.get('/search', authenticate, findUsers);
router.post('/follow', authenticate, followUser);

module.exports = router;
