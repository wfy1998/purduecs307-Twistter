const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
  title: {type: String, required: true,},
  username: {type: String},
});

module.exports = mongoose.model("tag", tagSchema, 'tag);
