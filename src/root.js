import Submitter from 'submit.js';
import {$render} from 'js/$render.js';
import {$cookie} from 'js/$cookie.js';
var render = res => Submitter.successDefault($render(res, ['username', 'token'], [$cookie('username'), ''])),
  init = () => Submitter.init('html/account.html!text', render);
export var init;