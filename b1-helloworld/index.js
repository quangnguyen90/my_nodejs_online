const express = require('express')
const app = express()
// Integrate DB using lowdb for demo
var bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

const port = 3000

// Setting view engine with Pug
app.set('view engine', 'pug');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Get user from 'db.json' - table 'users'
var users = db.get('users').value();

// HOME PAGE
app.get('/', function (req, res) {
    // param1: path to pug template file: index.pug
    // param2: variable for HTML is object include key-value
    res.render('index', {
        name: 'Home Page'
    });
});

// USER CRUD
app.get('/users', function (req, res) {
    res.render('users/index', {
        users: users
    });
});

app.get('/users/search', function (req, res) {
    //console.log(req.query);
    var q = req.query.q;
    var matchUsers = users.filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchUsers
    });
});

app.get('/users/create', function (req, res) {
    res.render('users/create');
});

app.post('/users/create', function (req, res) {
    //console.log(req.body);
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));