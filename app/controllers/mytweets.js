'use strict';
const Tweet = require('../models/tweet');
const User = require('../models/user');
exports.home = {
  handler: function (request, reply) {
    reply.view('home', { title: 'Make a Tweet' });
  },
};
exports.report = {
  handler: function (request, reply) {
    Tweet.find({}).populate('tweeple').then(allTweets=> {
      reply.view('report', {
        title: 'MyTweet to Date',
        tweets: allTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};
exports.tweet = {

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(user => {
    let data = request.payload;
    data.twitter = request.auth.credentials.loggedInUser;
    const twit = new Tweet(data);
      twit.tweeple = user._id;
      return twit.save();
    }).then(newTweet => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};