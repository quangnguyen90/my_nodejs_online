const express = require('express');
// Require controller (file: product.controller.js)
const controller = require('../controllers/transfer.controller');

const router = express.Router();
// TRANSFER ROUTE
router.get('/create', controller.create);

router.post('/create', controller.postCreate);

module.exports = router;