//Models
const Product = require('../../models/Product');

//Controllers
const createProductController = require('../../controllers/ProductControllers/createProduct');
const getProductsController = require('../../controllers/ProductControllers/getProducts');

module.exports = (app) => {

//create
app.post('/api/product/create', createProductController);

//get all
app.get('/api/product/get_all', getProductsController);
};