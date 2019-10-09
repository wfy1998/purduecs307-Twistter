const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true,},
  email: {type: String, required: true, unique:true },
  username: {type: String, required: true, unique: true},
  password: { type: String, required: true},
  blogInformation: {type: Array},
  tagInformation: {type: Array},
  tagLike: {type: Array},
  tagDislike: {type: Array},
  role: {type: Array},
  age: {type: String},
  school: {type: String},
  gender: {type: String},
  phone: {type: String}

})

module.exports = mongoose.model("User", userSchema, 'User');
