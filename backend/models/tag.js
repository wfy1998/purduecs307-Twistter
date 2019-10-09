const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  tagID: {type: String, required: true,},
  tagName: {type: String, required: true},
  tagContent: { type: String, required: true},

});

module.exports = mongoose.model("tag", tagSchema, 'tag');
