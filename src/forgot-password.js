import {$http} from 'js/$http.js';
import Submitter from 'submit.js';
import Router from 'router.js';
var sendEmail = e => {
    var [url, data] = Submitter.getFormData(e);
    e.preventDefault();
    $http({
      method: 'POST', 
      url: url,
      params: data
    });
    System.import('html/check-email.html!text')
      .then(res => Router.$main.innerHTML = res);
    history.pushState({url: '/check-email'}, '', '/check-email');
  },
  submitForm = () => {
    document.forms[0].addEventListener('submit', sendEmail);
  },
  renderForm = res => {
    Router.$main.innerHTML = res;
    submitForm();
  },
  init = () => Submitter.init('html/forgot-password.html!text', renderForm, submitForm);
export var init;