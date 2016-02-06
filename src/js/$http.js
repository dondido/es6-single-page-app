import {$cookie} from 'js/$cookie.js';
export var $http = function(data) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open(data.method, data.url);
        req.setRequestHeader("X-XSRF-TOKEN", $cookie('XSRF-TOKEN'));
        req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        //req.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status === 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };
        // Handle network errors
        req.onerror = function() {
            reject(Error('Network Error'));
        };
        // Make the request
        req.send(JSON.stringify(data.params));
    });
}