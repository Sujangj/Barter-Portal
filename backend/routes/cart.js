const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const cartController = require('../controllers/cartController');

router.get('/', authenticate, cartController.getCart);
router.post('/', authenticate, cartController.addItem);
router.put('/', authenticate, cartController.updateItem);
router.delete('/:productId', authenticate, cartController.removeItem);

module.exports = router;
