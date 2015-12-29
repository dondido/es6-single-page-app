import Router from 'router.js';
import Submitter from 'submit.js';
var login = function() {
  console.log(114, location)
    Router.updateContent('html/account.html');
  },reject = function() {
    console.log('reject')
  },
  init = function() {
    console.log(116, location, history.state)
    if(!history.state.first) {
      Router.updateContent('html/login.html');
    }
    
    Submitter.updateListener(login, reject);
  }
export var init;