const mongoose = require("mongoose");
const Followed = require("./Followed");
const Tag = require("./Tag");
const Post = require("./Post");

const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true,},

  email: {type: String, required: true, unique:true },
  username: {type: String, required: true, unique: true},
  password: { type: String, required: true},

  userPosts: {type: [Post.schema]},

  userTags: {type: [Tag.schema]}, //this user's own tag
  userFollowed: {type: [Followed.schema]},

  age: {type: String},
  school: {type: String},
  gender: {type: String},
  phone: {type: String},
  address:{type: String}
});
module.exports = mongoose.model("User", userSchema, 'User');
