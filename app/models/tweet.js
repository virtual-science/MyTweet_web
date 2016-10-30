const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  message: String,
  email: String,
  tweeple: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  friend:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Friend',
  },
});


const tweet = mongoose.model('Tweet', tweetSchema);
module.exports = tweet;