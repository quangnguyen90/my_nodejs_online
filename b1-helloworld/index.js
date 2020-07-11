// Require env
require('dotenv').config();
const express = require('express')
// Use bodyParser to get query params as object with key-value
const bodyParser = require('body-parser');
// Use cookieParser to get cookie data
const cookieParser = require('cookie-parser');
// Require CSURF Middleware
const csurf = require('csurf');
// Import user route (file user.route.js)
const userRoute = require('./routes/user.route');
// Import product route (file product.route.js)
const productRoute = require('./routes/product.route');
// Import auth route (file auth.route.js)
const authRoute = require('./routes/auth.route');
// Import cart route (file cart.route.js)
const cartRoute = require('./routes/cart.route');
// Import transfer route (file transfer.route.js)
const transferRoute = require('./routes/transfer.route');

// Require auth middleware (file: auth.middleware.js)
const authMiddleware = require('./middlewares/auth.middleware');
// Require session middleware (file: session.middlware.js)
const sessionMiddlware = require('./middlewares/session.middleware');

const port = 3000

const app = express();
// Setting view engine with Pug
app.set('view engine', 'pug');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Use cookieParser
app.use(cookieParser(process.env.SESSION_SECRET));

// Use session middleware for all route
app.use(sessionMiddlware);

// setup csrf middlewares
app.use(csurf({ cookie: true }));

// Get static files in folder "public"
app.use(express.static('public'));

// HOME PAGE
app.get('/', function (req, res) {
    // param1: path to pug template file: index.pug
    // param2: variable for HTML is object include key-value
    res.render('index', {
        name: 'NodeJs'
    });
});

// USER ROUTE
app.use('/users', authMiddleware.requireAuth, userRoute);

// AUTH ROUTE
app.use('/auth', authRoute);

// PRODUCT ROUTE
app.use('/products', productRoute);

// CART ROUTE
app.use('/cart', cartRoute);

// TRANSFER ROUTE
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));