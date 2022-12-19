const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: Number,
  },
});



module.exports = mongoose.model("User", UserSchema);
