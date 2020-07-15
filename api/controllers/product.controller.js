// Require model product (file: product.model.js)
const Product = require('../../models/product.model');

// Index controller
module.exports.index = async function (req, res) {
    const products = await Product.find();
    res.json(products);
};

// Create controller
module.exports.create = async function (req, res) {
    const product = await Product.create(req.body);
    res.json(product);
};