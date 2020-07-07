const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug');
app.set('views', './views');

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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));