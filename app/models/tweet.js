const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  message: String,
  twitter: String,
});

const tweet = mongoose.model('Tweet', tweetSchema);
module.exports = tweet;