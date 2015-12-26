import User from 'js/user.js';
var login = function(res) {
  console.log('login', res)
},reject = function() {
  console.log('reject')
},init = function() {
  System.import(User.fullName ? 'account' : 'login').then(m => m.init());
};

export var init;