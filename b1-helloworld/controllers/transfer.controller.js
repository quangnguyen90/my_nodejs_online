// Require db (file: db.js)
const db = require('../db');
// To generate unique id
const shortid = require('shortid');

// Create Transfer Controller
module.exports.create = function (req, res, next) {
    res.render('transfer/create', {
        csrfToken: req.csrfToken()
    });
};

// Post Create Controller
module.exports.postCreate = function (req, res, next) {
    const data = {
        id: shortid.generate(),
        amount: parseInt(req.body.amount),
        accountId: req.body.accountId,
        userId: req.signedCookies.userId
    }
    db.get('transfers').push(data).write();
    res.redirect('/transfer/create');
};