const mongoose = require("mongoose");

const Cart = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please include the product name"],
  },
  productId:{
    type: Number,
  }
  ,description: {
    type:String
},
  price: {
    type: Number,
    required: [true, "Please include the product price"],
  },
  quantity: {
    type: Number,
  },
 image: {
    type: String,
    required: true,
  },
});
const Product = mongoose.model("Product", Cart);
module.exports = Product;