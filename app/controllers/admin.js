'use strict';
const User = require('../models/user');
const Joi = require('joi');


exports.admin = {
  auth:false,
  handler: function (request, reply) {
    reply.view('admin', { title: 'Welcome to Admin Page' });

    var userEmail = request.auth.credentials.loggedInUser;
    let userId = null;
    let twit = null;
    User.findOne({email: userEmail}).then(user => {
      let data = request.payload;
      userId = user._id;
      twit = new Tweet(data);
       data.twitter = request.auth.credentials.loggedInUser;
      twit.user= userId;
      return twit.save();
       return user_id.save();
    }).then(newtweet => {
      reply.redirect('/mytweetTimeline');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

