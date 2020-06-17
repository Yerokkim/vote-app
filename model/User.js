const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    unique: true,
    type: String,
  },
  pw: String,
  pwRepeat: String,
  name: String,
  issue: String,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
