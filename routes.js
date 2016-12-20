const Accounts = require('./app/controllers/accounts');
const MyTweet = require('./app/controllers/mytweets');
const Assets = require('./app/controllers/assets');
const Admin = require('./app/controllers/admin');


module.exports = [

  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/register', config: Accounts.register },
  { method: 'GET', path: '/settings', config: Accounts.viewSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },
    
    
 // { method: 'GET', path: '/admin', config: Admin.admin },

  { method: 'GET', path: '/home', config: MyTweet.home },
  { method: 'GET', path: '/mytweetTimeline', config: MyTweet.mytweetTimeline },
  { method: 'POST', path: '/tweet', config: MyTweet.tweet },

  { method: 'GET', path: '/timeline_report', config: MyTweet.timeline_report },

  { method: 'POST', path: '/timeline_delete', config: MyTweet.timeline_delete },


/*/........................................*/
  { method: 'GET', path: '/adminHome', config: Admin.home },
  { method: 'GET', path: '/adminUsers', config: Admin.users },
  { method: 'GET', path: '/userAdd', config: Admin.userAdd },
  { method: 'GET', path: '/userEdit/{userId}', config: Admin.userEdit },
  { method: 'POST', path: '/userSave/{userId}', config: Admin.userSave },
  { method: 'GET', path: '/userDelete/{userId}', config: Admin.userDelete },
  { method: 'POST', path: '/adminDeleteAllUsers', config: Admin.adminDeleteAllUsers },

  { method: 'GET', path: '/adminDeleteTweet/{tweetId}', config: Admin.adminDeleteTweet },
  { method: 'POST', path: '/adminDeleteAll', config: Admin.adminDeleteAll },
  { method: 'POST', path: '/adminDeleteAllOtherUserTweets/{userId}', config: Admin.adminDeleteAllOtherUserTweets },

  {
    method: 'GET',
    path: '/testlb/{param}',
    config: {auth: false},
    handler: function (request, reply) {
      reply('Server: ' + os.hostname());
      console.log('testing: ' + request.params.param);
    }
  },





  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];
