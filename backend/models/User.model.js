const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  user_object: {
    type: Object,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
