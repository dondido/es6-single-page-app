import Router from 'js/controllers/router.js';
import {$http} from 'js/services/http.js';
import User from 'js/models/user.js';
var $main, $forms;
class View {
  constructor(path, init) {
    if($main) {
      System.import(path + '!text').then(res => this.ready(res));
    }
    else {
      /* Initialize and start the view. Obviously, since we here query
      the DOM, it should have been loaded first. */
      $main = document.querySelector('.main-content');
      $forms = $main.getElementsByTagName('form');
      this.init();
    } 
  }
  get $main() {
    return $main;
  }
  get $forms() {
    return $forms;
  }
  send(e) {
    var form = e.target,
      formInputs = form.elements,
      formData = {},
      mapData = d => {
        if(d.name && d.name !== '_csrf' && d.value) {
          let v = d.type === 'checkbox' || d.type === 'radio' ?
            (d.checked ? d.value : '') : d.value;
          if(v) {
            formData[d.name] = escape(v);
          }
        }
      };
    e.preventDefault();
    // for ... of ... can't iterate through a nodelist in chrome
    [].forEach.call(formInputs, mapData);
    return $http({method: 'POST', url: form.action, params: formData});
  }
  submit(e) {
    this.send(e).then(res => this.success(res), res => this.error(res));
  }
  render(res) {
    $main.innerHTML = res;
  }
  success(res) {
    if(!res) {
      return;
    }
    try{
      /* Based on request response, this method will determine which
      is the right action to take. If the response is a JSON object all
      of its properties wil be evaluated and if not it will be considered
      as a normal html content and will be inserted into the DOM. */
      let data = JSON.parse(res),
        path = location.href.split('/').slice(3).join('/');
      User.account = data.account;
      document.body.classList.toggle('account', User.account);
      /* The response returned can ask for the app to redirect the page,
      most likely to another SPA hash bang path, but also to another url
      via the returned path property. */
      if(data.path) {
        if(data.path.indexOf('#') === 0) {
          return location.hash = data.path;
        }
        let page = Router.getPage(Router.getRoute(data.path));
        if(page) {
          history[data.path === location.pathname ? 'replaceState' : 'pushState'](
            {account: User.account}, '', data.path
          );
          return Router.getFile(page);
        }
      }
    } catch(e) {
      $main.innerHTML = res;
    }
  }
  error(res) {
    this.success(res);
  }
  ready(res) {
    $main.innerHTML = res;
    this.init();
  }
  init() {
    var onSubmit = form => {
      form.addEventListener('submit', e => this.submit(e));
    };
    [].forEach.call($forms, onSubmit)
  }
}
export default View;