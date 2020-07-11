// Require db (file: db.js)
const db = require('../db');

// Add To Cart Controller
module.exports.addToCart = function (req, res, next) {
    const productId = req.params.productId;
    const sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products');
        return;
    }

    const countProduct = db
        .get('sessions')
        .find({ id: sessionId })
        .get('cart.' + productId, 0)
        .value();

    db.get('sessions')
        .find({ id: sessionId })
        .set('cart.' + productId, countProduct + 1)
        .write();

    res.redirect('/products');
};