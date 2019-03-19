const Product = require('../../models/Product');

module.exports = (req, res, next) => {

  Product.find({}, (err, products) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server Error'
      });
    } else {
      return res.send({
        success: true,
        products: products
      });
    }
  });
};
