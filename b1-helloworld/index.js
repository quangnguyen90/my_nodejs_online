const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const port = 3000

app.set('view engine', 'pug');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var users = [
    { id: 1, name: 'Nguyen' },
    { id: 2, name: 'Phu' },
    { id: 3, name: 'Quang' }
]

app.get('/', function (req, res) {
    // param1: path to pug template file: index.pug
    // param2: variable for HTML is object include key-value
    res.render('index', {
        name: 'AAA'
    });
});

// USER
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
    users.push(req.body);
    res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));