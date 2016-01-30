import {$http} from 'js/$http.js';
import Router from 'router.js';
class Submitter {
  handleSubmit(e) {
    var f = e.target,
      formInputs = f.elements,
      formData = {};
    e.preventDefault();
    // for ... of ... can't iterate through a nodelist in chrome
    [].forEach.call(formInputs, function(d) {
      if(d.name && d.value) {
        let v = d.type === 'checkbox' || d.type === 'radio' ? (d.checked ? d.value : '') : d.value;
        if(v) {
          formData[d.name] = escape(v);
        }
      }
    });
    $http({
      method: 'POST', 
      url: f.action,
      params: formData
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
      console.log(111, path)
      System.import(path)
        .then( res => update ? update(res) : this.successDefault(res));
    }
    else {
      Router.xhr = 1;
      this.updateListener(login);
    }
  }
}

export default new Submitter();