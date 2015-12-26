import loginHTML from 'html/login.html!text';
import User from 'js/user.js';
import Router from 'router.js';
import Submitter from 'submit.js';
var login = function(res) {
  User.fullName = JSON.parse(res).fullName;
  System.import('account').then(m => m.init());
};
var reject = function() {
  console.log('reject')
};
export var init = function() {
  Router.updateContent(loginHTML);
  Submitter.updateListener(login, reject);
}