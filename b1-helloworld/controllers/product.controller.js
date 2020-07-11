// Require db (file: db.js)
const db = require('../db');
// Get products from 'db.json' - table 'products'
const products = db.get('products').value();

// Index controller
module.exports.index = function (req, res) {
    var page = parseInt(req.query.page) || 1; // page n
    var perPage = 8; // x item each page
    var start = (page - 1) * perPage;
    var end = page * perPage;

    // Case 2: use lowdb methods: drop
    // var drop = (page - 1) * perPage;

    res.render('products/index', {
        // case 1: use lowdb methods: drop
        // products: db.get('products').drop(drop).take(perPage).value()

        // case 2: do by self
        products: products.slice(start, end)
    });
};

// Search cntroller
module.exports.search = function (req, res) {
    var q = req.query.q;
    var matchProducts = products.filter(function (product) {
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('products/index', {
        products: matchProducts
    });
};
