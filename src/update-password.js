import Submitter from 'submit.js';
var update = res => document.forms[0].classList.add(res),
  updatePassword = res => Submitter.successDefault(res, update),
  init = () => Submitter.init('html/update-password.html!text', updatePassword);
export var init;