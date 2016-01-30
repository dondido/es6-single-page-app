import Submitter from 'submit.js';
var login = res => {
    System.import('root').then(m => m.init());
    history.pushState(
      {
        url: location.pathname
      },
      'Forgotten Password',
      location.pathname
    );
  },
  resetPassword = res => Submitter.successDefault(res, login),
  init = () => Submitter.init('html/reset-password.html!text', resetPassword);
export var init;