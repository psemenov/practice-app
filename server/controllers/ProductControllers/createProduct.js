const Product = require('../../models/Product');

module.exports = (req, res, next) => {

  const { body } = req;
  const {
    title,
    category,
    type,
    img,
    price,
    info,
    amount
  } = body;

 if(!title || !category || !type || !img || !price) {
    return res.send({
      success: false,
      message: 'Not enough data'
    });
  }

  Product.find({
    title: title
  }, (err, products) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server Error'
      });
    } else if (products.length > 0) {
      return res.send({
        success: false,
        message: 'Product already exists'
      });
    }

    const newProduct = new Product();
    
    newProduct.title = title;
    newProduct.category = category;
    newProduct.type = type;
    newProduct.img = img;
    newProduct.price = price;
    newProduct.info = info;
    newProduct.amount = amount;
    newProduct.save( (err, product) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server Error'
        });
      }

      return res.send({
        success: true,
        message: ''
      });

    });
  });
};
