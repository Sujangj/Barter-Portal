# E-Commerce Backend API

Backend server for the e-commerce application built with Node.js, Express.js, and MongoDB.

## Project Structure

```
backend/
├── config/           # Configuration files (database connection, etc.)
├── controllers/      # Business logic for routes
├── middleware/       # Custom middleware (authentication, etc.)
├── models/           # MongoDB schemas (User, Product, Order, etc.)
├── routes/           # API route definitions
├── server.js         # Main application entry point
├── package.json      # Project dependencies
├── .env.example      # Environment variables template
└── README.md         # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your MongoDB connection string and other configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_secure_secret_key
   NODE_ENV=development
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`)

## API Endpoints

### Health Check
- `GET /api/health` - Check if the server is running

### Authentication (to be implemented)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Products (to be implemented)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (authenticated)
- `GET /api/products/category/:category` - Get products by category

### Orders (to be implemented)
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get specific order

## Database Models

### User
- name, email, password (hashed), phone, address, city, zipCode, profileImage

### Product
- title, description, price, category, image, seller (reference to User), stock, rating, reviews

### Order
- user (reference to User), items (array of products), totalAmount, shippingAddress, status, paymentStatus

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/ecommerce |
| JWT_SECRET | Secret key for JWT tokens | your_secure_key |
| NODE_ENV | Environment type | development/production |

## CORS Configuration

The server is configured to accept Cross-Origin requests for integration with the frontend. Modify the CORS settings in `server.js` if needed.

## Security Notes

- Always use a strong JWT_SECRET in production
- Use HTTPS in production
- Validate all user inputs
- Store sensitive data securely
- Use environment variables for configuration

## Next Steps

1. Implement authentication routes in `routes/auth.js`
2. Implement product routes in `routes/products.js`
3. Implement order routes in `routes/orders.js`
4. Add input validation and error handling
5. Connect to your MongoDB instance
6. Test all endpoints with Postman or similar tools

## Connecting to Frontend

Update your React frontend to make API calls to `http://localhost:5000/api/` (or your deployed backend URL).

Example:
```javascript
const response = await fetch('http://localhost:5000/api/products', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});
```
