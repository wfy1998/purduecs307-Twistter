const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Followed = mongoose.Schema({
  followedUserName: {type: String},
  followedUserTag: {type: [String]},
  initialTagsWhenFollowed: {type: [String]}
});
module.exports = mongoose.model('followed', Followed, 'followed');
