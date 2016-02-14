import {$http} from 'js/$http.js';
import Router from 'router.js';
class Submitter {
  getFormData(e) {
    var f = e.target,
      formInputs = f.elements,
      formData = {};
      // for ... of ... can't iterate through a nodelist in chrome
    [].forEach.call(formInputs, function(d) {
      if(d.name && d.name !== '_csrf' && d.value) {
        let v = d.type === 'checkbox' || d.type === 'radio' ? (d.checked ? d.value : '') : d.value;
        if(v) {
          formData[d.name] = escape(v);
        }
      }
    });
    return [f.action, formData];
  }
  handleSubmit(e) {
    var [url, data] = this.getFormData(e);
    e.preventDefault();
    $http({
      method: 'POST', 
      url: url,
      params: data
    }).then(r => this.successCallback(r), r => this.errorCallback(r));
  }
  successDefault(res, success, reject) {
    var data;
    try {
      data = JSON.parse(res);
    } catch (e) {
      data = {
        html: {
          main: res
        }
      }
    }
    for (let node in data.html) {
      document.getElementById(node).innerHTML = data.html[node];
    }
    this.updateListener(success);
  }
  errorDefault() {
    this.form.classList.add('error');
  }
  updateListener(successCallback, errorCallback) {
    this.form = document.forms[0];
    if(this.form) {
      this.form.addEventListener('submit', e => this.handleSubmit(e));
      this.successCallback = successCallback || this.successDefault;
      this.errorCallback = errorCallback || this.errorDefault;
    }
  }
  init(path, update, login) {
    if(Router.xhr) {
      System.import(path)
        .then( res => update ? update(res) : this.successDefault(res));
    }
    else {
      Router.xhr = 1;
      this.updateListener(() => login(update));
    }
  }
}

export default new Submitter();