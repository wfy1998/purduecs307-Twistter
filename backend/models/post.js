const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  message: {type: String, required: true,},
  username: {type: String},
  images: { type: String},
  tag:{type: String}

})

module.exports = mongoose.model("Post", postSchema, 'Post');
