const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Followed = mongoose.Schema({
  followedUserName: {type: String},
  followedUserTag: {type: [Schema.ObjectId], ref: 'Tag'},
  initialTagsWhenFollowed: {type: [Schema.ObjectId], ref: 'Tag'}
});
module.exports = mongoose.model('followed', Followed, 'followed');
