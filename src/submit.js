import {$http} from 'js/$http.js';
class Submitter {
  handleSubmit(e) {
    var f = e.target,
      formInputs = f.elements,
      formData = '';
    e.preventDefault();
    // for ... of ... can't iterate through a nodelist in chrome
    [].forEach.call(formInputs, function(d) {
      if(d.name && d.value) {
        let v = d.type === 'checkbox' || d.type === 'radio' ? (d.checked ? d.value : '') : d.value;
        if(v) {
          formData += d.name + "=" + escape(v) + "&";
        }
      }
    });
    $http({
      method: 'POST', 
      url: f.action,
      params: formData.slice(0, -1)
    }).then((r) => this.successCallback(r), (r) => this.errorCallback(r));
  }
  updateListener(successCallback, errorCallback) {
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    document.forms[0].addEventListener('submit', (e) => this.handleSubmit(e))
  }
}

export default new Submitter();