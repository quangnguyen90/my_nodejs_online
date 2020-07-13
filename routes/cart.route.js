const express = require('express');
// Require controller (file: cart.controller.js)
const controller = require('../controllers/cart.controller');

const router = express.Router();

// CART ROUTE
router.get('/add/:productId', controller.addToCart);

module.exports = router;