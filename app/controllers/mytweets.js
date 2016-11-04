'use strict';
const Tweet = require('../models/tweet');
const User = require('../models/user');
const Friend = require('../models/friend');

exports.home = {
  handler: function (request, reply) {
    Friend.find({}).then(friends => {
      reply.view('home', {
        title: 'Make a Tweet',
        friends: friends,
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

exports.mytweetTimeline = {
  handler: function (request, reply) {
    Tweet.find({}).populate('user').populate('friend').then(allTweets=> {
      reply.view('mytweetTimeline', {
        title: 'MyTweet to Date',
        tweets: allTweets,

      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};


exports.timeline_delete = {
  handler: function (request, reply) {
    let data = request.payload;
    let tweet = data.del;
    if (Array.isArray(tweet)) {
      for (let i = 0; i < tweet.length; i++)
        Tweet.findOne({_id: tweet[i]}).then(function (tweet) {
          return Tweet.remove(tweet);
        });
    }
    else {
      Tweet.findOne({_id: data.del}).then(function (tweet) {
        return Tweet.remove(tweet);
      });
    }
    reply.redirect('/mytweetTimeline');
  }
};


exports.timeline_report = {

  handler: function (request, reply) {
    Tweet.find({}).populate('user').populate('friend').then(allTweets=> {
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
        title: 'Make a Tweet',
        friends: friends,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

