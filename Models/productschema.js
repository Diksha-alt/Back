const mongoose = require("mongoose");

const product = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please include the product name"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    // required: [true, "Please include the product price"],
  },
  quantity: {
    type: Number,
  },
  image: {
    type: String,
  },
});
const Product = mongoose.model("Product", product);
module.exports = Product;
