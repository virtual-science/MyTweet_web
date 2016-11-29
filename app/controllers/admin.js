'use strict';
const User = require('../models/user');
const tweet = require('../models/tweet');
const admin = require('../models/admin');
//const Joi = require('joi');


exports.home = {
  //auth: false, //TO disable the protected strategy for this route

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    console.log('Administrator email: ' + userEmail);

    // to support tweet statistics on adminHome view for Tweet model
    var stats = new Object();

    // total no tweets for the loggedInUser:
    Tweet.count({}, function (err, tweets) {
      stats.count = tweets;
    });

    // Mongoose query by time/dates range using momentjs
    Tweet.count({ date: { $gt: moment().subtract(1, 'hour') } }, function (err, tweets) {
      stats.countHour = tweets;
    });


     Tweet.find({}).populate('user').sort({ date: 'asc' }).then(allTweets => { // the user object will be retrieved on the single query
      reply.view('adminHome', {
        title: 'Administrator Microblog', //view function accepts a ‘context’ object (title)
        stats: stats,
        tweets: allTweets,
        canDelete: allTweets.count != 0,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};


exports.users = {

  handler: function (request, reply) {

    // Find all the Users
    // Uses momentjs (.sort) to sort by email address in ascending order
    User.find({}).sort({email: 'asc'}).then(users => { // the user object will be retrieved on the single query
      console.log('Found: ' + users.length + ' users');

      // Display the users view and pass in all the users
      reply.view('adminUsers', {
        title: 'Blog Users',
        users: users,
        //canDelete: true, // Administrator can delete Users
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//----------All Admin actions (userAdd, userEdit) confirmed by userSave handler in adminUser partial: form action="/userSave/{{user._id}}--------
//Users tab from ADMIN login where Administrator can add, update and delete users
// relevant handlers:-

exports.userAdd = {

  handler: function (request, reply) {

    let user = new User();

    reply.view('adminUserMaint', {
      title: 'Create User',
      user: user,
      canDelete: false,
    });
  },
};

//------------------------------------------------------------- ADMIN contd....
exports.userEdit = {

  handler: function (request, reply) {

    let userId = request.params.userId;// syntax to retrieve existing object, isolating the ID only
    console.log('User Id: ' + userId);

    // Find the user from their id
    User.findOne({_id: userId}).then(user => { // the user object will be retrieved on the single query
      console.log('User to edit: ' + user.email);

      // Display the User Maintenance View and pass in the user object
      reply.view('adminUserMaint', {
        title: 'Edit User',
        user: user,
        canDelete: true, // Administrator can delete the User
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//------------------------------------------------------------- ADMIN contd....
exports.userSave = {

  handler: function (request, reply) {

    let userId = request.params.userId;// syntax to retrieve existing object, isolating the ID only
    console.log('Saving User: ' + userId);

    // To read a users details by id from the database, and then update with new values entered by the Administrator
    User.findOne({ _id:userId }, function (err, user) {
      if (!err) { // if no error
        if (!user) { // if no user already exists
          user = new User(); // create a new user: leads to 'userAdd' handler above
        } else {
          console.log('Found existing user: ' + user.email);
        }
        // then update with new values entered by the Administrator for the user
        // Request PayedLoad sends data as json object....? Brings in form data
        user.firstName = request.payload.firstName;
        user.lastName = request.payload.lastName;
        user.email = request.payload.email;
        //user.password = request.payload.password;
        user.save(); //Save the new version to db
        console.log('Saved new details to db for: ' + user.email);
        reply.redirect('/adminUsers');
      }
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//----------All Admin actions (userAdd, userEdit) confirmed by userSave handler in adminUser partial: form action="/userSave/{{user._id}}--------

exports.userDelete = {

  handler: function (request, reply) {

    let userId = request.params.userId; // syntax to retrieve existing object, isolating the ID only
    console.log('Delete user: ' + userId);

    // Remove one user
    User.remove({ _id: userId }, function (err) {
      if (err) {
        console.log(err);
        return 'err';
      }
      reply.redirect('/adminUsers');
    });
  },
};

//-------------------- Delete  Delete---------------------------------//
exports.adminDeleteAllUsers = {

  handler: function(request, reply){

    console.log('Deleting all users ' );

    // Find the user from their email
    User.find({}).remove('user').then( function (err, foundUser) {
      console.log('Found user: ' + foundUser.firstName + ' ' + foundUser.lastName);

      if (err) return 'err';
      console.log(err);
    });
    reply.redirect('/adminUsers')
  },
};

//----------------- ADMIN DELETE TWEETS fFROM USERS CARDS LINK TO OTHER USER TIMELINE----------------------------------------------------------
/**
 * V_12: Working: Allow user to delete individual tweets from both the selected user feed on the otherUserTimeline view
 */
exports.adminDeleteTweet = {

  handler: function(request, reply){

    var tweetId = request.params.tweetId; // syntax to retrieve existing object

    // Remove one tweet
    Tweet.remove({_id: tweetId }, function (err) {
      if (err) return 'err';
      console.log(err);
    });
    reply.redirect('/adminHome')
  },
};
//---------------------------------------------------------------------------------------------------------------
/**
 * V_12: Working: Allow Admin to delete all user tweets from the general user feed on adminHome view
 */
exports.adminDeleteAll= {

  handler: function(request, reply){

    //Identify logged-in user's email
    console.log('Deleting all tweets ' );

    // Find the user from their email
    Tweet.find({}).remove('tweet').then( function (err, foundUser) {
      console.log('Found user: ' + foundUser.firstName + ' ' + foundUser.lastName);

      if (err) return 'err';
      console.log(err);
    });
    reply.redirect('/adminHome')
  },
};
//---------------------------------------------------------------------------------------------------------------
/**
 * to activate admin user semantic cards link to selected other User's timeline - to delete all that user's tweets
 */
exports.adminDeleteAllOtherUserTweets = {

  handler: function(request, reply){

    let userId = request.params.userId;// syntax to retrieve existing object, isolating the ID only
    //console.log('Located other User Id: ' + userId);

    // Find the user from their email
    User.findOne({_id: userId}).then(otherUser => {
      console.log('Deleting all tweets for User: ' + otherUser.email);

      Tweet.remove({ user: otherUser }, function (err) {
        if (err) return 'err';
        console.log(err);
      });
    });
    reply.redirect('/adminHome', {
      title: 'Tweets to Date',
    });
  },
};


