const express = require('express')
// Use bodyParser to get query params as object with key-value
const bodyParser = require('body-parser');
// Import user route (file user.route.js)
const userRoute = require('./routes/user.route');

const port = 3000

const app = express();
// Setting view engine with Pug
app.set('view engine', 'pug');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Get static files in folder "public"
app.use(express.static('public'));

// HOME PAGE
app.get('/', function (req, res) {
    // param1: path to pug template file: index.pug
    // param2: variable for HTML is object include key-value
    res.render('index', {
        name: 'Home Page'
    });
});

// USER ROUTE
app.use('/users', userRoute);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));