const mongoose = require("mongoose");

const Conversation = mongoose.Schema({
  firstUsername: {type: String},
  secondUsername: {type: String},
  firstUserMessages: {type: [String]},
  secondUserMessages: {type: [String]}
});
module.exports = mongoose.model('Conversation', Conversation, 'Conversation');
