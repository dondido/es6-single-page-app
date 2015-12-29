var init = function() {
  if(document.body.dataset.user) {
    Router.updateContent('html/account.html');
  }
  else {
    System.import('login').then(m => m.init());
  }
};
export var init;