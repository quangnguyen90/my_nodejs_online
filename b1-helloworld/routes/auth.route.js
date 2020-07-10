const express = require('express');
// Require controller (file: auth.controller.js)
const controller = require('../controllers/auth.controller');

const router = express.Router();

// LOGIN ROUTE
router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;