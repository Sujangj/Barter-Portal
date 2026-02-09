const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, image } = req.body;
    const imageUrl = req.file?.path || image;
    const product = new Product({ title, description, price, category, stock, image: imageUrl, seller: req.userId });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category }).populate('seller', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyListings = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.userId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.seller.toString() !== req.userId) return res.status(403).json({ message: 'Not authorized' });
    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllProducts, getProductById, createProduct, getProductsByCategory, getMyListings, deleteProduct };
