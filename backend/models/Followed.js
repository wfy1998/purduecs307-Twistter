const mongoose = require("mongoose");
const Tag = require("./Tag");

const Followed = mongoose.Schema({
  followedUserName: {type: String},
  followedUserTag: {type: [Tag.schema]},
  initialTagsWhenFollowed: {type: [Tag.schema]}
});
module.exports = mongoose.model('followed', Followed, 'followed');
