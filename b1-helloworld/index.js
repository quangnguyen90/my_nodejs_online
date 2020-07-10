// Require env
require('dotenv').config();
const express = require('express')
// Use bodyParser to get query params as object with key-value
const bodyParser = require('body-parser');
// Use cookieParser to get cookie data
const cookieParser = require('cookie-parser');
// Import user route (file user.route.js)
const userRoute = require('./routes/user.route');
// Import auth route (file auth.route.js)
const authRoute = require('./routes/auth.route');
// Require auth middleware (file: auth.middleware.js)
const authMiddleware = require('./middlewares/auth.middleware');

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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));