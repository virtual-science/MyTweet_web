'use strict';


exports.home = {
  handler: function (request, reply) {
    reply.view('home', { title: 'Make a Tweet' });
  },
};

exports.report = {
  handler: function (request, reply) {
    reply.view('report', {
     title: 'MyTweet to Date',
     mytweets: this.tweets,
    });
  },
};


exports.tweet = {

  handler: function (request, reply) {
    let data = request.payload;
    //console.log(data);
    data.tweets = this.currentUser;
    this.tweets.push(data);
    reply.redirect('/report');
  },

};
