import Router from 'router.js';
import {$http} from 'js/$http.js';
import {$cookie} from 'js/$cookie.js';
var $main, $forms;
class View {
  constructor(path, init) {
    if($main) {
      System.import(path + '!text').then(res => this.ready(res));
    }
    else {
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
      let data = JSON.parse(res),
        path = location.href.split('/').slice(3).join('/');
      if(data.path) {
        if(data.path.indexOf('#') === 0) {
          return location.hash = data.path;
        }
        let page = Router.getPage(Router.getRoute(data.path));
        if(page) {
          history[data.path === location.pathname ? 'replaceState' : 'pushState'](
            {account: $cookie('username')}, '', data.path
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