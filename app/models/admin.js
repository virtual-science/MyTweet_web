
'use strict';
// establish coonection to database mongoose
const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({

  email: String,
  password: String,



admin:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },

});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;