'use strict';

const Admin = require('../models/admin');
const Joi = require('joi');


exports.adminlogin = {
  auth: false,
  handler: function (request, reply) {
    reply.view('adminlogin', { title: 'Login to Admin Page' });
  },

};

exports.authentication = {
  /*auth: false,
   validate: {
   payload: {
   email: Joi.string().email().required(),
   password: Joi.string().required(),
   },

   options: {
   abortEarly: false,
   },

   failAction: function (request, reply, source, error) {
   reply.view('adminlogin', {
   title: 'Sign in error',
   errors: error.data.details,
   }).code(400);
   },
   },*/
  handler: function (request, reply) {
    const admin = request.payload;
    Admin.findOne({ email: 'admin@twitter.com' }).then(foundAdmin => {
      if (foundAdmin && foundAdmin.password === 'secret') {
        request.cookieAuth.set({
          loggedIn: true,
          loggedInAdmin: admin.email,
        });
        reply.redirect('/home');
      } else {
        reply.redirect('/signup');
      }
    }).catch(err => {
      reply.redirect('/');
    });
  },

};