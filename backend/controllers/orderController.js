const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, shippingCity, shippingZipCode, paymentMethod } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: 'No items provided' });

    const order = new Order({
      user: req.userId,
      items,
      totalAmount,
      shippingAddress,
      shippingCity,
      shippingZipCode,
      paymentMethod,
      paymentStatus: 'pending',
    });

    await order.save();

    // Clear user's cart
    await Cart.findOneAndDelete({ user: req.userId });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createOrder, getMyOrders, getOrderById };
