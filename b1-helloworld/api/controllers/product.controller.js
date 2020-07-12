// Require model product (file: product.model.js)
const Product = require('../../models/product.model');

// Index controller
module.exports.index = async function (req, res) {
    const products = await Product.find();
    res.json(products);
};