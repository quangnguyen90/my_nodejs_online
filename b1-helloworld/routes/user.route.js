const express = require('express');
// To generate unique id
const shortid = require('shortid');
// Required db
const db = require('../db');

const router = express.Router();

// Get user from 'db.json' - table 'users'
const users = db.get('users').value();

// USER CRUD
router.get('/', function (req, res) {
    res.render('users/index', {
        users: users
    });
});

// router.get('/search', function (req, res) {
//     //console.log(req.query);
//     var q = req.query.q;
//     var matchUsers = users.filter(function (user) {
//         return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
//     });

//     res.render('users/index', {
//         users: matchUsers
//     });
// });

router.get('/:id', function (req, res) {
    const id = req.params.id;
    //console.log(typeof id);
    const user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    });
});



router.get('/create', function (req, res) {
    res.render('users/create');
});

router.post('/create', function (req, res) {
    //console.log(req.body);
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

module.exports = router;



