const express = require('express');
// Required controller (file: user.controller.js)
const controller = require('../controllers/user.controller');

const router = express.Router();

// USER CRUD
router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create', controller.postCreate);

module.exports = router;



