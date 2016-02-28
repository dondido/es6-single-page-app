import View from 'js/controllers/view.js';
export default class ResetPassword extends View {
  constructor() {
    super('html/reset-password.html');
  }
  submit(e) {
    super.submit(e);
    location.hash = 'password-updated';
  }
}