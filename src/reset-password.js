import Submitter from 'submit.js';
var resetPassword = e => {
    var [url, data] = Submitter.getFormData(e);
    e.preventDefault();
    $http({
      method: 'POST', 
      url: url,
      params: data
    });
    System.import('html/password-changed.html!text')
      .then(res => Router.$main.innerHTML = res);
    history.pushState({url: '/password-changed'}, '', '/password-changed');
  },
  submitForm = () => {
    document.forms[0].addEventListener('submit', resetPassword);
  },
  renderForm = res => {
    Router.$main.innerHTML = res;
    submitForm();
  },
  init = () => Submitter.init('html/reset-password.html!text', renderForm, resetPassword);
export var init;