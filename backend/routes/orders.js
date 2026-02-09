const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.post('/', authenticate, orderController.createOrder);
router.get('/', authenticate, orderController.getMyOrders);
router.get('/:id', authenticate, orderController.getOrderById);

module.exports = router;
