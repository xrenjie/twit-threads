const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  conversation_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  conversation: {
    type: [Object],
    required: true,
  },
  root_tweet: {
    type: Object,
  },
  root_user: {
    type: Object,
  },
  last_updated: {
    type: Date,
    required: true,
  },
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
