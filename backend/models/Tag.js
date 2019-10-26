const mongoose = require("mongoose");

const Tag = mongoose.Schema({
  tagName: {type: String}
});
module.exports = mongoose.model("tag", Tag, 'tag');
