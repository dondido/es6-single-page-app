import Router from 'router.js';
import {$http} from 'js/$http.js';
var $main, $forms;
class View {
  constructor(path, init) {
    if($main) {
      System.import(path + '!text').then(res => this.ready(res));
    }
    else {
      $main = document.getElementById('main');
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
    try{
      let data = JSON.parse(res),
        path = location.href.split('/').slice(3).join('/');
      if(data.path.indexOf('#') === 0) {
        return location.hash = data.path;
      }
      if(data.path !== path) {
        history.pushState({url: data.path}, '', data.path);
      }
      Router.handleRouteChange();
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