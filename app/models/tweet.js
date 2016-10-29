const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  message: String,
  twitter: String,
  tweeple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const tweet = mongoose.model('Tweet', tweetSchema);
module.exports = tweet;