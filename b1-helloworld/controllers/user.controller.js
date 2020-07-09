// Require db (file: db.js)
const db = require('../db');
// To generate unique id
const shortid = require('shortid');
// Get user from 'db.json' - table 'users'
const users = db.get('users').value();

// Index controller
module.exports.index = function (req, res) {
    res.render('users/index', {
        users: users
    });
};

// Search cntroller
module.exports.search = function (req, res) {
    //console.log(req.query);
    var q = req.query.q;
    var matchUsers = users.filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchUsers
    });
}

// Create Controller
module.exports.create = function (req, res) {
    res.render('users/create');
}

// Get Controller
module.exports.get = function (req, res) {
    const id = req.params.id;
    //console.log(typeof id);
    const user = db.get('users').find({ id: id }).value();
    res.render('users/view', {
        user: user
    });
}

// Post creater Controller
module.exports.postCreate = function (req, res) {
    //console.log(req.body);
    console.log(res.locals);
    req.body.id = shortid.generate();

    db.get('users').push(req.body).write();
    res.redirect('/users');
}