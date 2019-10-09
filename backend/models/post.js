const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  blogID: {type: String, required: true},
  dateCreated: {type: String, required: true},
  userId: {type: String, required: true},
  status: {type: String, re: true},
  message: {type: String, required: true,},
  username: {type: String},
  images: { type: String},
  tag:{type: String},
  time: {type: String},
  likeByUser: {type: String},
  numberOfLike: {tyoe: String},
});

module.exports = mongoose.model("Post", postSchema, 'Post');
