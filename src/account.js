import account from 'html/account.html!text';
import User from 'js/user.js';
import Router from 'router.js';
export var init = function() {
  /*The issue here is to have a function that has access to the variables of its
  caller. This is why we see direct eval being used for template processing. For
  browsers with native ES6 support we could have something simple as this:
  
  new Function('return `' + account + '`;')()

  When using Babel compiler we need to create closure which remembers the
  environment in which it was created.
  */
  Router.updateContent(new Function('fullName', 'return `' + account + '`;')(User.fullName));
}