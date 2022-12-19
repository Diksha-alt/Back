const mongoose = require("mongoose");
const UserSchema = require("./userSchema");

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: UserSchema
    },
    items: [{
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        }
    }],
    price: String
});



module.exports = Cart = mongoose.model('cart', CartSchema);
