const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  email: {
    unique: true,
    type: String,
  },
  options: Array,
  friends: Array,
  keys: Array,
  issue: String,
});

const Issue = mongoose.model("issue", issueSchema);
module.exports = Issue;
