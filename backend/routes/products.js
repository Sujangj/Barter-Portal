const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const productController = require('../controllers/productController');

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce/products',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const parser = multer({ storage });

// Public
router.get('/', productController.getAllProducts);
router.get('/category/:category', productController.getProductsByCategory);

// Protected
router.post('/', authenticate, parser.single('image'), productController.createProduct);
router.get('/mine', authenticate, productController.getMyListings);
router.get('/:id', productController.getProductById);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
