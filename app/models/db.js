'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// declare the connection string

let dbURI = 'mongodb://localhost/mytweet';
//var dbURI = 'mongodb://mytweetuser:mytweetuser@ds145997.mlab.com:45997/mytwitter-web';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});