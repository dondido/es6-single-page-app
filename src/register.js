import Router from 'router.js';
import Submitter from 'submit.js';
var login = function(res) {
    Router.updateContent('html/account.html');
    history.pushState({url: '/'}, '', '/');
  }, 
  reject = function() {
    console.log('reject')
  },
  init = function() {
    if(history.length > 1) {
      Router.updateContent('html/registration.html');
    }
    Submitter.updateListener(login, reject);
  };
export var init;