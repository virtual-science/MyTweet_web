const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  message: String,
  email: String,
  picture: { data: Buffer, contentType: String },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

 //.......................
  friend:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Friend',
  },

//................................
  tweet:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
  },

});

//.......................
const tweet = mongoose.model('Tweet', tweetSchema);
module.exports = tweet;