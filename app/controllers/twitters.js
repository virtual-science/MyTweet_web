'use strict';

exports.home = {

  handler: (request, reply) => {
    reply.view('main', { title: 'Welcome to Twitters' });
  },

};

exports.signup = {

  handler: (request, reply) => {
    reply.view('signup', { title: 'Sign up for Twitters' });
  },

};

exports.login = {

  handler: (request, reply) => {
    reply.view('login', { title: 'Login to Twitters' });
  },

};
