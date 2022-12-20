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
            
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        }
    }]
});



module.exports = Cart = mongoose.model('cart', CartSchema);
