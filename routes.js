const Accounts = require('./app/controllers/accounts');
const MyTweet = require('./app/controllers/mytweets');
const Assets = require('./app/controllers/assets');

module.exports = [

  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/register', config: Accounts.register },

  { method: 'GET', path: '/home', config: MyTweet.home },
  { method: 'GET', path: '/report', config: MyTweet.report },
  { method: 'POST', path: '/tweet', config: MyTweet.tweet },
  //{ method: 'POST', path: '/donate', config: Donations.donate },
  
  


  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];
