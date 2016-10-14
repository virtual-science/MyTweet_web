const Twitters = require('./app/controllers/twitters');
const Assets = require('./app/controllers/assets');

module.exports = [

  { method: 'GET', path: '/', config: Twitters.home },
  { method: 'GET', path: '/signup', config: Twitters.signup },
  { method: 'GET', path: '/login', config: Twitters.login },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];