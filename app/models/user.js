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
 
  tweet:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
  },

  admin:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },

});

const User = mongoose.model('User', userSchema);
module.exports = User;