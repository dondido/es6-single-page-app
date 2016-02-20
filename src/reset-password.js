import View from 'js/view.js';
class ResetPassword extends View {
  constructor() {
    super('html/reset-password.html');
  }
  submit(e) {
    super.submit(e);
    location.hash = 'password-updated';
  }
}
export default ResetPassword;