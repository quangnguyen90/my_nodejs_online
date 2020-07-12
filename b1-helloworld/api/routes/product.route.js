const express = require('express');
// Require controller (file: api/controllers/product.controller.js)
const controller = require('../controllers/product.controller');

const router = express.Router();

router.get('/', controller.index);

module.exports = router;