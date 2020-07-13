const express = require('express');
// Require middlware "multer" to validata form-data
const multer = require('multer');

// Require controller (file: user.controller.js)
const controller = require('../controllers/user.controller');

// Require middleware (file: user.validate.js)
const validate = require('../validate/user.validate');

// Define folder to store file upload
const upload = multer({ dest: './public/uploads/' });

const router = express.Router();

// Test: Set Cookie
router.get('/cookie', function (req, res, next) {
    res.cookie('user-id', 12345);
    res.send("Hello cookie");
});

// USER CRUD
router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.post('/create',
    upload.single('avatar'),
    validate.postCreate,
    controller.postCreate
);

module.exports = router;
