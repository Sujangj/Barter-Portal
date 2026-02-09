const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/me', authenticate, userController.getProfile);
router.put('/me', authenticate, userController.updateProfile);

module.exports = router;
