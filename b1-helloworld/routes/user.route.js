const express = require('express');
// Require controller (file: user.controller.js)
const controller = require('../controllers/user.controller');

// Require middleware (file: user.validate.js)
const validate = require('../validate/user.validate');

const router = express.Router();

// USER CRUD
router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;
