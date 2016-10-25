'use strict';
const Tweet = require('../models/tweet');
exports.home = {
  handler: function (request, reply) {
    reply.view('home', { title: 'Make a Tweet' });
  },
};
exports.report = {
  handler: function (request, reply) {
    Tweet.find({}).exec().then(allTweets=> {
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
    let data = request.payload;
    data.twitter = request.auth.credentials.loggedInUser;
    const twit = new Tweet(data);
    twit.save().then(newTweet => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};