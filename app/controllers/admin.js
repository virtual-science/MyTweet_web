'use strict';
const User = require('../models/user');
const Joi = require('joi');


exports.admin = {
  auth:false,
  handler: function (request, reply) {
    reply.view('admin', { title: 'Welcome to Admin Page' });
      const user = request.payload;
      if (user.email === 'admin@twitter.com' && user.password === 'secret') {
        request.cookieAuth.set({
          loggedIn: true,
          loggedInUser: user.email,
        });
        reply.redirect('/admin');
      } else {

        const user = request.payload;
        User.findOne({email: user.email}).then(foundUser => {
          if (foundUser && foundUser.password === user.password) {
            request.cookieAuth.set({
              loggedIn: true,
              loggedInUser: user.email,
            });
            reply.redirect('/home');
          } else {
            reply.redirect('/signup');
          }
        }).catch(err => {
          reply.redirect('/');
        });
      }
    },

  };










/*  var userEmail = request.auth.credentials.loggedInUser;
  let userId = null;
  let twit = null;
  User.findOne({email: userEmail}).then(user => {
    let data = request.payload;
    userId = user._id;
    twit = new Tweet(data);
     data.twitter = request.auth.credentials.loggedInUser;
    twit.user= userId;
    return twit.save();
     return user_id.save();*/
    /*}).then(newtweet => {
      reply.redirect('/mytweetTimeline');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};
*/
