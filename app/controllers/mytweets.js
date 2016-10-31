'use strict';
const Tweet = require('../models/tweet');
const User = require('../models/user');
const Friend = require('../models/friend');

exports.home = {
  handler: function (request, reply) {
    Friend.find({}).then(friends => {
    reply.view('home', {
      title: 'Make a Tweet',
      friends:friends,
    });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.tweet = {

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    let userId = null;
    let twit = null;
    User.findOne({ email: userEmail }).then(user => {
      let data = request.payload;
      userId = user._id;
      twit = new Tweet(data);
      data.twitter = request.auth.credentials.loggedInUser;
      const rawFriend = request.payload.friend.split(',');
      return Friend.findOne({ lastName: rawFriend[0], firstName: rawFriend[1] });
    }).then(friend => {
      twit.tweeple = userId;
      twit.friend = friend._id;
      return twit.save();
    }).then(newtweet => {

      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.report = {
  handler: function (request, reply) {
    Tweet.find({}).populate('tweeple').populate('friend').then(allTweets=> {
      reply.view('report', {
        title: 'MyTweet to Date',
        tweets: allTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.timeline_report = {
  handler: function (request, reply) {
    Tweet.find({}).populate('tweeple').populate('friend').then(allTweets=> {
      reply.view('timeline_report', {
        title: 'MyTweet to Date',
        tweets: allTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};


exports.home = {

handler: function (request, reply) {
Friend.find({}).then(friends => {
reply.view('home', {
title: 'Make a Donation',
friends: friends,
});
}).catch(err => {
reply.redirect('/');
});
},
};
