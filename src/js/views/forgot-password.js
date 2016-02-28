import View from 'js/controllers/view.js';
export default class ForgotPassword extends View {
  constructor() {
    super('html/forgot-password.html');
  }
  submit(e) {
    super.submit(e);
    location.hash = 'check-email';
  }
}