/*import Submitter from 'submit.js';
import Router from 'router.js';
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
  submitEmail = res => Submitter.successDefault(res, resetPassword),
  init = () => Submitter.init('html/forgotten-password.html!text', submitEmail, submitEmail);
var submitEmail = res => Router.$main.innerHTML = res,
  init = () => Submitter.init('html/forgotten-password.html!text', submitEmail, submitEmail);
export var init;*/