import View from 'js/view.js';
import {$render} from 'js/$render.js';
import {$cookie} from 'js/$cookie.js';
class Account extends View {
  constructor() {
    super('html/account.html');
  }
  ready(res) {
    this.$main.innerHTML = $render(res, ['username', 'token'], [$cookie('username'), '']);
    this.init();
  }
}

export default Account;