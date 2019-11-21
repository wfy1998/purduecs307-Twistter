const mongoose = require("mongoose");

const Followed = mongoose.Schema({
  followedUserName: {type: String},
  followerUserName: {type: String},
  followedUserTag: {type: [String]},
  initialTagsWhenFollowed: {type: [String]},
  levelOfInteraction: {type: Number}
});
module.exports = mongoose.model('followed', Followed, 'followed');
