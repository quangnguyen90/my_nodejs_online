// Require db (file: db.js)
const db = require('../db');
// To generate unique id
const shortid = require('shortid');
// Required md5 hash
const md5 = require('md5');
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
    // Test: Get cookie data
    console.log(req.cookies);
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
    req.body.password = md5(req.body.password);
    //req.body.avatar = req.file.path.split("/").slice(1).join("/");
    req.body.avatar = req.file.path.split("\\").slice(1).join("\\");

    db.get('users').push(req.body).write();
    res.redirect('/users');
}