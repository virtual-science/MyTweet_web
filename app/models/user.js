'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  friend:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Friend',
  },

  tweet:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
  },

});

const User = mongoose.model('User', userSchema);
module.exports = User;