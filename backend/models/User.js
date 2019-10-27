const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true,},

  email: {type: String, required: true, unique:true },
  username: {type: String, required: true, unique: true},
  password: { type: String, required: true},

  userPosts: {type: [Schema.ObjectId], ref: 'Post'},
  userTags: {type: [Schema.ObjectId], ref: 'Tag'}, //this user's own tag
  userFollowed: {type: [Schema.ObjectId], ref: 'Followed'},

  age: {type: String},
  school: {type: String},
  gender: {type: String},
  phone: {type: String},
  address:{type: String}
});
module.exports = mongoose.model("User", userSchema, 'User');
