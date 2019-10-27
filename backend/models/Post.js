const mongoose = require("mongoose");
const Tag = require("./Tag");

const postSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  username: {type: String, required: true},
  content: {type: String, required: true},

  tags:{type: [Tag.schema]},

  likedByUser: {type: [String]},
  numberOfLikes: {type: String},

  quoted: {type: Boolean},
  comment: {type: String},
  originName: {type: String}
});
module.exports = mongoose.model("Post", postSchema, 'Post');
