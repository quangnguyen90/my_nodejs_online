const express = require('express');
// Require controller (file: product.controller.js)
const controller = require('../controllers/product.controller');

const router = express.Router();
// PRODUCT ROUTE
router.get('/', controller.index);

router.get('/search', controller.search);

module.exports = router;