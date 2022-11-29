const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },

  password: {
    type: String,
  },
  confirmPassword: {
    type: Number,
  },
});

module.exports = mongoose.model("User", UserSchema);
