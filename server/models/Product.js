const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: String,
    category: String,
    type: [String],
    img: String,
    price: Number,
    info: String,
    amount: Number,
    sold: {
    	type: Number,
    	default: 0
    }
  });


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product
