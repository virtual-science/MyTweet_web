const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  amount: Number,
  method: String,
});

const tweet = mongoose.model('Tweet', donationSchema);
module.exports = mytweets;