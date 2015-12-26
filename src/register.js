import registration from 'html/registration.html!text';
import Submitter from 'submit.js';
import Router from 'router.js';
import User from 'js/user.js';
var login = function(res) {
    User.fullName = JSON.parse(res).fullName;
    System.import('account').then(m => m.init());
    history.pushState({url: '/'}, '', '/');
  }, 
  reject = function() {
    console.log('reject')
  },
  init = function() {
    Router.updateContent(registration);
    Submitter.updateListener(login, reject);
  };
export var init;