'use strict';

const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  office: String,
});

const Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;