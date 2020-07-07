const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
    // param1: path to pug template file: index.pug
    // param2: variable for HTML is object include key-value
    res.render('index', {
        name: 'AAA'
    });
});

app.get('/users', function (req, res) {
    res.render('users/index', {
        users: [
            { id: 1, name: 'Nguyen' },
            { id: 2, name: 'Phu' },
            { id: 3, name: 'Quang' }
        ]
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));