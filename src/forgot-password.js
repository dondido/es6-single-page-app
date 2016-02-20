import View from 'js/view.js';
class ForgotPassword extends View {
  constructor() {
    super('html/forgot-password.html');
  }
  submit(e) {
    super.submit(e);
    location.hash = 'check-email';
  }
}
export default ForgotPassword;