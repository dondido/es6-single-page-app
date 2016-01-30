import Submitter from 'submit.js';
var login = res => {
    System.import('root').then(m => m.init());
    history.pushState({url: res}, '', res)
  },
  updateAccount = res => Submitter.successDefault(res, login),
  init = () => Submitter.init('html/registration.html!text', updateAccount, login);
export var init;