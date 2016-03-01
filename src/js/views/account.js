import View from 'js/controllers/view.js';
import {$render} from 'js/services/render.js';
import User from 'js/models/user.js';
export default class Account extends View {
  constructor() {
    super('html/account.html');
  }
  ready(res) {
    this.$main.innerHTML = $render(res, ['username', 'token'], [User.account, '']);
    this.init();
  }
}