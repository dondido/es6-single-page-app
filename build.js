System.register("js/models/user.js", ["npm:babel-runtime@5.8.34/helpers/create-class", "npm:babel-runtime@5.8.34/helpers/class-call-check"], function (_export) {
    var _createClass, _classCallCheck, User;

    return {
        setters: [function (_npmBabelRuntime5834HelpersCreateClass) {
            _createClass = _npmBabelRuntime5834HelpersCreateClass["default"];
        }, function (_npmBabelRuntime5834HelpersClassCallCheck) {
            _classCallCheck = _npmBabelRuntime5834HelpersClassCallCheck["default"];
        }],
        execute: function () {
            "use strict";

            User = (function () {
                function User() {
                    _classCallCheck(this, User);
                }

                _createClass(User, null, [{
                    key: "account",
                    get: function get() {
                        return this._account;
                    },
                    set: function set(value) {
                        this._account = value;
                    }
                }]);

                return User;
            })();

            _export("default", User);
        }
    };
});
System.register('js/controllers/view.js', ['npm:babel-runtime@5.8.34/helpers/create-class', 'npm:babel-runtime@5.8.34/helpers/class-call-check', 'js/controllers/router.js', 'js/services/http.js', 'js/models/user.js'], function (_export) {
  var _createClass, _classCallCheck, Router, $http, User, $main, $forms, View;

  return {
    setters: [function (_npmBabelRuntime5834HelpersCreateClass) {
      _createClass = _npmBabelRuntime5834HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5834HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5834HelpersClassCallCheck['default'];
    }, function (_jsControllersRouterJs) {
      Router = _jsControllersRouterJs['default'];
    }, function (_jsServicesHttpJs) {
      $http = _jsServicesHttpJs.$http;
    }, function (_jsModelsUserJs) {
      User = _jsModelsUserJs['default'];
    }],
    execute: function () {
      'use strict';

      View = (function () {
        function View(path, init) {
          var _this = this;

          _classCallCheck(this, View);

          if ($main) {
            System['import'](path + '!text').then(function (res) {
              return _this.ready(res);
            });
          } else {
            /* Initialize and start the view. Obviously, since we here query
            the DOM, it should have been loaded first. */
            $main = document.querySelector('.main-content');
            $forms = $main.getElementsByTagName('form');
            this.init();
          }
        }

        _createClass(View, [{
          key: 'send',
          value: function send(e) {
            var form = e.target,
                formInputs = form.elements,
                formData = {},
                mapData = function mapData(d) {
              if (d.name && d.name !== '_csrf' && d.value) {
                var v = d.type === 'checkbox' || d.type === 'radio' ? d.checked ? d.value : '' : d.value;
                if (v) {
                  formData[d.name] = escape(v);
                }
              }
            };
            e.preventDefault();
            // for ... of ... can't iterate through a nodelist in chrome
            [].forEach.call(formInputs, mapData);
            return $http({ method: 'POST', url: form.action, params: formData });
          }
        }, {
          key: 'submit',
          value: function submit(e) {
            var _this2 = this;

            this.send(e).then(function (res) {
              return _this2.success(res);
            }, function (res) {
              return _this2.error(res);
            });
          }
        }, {
          key: 'render',
          value: function render(res) {
            $main.innerHTML = res;
          }
        }, {
          key: 'success',
          value: function success(res) {
            if (!res) {
              return;
            }
            try {
              /* Based on request response, this method will determine which
              is the right action to take. If the response is a JSON object all
              of its properties wil be evaluated and if not it will be considered
              as a normal html content and will be inserted into the DOM. */
              var data = JSON.parse(res),
                  path = location.href.split('/').slice(3).join('/');
              User.account = data.account;
              document.body.classList.toggle('account', User.account);
              /* The response returned can ask for the app to redirect the page,
              most likely to another SPA hash bang path, but also to another url
              via the returned path property. */
              if (data.path) {
                if (data.path.indexOf('#') === 0) {
                  return location.hash = data.path;
                }
                var page = Router.getPage(Router.getRoute(data.path));
                if (page) {
                  history[data.path === location.pathname ? 'replaceState' : 'pushState']({ account: User.account }, '', data.path);
                  return Router.getFile(page);
                }
              }
            } catch (e) {
              $main.innerHTML = res;
            }
          }
        }, {
          key: 'error',
          value: function error(res) {
            this.success(res);
          }
        }, {
          key: 'ready',
          value: function ready(res) {
            $main.innerHTML = res;
            this.init();
          }
        }, {
          key: 'init',
          value: function init() {
            var _this3 = this;

            var onSubmit = function onSubmit(form) {
              form.addEventListener('submit', function (e) {
                return _this3.submit(e);
              });
            };
            [].forEach.call($forms, onSubmit);
          }
        }, {
          key: '$main',
          get: function get() {
            return $main;
          }
        }, {
          key: '$forms',
          get: function get() {
            return $forms;
          }
        }]);

        return View;
      })();

      _export('default', View);
    }
  };
});
System.registerDynamic("npm:core-js@1.2.6/library/modules/es6.object.set-prototype-of", ["npm:core-js@1.2.6/library/modules/$.export", "npm:core-js@1.2.6/library/modules/$.set-proto"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('npm:core-js@1.2.6/library/modules/$.export');
  $export($export.S, 'Object', {setPrototypeOf: $__require('npm:core-js@1.2.6/library/modules/$.set-proto').set});
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/fn/object/set-prototype-of", ["npm:core-js@1.2.6/library/modules/es6.object.set-prototype-of", "npm:core-js@1.2.6/library/modules/$.core"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('npm:core-js@1.2.6/library/modules/es6.object.set-prototype-of');
  module.exports = $__require('npm:core-js@1.2.6/library/modules/$.core').Object.setPrototypeOf;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.34/core-js/object/set-prototype-of", ["npm:core-js@1.2.6/library/fn/object/set-prototype-of"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.2.6/library/fn/object/set-prototype-of'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/fn/object/create", ["npm:core-js@1.2.6/library/modules/$"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.2.6/library/modules/$');
  module.exports = function create(P, D) {
    return $.create(P, D);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.34/core-js/object/create", ["npm:core-js@1.2.6/library/fn/object/create"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.2.6/library/fn/object/create'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.34/helpers/inherits", ["npm:babel-runtime@5.8.34/core-js/object/create", "npm:babel-runtime@5.8.34/core-js/object/set-prototype-of"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$create = $__require('npm:babel-runtime@5.8.34/core-js/object/create')["default"];
  var _Object$setPrototypeOf = $__require('npm:babel-runtime@5.8.34/core-js/object/set-prototype-of')["default"];
  exports["default"] = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = _Object$create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.object-sap", ["npm:core-js@1.2.6/library/modules/$.export", "npm:core-js@1.2.6/library/modules/$.core", "npm:core-js@1.2.6/library/modules/$.fails"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('npm:core-js@1.2.6/library/modules/$.export'),
      core = $__require('npm:core-js@1.2.6/library/modules/$.core'),
      fails = $__require('npm:core-js@1.2.6/library/modules/$.fails');
  module.exports = function(KEY, exec) {
    var fn = (core.Object || {})[KEY] || Object[KEY],
        exp = {};
    exp[KEY] = exec(fn);
    $export($export.S + $export.F * fails(function() {
      fn(1);
    }), 'Object', exp);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/es6.object.get-own-property-descriptor", ["npm:core-js@1.2.6/library/modules/$.to-iobject", "npm:core-js@1.2.6/library/modules/$.object-sap"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toIObject = $__require('npm:core-js@1.2.6/library/modules/$.to-iobject');
  $__require('npm:core-js@1.2.6/library/modules/$.object-sap')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor) {
    return function getOwnPropertyDescriptor(it, key) {
      return $getOwnPropertyDescriptor(toIObject(it), key);
    };
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/fn/object/get-own-property-descriptor", ["npm:core-js@1.2.6/library/modules/$", "npm:core-js@1.2.6/library/modules/es6.object.get-own-property-descriptor"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.2.6/library/modules/$');
  $__require('npm:core-js@1.2.6/library/modules/es6.object.get-own-property-descriptor');
  module.exports = function getOwnPropertyDescriptor(it, key) {
    return $.getDesc(it, key);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.34/core-js/object/get-own-property-descriptor", ["npm:core-js@1.2.6/library/fn/object/get-own-property-descriptor"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.2.6/library/fn/object/get-own-property-descriptor'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.34/helpers/get", ["npm:babel-runtime@5.8.34/core-js/object/get-own-property-descriptor"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$getOwnPropertyDescriptor = $__require('npm:babel-runtime@5.8.34/core-js/object/get-own-property-descriptor')["default"];
  exports["default"] = function get(_x, _x2, _x3) {
    var _again = true;
    _function: while (_again) {
      var object = _x,
          property = _x2,
          receiver = _x3;
      _again = false;
      if (object === null)
        object = Function.prototype;
      var desc = _Object$getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          _x = parent;
          _x2 = property;
          _x3 = receiver;
          _again = true;
          desc = parent = undefined;
          continue _function;
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register('js/views/page.js', ['npm:babel-runtime@5.8.34/helpers/get', 'npm:babel-runtime@5.8.34/helpers/inherits', 'npm:babel-runtime@5.8.34/helpers/class-call-check', 'js/controllers/view.js'], function (_export) {
  var _get, _inherits, _classCallCheck, View, Page;

  return {
    setters: [function (_npmBabelRuntime5834HelpersGet) {
      _get = _npmBabelRuntime5834HelpersGet['default'];
    }, function (_npmBabelRuntime5834HelpersInherits) {
      _inherits = _npmBabelRuntime5834HelpersInherits['default'];
    }, function (_npmBabelRuntime5834HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5834HelpersClassCallCheck['default'];
    }, function (_jsControllersViewJs) {
      View = _jsControllersViewJs['default'];
    }],
    execute: function () {
      'use strict';

      Page = (function (_View) {
        _inherits(Page, _View);

        function Page(path) {
          _classCallCheck(this, Page);

          _get(Object.getPrototypeOf(Page.prototype), 'constructor', this).call(this, path);
        }

        return Page;
      })(View);

      _export('default', Page);

      ;
    }
  };
});
System.register('js/services/cookie.js', [], function (_export) {
  'use strict';

  var $cookie;
  return {
    setters: [],
    execute: function () {
      $cookie = function $cookie(k) {
        return decodeURIComponent((document.cookie.match('(^|; )' + k + '=([^;]*)') || 0)[2] || '');
      };

      _export('$cookie', $cookie);
    }
  };
});
System.registerDynamic("npm:core-js@1.2.6/library/modules/$.iter-detect", ["npm:core-js@1.2.6/library/modules/$.wks"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ITERATOR = $__require('npm:core-js@1.2.6/library/modules/$.wks')('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][ITERATOR]();
    riter['return'] = function() {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function() {
      throw 2;
    });
  } catch (e) {}
  module.exports = function(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING)
      return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[ITERATOR]();
      iter.next = function() {
        safe = true;
      };
      arr[ITERATOR] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.set-species", ["npm:core-js@1.2.6/library/modules/$.core", "npm:core-js@1.2.6/library/modules/$", "npm:core-js@1.2.6/library/modules/$.descriptors", "npm:core-js@1.2.6/library/modules/$.wks"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core = $__require('npm:core-js@1.2.6/library/modules/$.core'),
      $ = $__require('npm:core-js@1.2.6/library/modules/$'),
      DESCRIPTORS = $__require('npm:core-js@1.2.6/library/modules/$.descriptors'),
      SPECIES = $__require('npm:core-js@1.2.6/library/modules/$.wks')('species');
  module.exports = function(KEY) {
    var C = core[KEY];
    if (DESCRIPTORS && C && !C[SPECIES])
      $.setDesc(C, SPECIES, {
        configurable: true,
        get: function() {
          return this;
        }
      });
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.redefine-all", ["npm:core-js@1.2.6/library/modules/$.redefine"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var redefine = $__require('npm:core-js@1.2.6/library/modules/$.redefine');
  module.exports = function(target, src) {
    for (var key in src)
      redefine(target, key, src[key]);
    return target;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:process@0.11.2/browser", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:process@0.11.2", ["npm:process@0.11.2/browser"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:process@0.11.2/browser');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2/index", ["npm:process@0.11.2"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.2');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2", ["github:jspm/nodelibs-process@0.1.2/index"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('github:jspm/nodelibs-process@0.1.2/index');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.dom-create", ["npm:core-js@1.2.6/library/modules/$.is-object", "npm:core-js@1.2.6/library/modules/$.global"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var isObject = $__require('npm:core-js@1.2.6/library/modules/$.is-object'),
      document = $__require('npm:core-js@1.2.6/library/modules/$.global').document,
      is = isObject(document) && isObject(document.createElement);
  module.exports = function(it) {
    return is ? document.createElement(it) : {};
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.html", ["npm:core-js@1.2.6/library/modules/$.global"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:core-js@1.2.6/library/modules/$.global').document && document.documentElement;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.invoke", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
    }
    return fn.apply(that, args);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.task", ["npm:core-js@1.2.6/library/modules/$.ctx", "npm:core-js@1.2.6/library/modules/$.invoke", "npm:core-js@1.2.6/library/modules/$.html", "npm:core-js@1.2.6/library/modules/$.dom-create", "npm:core-js@1.2.6/library/modules/$.global", "npm:core-js@1.2.6/library/modules/$.cof", "github:jspm/nodelibs-process@0.1.2"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var ctx = $__require('npm:core-js@1.2.6/library/modules/$.ctx'),
        invoke = $__require('npm:core-js@1.2.6/library/modules/$.invoke'),
        html = $__require('npm:core-js@1.2.6/library/modules/$.html'),
        cel = $__require('npm:core-js@1.2.6/library/modules/$.dom-create'),
        global = $__require('npm:core-js@1.2.6/library/modules/$.global'),
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    var run = function() {
      var id = +this;
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var listner = function(event) {
      run.call(event.data);
    };
    if (!setTask || !clearTask) {
      setTask = function setImmediate(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i)
          args.push(arguments[i++]);
        queue[++counter] = function() {
          invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function clearImmediate(id) {
        delete queue[id];
      };
      if ($__require('npm:core-js@1.2.6/library/modules/$.cof')(process) == 'process') {
        defer = function(id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (MessageChannel) {
        channel = new MessageChannel;
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function(id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listner, false);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function(id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function(id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  })($__require('github:jspm/nodelibs-process@0.1.2'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.microtask", ["npm:core-js@1.2.6/library/modules/$.global", "npm:core-js@1.2.6/library/modules/$.task", "npm:core-js@1.2.6/library/modules/$.cof", "github:jspm/nodelibs-process@0.1.2"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var global = $__require('npm:core-js@1.2.6/library/modules/$.global'),
        macrotask = $__require('npm:core-js@1.2.6/library/modules/$.task').set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        Promise = global.Promise,
        isNode = $__require('npm:core-js@1.2.6/library/modules/$.cof')(process) == 'process',
        head,
        last,
        notify;
    var flush = function() {
      var parent,
          domain,
          fn;
      if (isNode && (parent = process.domain)) {
        process.domain = null;
        parent.exit();
      }
      while (head) {
        domain = head.domain;
        fn = head.fn;
        if (domain)
          domain.enter();
        fn();
        if (domain)
          domain.exit();
        head = head.next;
      }
      last = undefined;
      if (parent)
        parent.enter();
    };
    if (isNode) {
      notify = function() {
        process.nextTick(flush);
      };
    } else if (Observer) {
      var toggle = 1,
          node = document.createTextNode('');
      new Observer(flush).observe(node, {characterData: true});
      notify = function() {
        node.data = toggle = -toggle;
      };
    } else if (Promise && Promise.resolve) {
      notify = function() {
        Promise.resolve().then(flush);
      };
    } else {
      notify = function() {
        macrotask.call(global, flush);
      };
    }
    module.exports = function asap(fn) {
      var task = {
        fn: fn,
        next: undefined,
        domain: isNode && process.domain
      };
      if (last)
        last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };
  })($__require('github:jspm/nodelibs-process@0.1.2'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.species-constructor", ["npm:core-js@1.2.6/library/modules/$.an-object", "npm:core-js@1.2.6/library/modules/$.a-function", "npm:core-js@1.2.6/library/modules/$.wks"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var anObject = $__require('npm:core-js@1.2.6/library/modules/$.an-object'),
      aFunction = $__require('npm:core-js@1.2.6/library/modules/$.a-function'),
      SPECIES = $__require('npm:core-js@1.2.6/library/modules/$.wks')('species');
  module.exports = function(O, D) {
    var C = anObject(O).constructor,
        S;
    return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.same-value", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.set-proto", ["npm:core-js@1.2.6/library/modules/$", "npm:core-js@1.2.6/library/modules/$.is-object", "npm:core-js@1.2.6/library/modules/$.an-object", "npm:core-js@1.2.6/library/modules/$.ctx"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var getDesc = $__require('npm:core-js@1.2.6/library/modules/$').getDesc,
      isObject = $__require('npm:core-js@1.2.6/library/modules/$.is-object'),
      anObject = $__require('npm:core-js@1.2.6/library/modules/$.an-object');
  var check = function(O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null)
      throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(test, buggy, set) {
      try {
        set = $__require('npm:core-js@1.2.6/library/modules/$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy)
          O.__proto__ = proto;
        else
          set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/core.get-iterator-method", ["npm:core-js@1.2.6/library/modules/$.classof", "npm:core-js@1.2.6/library/modules/$.wks", "npm:core-js@1.2.6/library/modules/$.iterators", "npm:core-js@1.2.6/library/modules/$.core"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var classof = $__require('npm:core-js@1.2.6/library/modules/$.classof'),
      ITERATOR = $__require('npm:core-js@1.2.6/library/modules/$.wks')('iterator'),
      Iterators = $__require('npm:core-js@1.2.6/library/modules/$.iterators');
  module.exports = $__require('npm:core-js@1.2.6/library/modules/$.core').getIteratorMethod = function(it) {
    if (it != undefined)
      return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.to-length", ["npm:core-js@1.2.6/library/modules/$.to-integer"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('npm:core-js@1.2.6/library/modules/$.to-integer'),
      min = Math.min;
  module.exports = function(it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.is-array-iter", ["npm:core-js@1.2.6/library/modules/$.iterators", "npm:core-js@1.2.6/library/modules/$.wks"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var Iterators = $__require('npm:core-js@1.2.6/library/modules/$.iterators'),
      ITERATOR = $__require('npm:core-js@1.2.6/library/modules/$.wks')('iterator'),
      ArrayProto = Array.prototype;
  module.exports = function(it) {
    return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.iter-call", ["npm:core-js@1.2.6/library/modules/$.an-object"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var anObject = $__require('npm:core-js@1.2.6/library/modules/$.an-object');
  module.exports = function(iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined)
        anObject(ret.call(iterator));
      throw e;
    }
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.for-of", ["npm:core-js@1.2.6/library/modules/$.ctx", "npm:core-js@1.2.6/library/modules/$.iter-call", "npm:core-js@1.2.6/library/modules/$.is-array-iter", "npm:core-js@1.2.6/library/modules/$.an-object", "npm:core-js@1.2.6/library/modules/$.to-length", "npm:core-js@1.2.6/library/modules/core.get-iterator-method"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ctx = $__require('npm:core-js@1.2.6/library/modules/$.ctx'),
      call = $__require('npm:core-js@1.2.6/library/modules/$.iter-call'),
      isArrayIter = $__require('npm:core-js@1.2.6/library/modules/$.is-array-iter'),
      anObject = $__require('npm:core-js@1.2.6/library/modules/$.an-object'),
      toLength = $__require('npm:core-js@1.2.6/library/modules/$.to-length'),
      getIterFn = $__require('npm:core-js@1.2.6/library/modules/core.get-iterator-method');
  module.exports = function(iterable, entries, fn, that) {
    var iterFn = getIterFn(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        index = 0,
        length,
        step,
        iterator;
    if (typeof iterFn != 'function')
      throw TypeError(iterable + ' is not iterable!');
    if (isArrayIter(iterFn))
      for (length = toLength(iterable.length); length > index; index++) {
        entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      }
    else
      for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) {
        call(iterator, f, step.value, entries);
      }
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.strict-new", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it, Constructor, name) {
    if (!(it instanceof Constructor))
      throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.an-object", ["npm:core-js@1.2.6/library/modules/$.is-object"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var isObject = $__require('npm:core-js@1.2.6/library/modules/$.is-object');
  module.exports = function(it) {
    if (!isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.is-object", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.classof", ["npm:core-js@1.2.6/library/modules/$.cof", "npm:core-js@1.2.6/library/modules/$.wks"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('npm:core-js@1.2.6/library/modules/$.cof'),
      TAG = $__require('npm:core-js@1.2.6/library/modules/$.wks')('toStringTag'),
      ARG = cof(function() {
        return arguments;
      }()) == 'Arguments';
  module.exports = function(it) {
    var O,
        T,
        B;
    return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof(T = (O = Object(it))[TAG]) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/es6.promise", ["npm:core-js@1.2.6/library/modules/$", "npm:core-js@1.2.6/library/modules/$.library", "npm:core-js@1.2.6/library/modules/$.global", "npm:core-js@1.2.6/library/modules/$.ctx", "npm:core-js@1.2.6/library/modules/$.classof", "npm:core-js@1.2.6/library/modules/$.export", "npm:core-js@1.2.6/library/modules/$.is-object", "npm:core-js@1.2.6/library/modules/$.an-object", "npm:core-js@1.2.6/library/modules/$.a-function", "npm:core-js@1.2.6/library/modules/$.strict-new", "npm:core-js@1.2.6/library/modules/$.for-of", "npm:core-js@1.2.6/library/modules/$.set-proto", "npm:core-js@1.2.6/library/modules/$.same-value", "npm:core-js@1.2.6/library/modules/$.wks", "npm:core-js@1.2.6/library/modules/$.species-constructor", "npm:core-js@1.2.6/library/modules/$.microtask", "npm:core-js@1.2.6/library/modules/$.descriptors", "npm:core-js@1.2.6/library/modules/$.redefine-all", "npm:core-js@1.2.6/library/modules/$.set-to-string-tag", "npm:core-js@1.2.6/library/modules/$.set-species", "npm:core-js@1.2.6/library/modules/$.core", "npm:core-js@1.2.6/library/modules/$.iter-detect", "github:jspm/nodelibs-process@0.1.2"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = $__require('npm:core-js@1.2.6/library/modules/$'),
        LIBRARY = $__require('npm:core-js@1.2.6/library/modules/$.library'),
        global = $__require('npm:core-js@1.2.6/library/modules/$.global'),
        ctx = $__require('npm:core-js@1.2.6/library/modules/$.ctx'),
        classof = $__require('npm:core-js@1.2.6/library/modules/$.classof'),
        $export = $__require('npm:core-js@1.2.6/library/modules/$.export'),
        isObject = $__require('npm:core-js@1.2.6/library/modules/$.is-object'),
        anObject = $__require('npm:core-js@1.2.6/library/modules/$.an-object'),
        aFunction = $__require('npm:core-js@1.2.6/library/modules/$.a-function'),
        strictNew = $__require('npm:core-js@1.2.6/library/modules/$.strict-new'),
        forOf = $__require('npm:core-js@1.2.6/library/modules/$.for-of'),
        setProto = $__require('npm:core-js@1.2.6/library/modules/$.set-proto').set,
        same = $__require('npm:core-js@1.2.6/library/modules/$.same-value'),
        SPECIES = $__require('npm:core-js@1.2.6/library/modules/$.wks')('species'),
        speciesConstructor = $__require('npm:core-js@1.2.6/library/modules/$.species-constructor'),
        asap = $__require('npm:core-js@1.2.6/library/modules/$.microtask'),
        PROMISE = 'Promise',
        process = global.process,
        isNode = classof(process) == 'process',
        P = global[PROMISE],
        Wrapper;
    var testResolve = function(sub) {
      var test = new P(function() {});
      if (sub)
        test.constructor = Object;
      return P.resolve(test) === test;
    };
    var USE_NATIVE = function() {
      var works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = P && P.resolve && testResolve();
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
        if (!(P2.resolve(5).then(function() {}) instanceof P2)) {
          works = false;
        }
        if (works && $__require('npm:core-js@1.2.6/library/modules/$.descriptors')) {
          var thenableThenGotten = false;
          P.resolve($.setDesc({}, 'then', {get: function() {
              thenableThenGotten = true;
            }}));
          works = thenableThenGotten;
        }
      } catch (e) {
        works = false;
      }
      return works;
    }();
    var sameConstructor = function(a, b) {
      if (LIBRARY && a === P && b === Wrapper)
        return true;
      return same(a, b);
    };
    var getConstructor = function(C) {
      var S = anObject(C)[SPECIES];
      return S != undefined ? S : C;
    };
    var isThenable = function(it) {
      var then;
      return isObject(it) && typeof(then = it.then) == 'function' ? then : false;
    };
    var PromiseCapability = function(C) {
      var resolve,
          reject;
      this.promise = new C(function($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined)
          throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction(resolve), this.reject = aFunction(reject);
    };
    var perform = function(exec) {
      try {
        exec();
      } catch (e) {
        return {error: e};
      }
    };
    var notify = function(record, isReject) {
      if (record.n)
        return;
      record.n = true;
      var chain = record.c;
      asap(function() {
        var value = record.v,
            ok = record.s == 1,
            i = 0;
        var run = function(reaction) {
          var handler = ok ? reaction.ok : reaction.fail,
              resolve = reaction.resolve,
              reject = reaction.reject,
              result,
              then;
          try {
            if (handler) {
              if (!ok)
                record.h = true;
              result = handler === true ? value : handler(value);
              if (result === reaction.promise) {
                reject(TypeError('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else
                resolve(result);
            } else
              reject(value);
          } catch (e) {
            reject(e);
          }
        };
        while (chain.length > i)
          run(chain[i++]);
        chain.length = 0;
        record.n = false;
        if (isReject)
          setTimeout(function() {
            var promise = record.p,
                handler,
                console;
            if (isUnhandled(promise)) {
              if (isNode) {
                process.emit('unhandledRejection', value, promise);
              } else if (handler = global.onunhandledrejection) {
                handler({
                  promise: promise,
                  reason: value
                });
              } else if ((console = global.console) && console.error) {
                console.error('Unhandled promise rejection', value);
              }
            }
            record.a = undefined;
          }, 1);
      });
    };
    var isUnhandled = function(promise) {
      var record = promise._d,
          chain = record.a || record.c,
          i = 0,
          reaction;
      if (record.h)
        return false;
      while (chain.length > i) {
        reaction = chain[i++];
        if (reaction.fail || !isUnhandled(reaction.promise))
          return false;
      }
      return true;
    };
    var $reject = function(value) {
      var record = this;
      if (record.d)
        return;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      notify(record, true);
    };
    var $resolve = function(value) {
      var record = this,
          then;
      if (record.d)
        return;
      record.d = true;
      record = record.r || record;
      try {
        if (record.p === value)
          throw TypeError("Promise can't be resolved itself");
        if (then = isThenable(value)) {
          asap(function() {
            var wrapper = {
              r: record,
              d: false
            };
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          record.v = value;
          record.s = 1;
          notify(record, false);
        }
      } catch (e) {
        $reject.call({
          r: record,
          d: false
        }, e);
      }
    };
    if (!USE_NATIVE) {
      P = function Promise(executor) {
        aFunction(executor);
        var record = this._d = {
          p: strictNew(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false,
          n: false
        };
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      $__require('npm:core-js@1.2.6/library/modules/$.redefine-all')(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var reaction = new PromiseCapability(speciesConstructor(this, P)),
              promise = reaction.promise,
              record = this._d;
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          record.c.push(reaction);
          if (record.a)
            record.a.push(reaction);
          if (record.s)
            notify(record, false);
          return promise;
        },
        'catch': function(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
    $__require('npm:core-js@1.2.6/library/modules/$.set-to-string-tag')(P, PROMISE);
    $__require('npm:core-js@1.2.6/library/modules/$.set-species')(PROMISE);
    Wrapper = $__require('npm:core-js@1.2.6/library/modules/$.core')[PROMISE];
    $export($export.S + $export.F * !USE_NATIVE, PROMISE, {reject: function reject(r) {
        var capability = new PromiseCapability(this),
            $$reject = capability.reject;
        $$reject(r);
        return capability.promise;
      }});
    $export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {resolve: function resolve(x) {
        if (x instanceof P && sameConstructor(x.constructor, this))
          return x;
        var capability = new PromiseCapability(this),
            $$resolve = capability.resolve;
        $$resolve(x);
        return capability.promise;
      }});
    $export($export.S + $export.F * !(USE_NATIVE && $__require('npm:core-js@1.2.6/library/modules/$.iter-detect')(function(iter) {
      P.all(iter)['catch'](function() {});
    })), PROMISE, {
      all: function all(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            resolve = capability.resolve,
            reject = capability.reject,
            values = [];
        var abrupt = perform(function() {
          forOf(iterable, false, values.push, values);
          var remaining = values.length,
              results = Array(remaining);
          if (remaining)
            $.each.call(values, function(promise, index) {
              var alreadyCalled = false;
              C.resolve(promise).then(function(value) {
                if (alreadyCalled)
                  return;
                alreadyCalled = true;
                results[index] = value;
                --remaining || resolve(results);
              }, reject);
            });
          else
            resolve(results);
        });
        if (abrupt)
          reject(abrupt.error);
        return capability.promise;
      },
      race: function race(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            reject = capability.reject;
        var abrupt = perform(function() {
          forOf(iterable, false, function(promise) {
            C.resolve(promise).then(capability.resolve, reject);
          });
        });
        if (abrupt)
          reject(abrupt.error);
        return capability.promise;
      }
    });
  })($__require('github:jspm/nodelibs-process@0.1.2'));
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.to-iobject", ["npm:core-js@1.2.6/library/modules/$.iobject", "npm:core-js@1.2.6/library/modules/$.defined"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var IObject = $__require('npm:core-js@1.2.6/library/modules/$.iobject'),
      defined = $__require('npm:core-js@1.2.6/library/modules/$.defined');
  module.exports = function(it) {
    return IObject(defined(it));
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.iter-step", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(done, value) {
    return {
      value: value,
      done: !!done
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.add-to-unscopables", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function() {};
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/es6.array.iterator", ["npm:core-js@1.2.6/library/modules/$.add-to-unscopables", "npm:core-js@1.2.6/library/modules/$.iter-step", "npm:core-js@1.2.6/library/modules/$.iterators", "npm:core-js@1.2.6/library/modules/$.to-iobject", "npm:core-js@1.2.6/library/modules/$.iter-define"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var addToUnscopables = $__require('npm:core-js@1.2.6/library/modules/$.add-to-unscopables'),
      step = $__require('npm:core-js@1.2.6/library/modules/$.iter-step'),
      Iterators = $__require('npm:core-js@1.2.6/library/modules/$.iterators'),
      toIObject = $__require('npm:core-js@1.2.6/library/modules/$.to-iobject');
  module.exports = $__require('npm:core-js@1.2.6/library/modules/$.iter-define')(Array, 'Array', function(iterated, kind) {
    this._t = toIObject(iterated);
    this._i = 0;
    this._k = kind;
  }, function() {
    var O = this._t,
        kind = this._k,
        index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys')
      return step(0, index);
    if (kind == 'values')
      return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/web.dom.iterable", ["npm:core-js@1.2.6/library/modules/es6.array.iterator", "npm:core-js@1.2.6/library/modules/$.iterators"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('npm:core-js@1.2.6/library/modules/es6.array.iterator');
  var Iterators = $__require('npm:core-js@1.2.6/library/modules/$.iterators');
  Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.uid", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var id = 0,
      px = Math.random();
  module.exports = function(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.shared", ["npm:core-js@1.2.6/library/modules/$.global"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('npm:core-js@1.2.6/library/modules/$.global'),
      SHARED = '__core-js_shared__',
      store = global[SHARED] || (global[SHARED] = {});
  module.exports = function(key) {
    return store[key] || (store[key] = {});
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.wks", ["npm:core-js@1.2.6/library/modules/$.shared", "npm:core-js@1.2.6/library/modules/$.uid", "npm:core-js@1.2.6/library/modules/$.global"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var store = $__require('npm:core-js@1.2.6/library/modules/$.shared')('wks'),
      uid = $__require('npm:core-js@1.2.6/library/modules/$.uid'),
      Symbol = $__require('npm:core-js@1.2.6/library/modules/$.global').Symbol;
  module.exports = function(name) {
    return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.set-to-string-tag", ["npm:core-js@1.2.6/library/modules/$", "npm:core-js@1.2.6/library/modules/$.has", "npm:core-js@1.2.6/library/modules/$.wks"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var def = $__require('npm:core-js@1.2.6/library/modules/$').setDesc,
      has = $__require('npm:core-js@1.2.6/library/modules/$.has'),
      TAG = $__require('npm:core-js@1.2.6/library/modules/$.wks')('toStringTag');
  module.exports = function(it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG))
      def(it, TAG, {
        configurable: true,
        value: tag
      });
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.iter-create", ["npm:core-js@1.2.6/library/modules/$", "npm:core-js@1.2.6/library/modules/$.property-desc", "npm:core-js@1.2.6/library/modules/$.set-to-string-tag", "npm:core-js@1.2.6/library/modules/$.hide", "npm:core-js@1.2.6/library/modules/$.wks"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.2.6/library/modules/$'),
      descriptor = $__require('npm:core-js@1.2.6/library/modules/$.property-desc'),
      setToStringTag = $__require('npm:core-js@1.2.6/library/modules/$.set-to-string-tag'),
      IteratorPrototype = {};
  $__require('npm:core-js@1.2.6/library/modules/$.hide')(IteratorPrototype, $__require('npm:core-js@1.2.6/library/modules/$.wks')('iterator'), function() {
    return this;
  });
  module.exports = function(Constructor, NAME, next) {
    Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
    setToStringTag(Constructor, NAME + ' Iterator');
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.iterators", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {};
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.has", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function(it, key) {
    return hasOwnProperty.call(it, key);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.descriptors", ["npm:core-js@1.2.6/library/modules/$.fails"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = !$__require('npm:core-js@1.2.6/library/modules/$.fails')(function() {
    return Object.defineProperty({}, 'a', {get: function() {
        return 7;
      }}).a != 7;
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.property-desc", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.hide", ["npm:core-js@1.2.6/library/modules/$", "npm:core-js@1.2.6/library/modules/$.property-desc", "npm:core-js@1.2.6/library/modules/$.descriptors"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.2.6/library/modules/$'),
      createDesc = $__require('npm:core-js@1.2.6/library/modules/$.property-desc');
  module.exports = $__require('npm:core-js@1.2.6/library/modules/$.descriptors') ? function(object, key, value) {
    return $.setDesc(object, key, createDesc(1, value));
  } : function(object, key, value) {
    object[key] = value;
    return object;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.redefine", ["npm:core-js@1.2.6/library/modules/$.hide"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('npm:core-js@1.2.6/library/modules/$.hide');
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.library", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = true;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.iter-define", ["npm:core-js@1.2.6/library/modules/$.library", "npm:core-js@1.2.6/library/modules/$.export", "npm:core-js@1.2.6/library/modules/$.redefine", "npm:core-js@1.2.6/library/modules/$.hide", "npm:core-js@1.2.6/library/modules/$.has", "npm:core-js@1.2.6/library/modules/$.iterators", "npm:core-js@1.2.6/library/modules/$.iter-create", "npm:core-js@1.2.6/library/modules/$.set-to-string-tag", "npm:core-js@1.2.6/library/modules/$", "npm:core-js@1.2.6/library/modules/$.wks"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var LIBRARY = $__require('npm:core-js@1.2.6/library/modules/$.library'),
      $export = $__require('npm:core-js@1.2.6/library/modules/$.export'),
      redefine = $__require('npm:core-js@1.2.6/library/modules/$.redefine'),
      hide = $__require('npm:core-js@1.2.6/library/modules/$.hide'),
      has = $__require('npm:core-js@1.2.6/library/modules/$.has'),
      Iterators = $__require('npm:core-js@1.2.6/library/modules/$.iterators'),
      $iterCreate = $__require('npm:core-js@1.2.6/library/modules/$.iter-create'),
      setToStringTag = $__require('npm:core-js@1.2.6/library/modules/$.set-to-string-tag'),
      getProto = $__require('npm:core-js@1.2.6/library/modules/$').getProto,
      ITERATOR = $__require('npm:core-js@1.2.6/library/modules/$.wks')('iterator'),
      BUGGY = !([].keys && 'next' in [].keys()),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values';
  var returnThis = function() {
    return this;
  };
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function(kind) {
      if (!BUGGY && kind in proto)
        return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + ' Iterator',
        DEF_VALUES = DEFAULT == VALUES,
        VALUES_BUG = false,
        proto = Base.prototype,
        $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        $default = $native || getMethod(DEFAULT),
        methods,
        key;
    if ($native) {
      var IteratorPrototype = getProto($default.call(new Base));
      setToStringTag(IteratorPrototype, TAG, true);
      if (!LIBRARY && has(proto, FF_ITERATOR))
        hide(IteratorPrototype, ITERATOR, returnThis);
      if (DEF_VALUES && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
          return $native.call(this);
        };
      }
    }
    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      hide(proto, ITERATOR, $default);
    }
    Iterators[NAME] = $default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: !DEF_VALUES ? $default : getMethod('entries')
      };
      if (FORCED)
        for (key in methods) {
          if (!(key in proto))
            redefine(proto, key, methods[key]);
        }
      else
        $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.to-integer", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ceil = Math.ceil,
      floor = Math.floor;
  module.exports = function(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.string-at", ["npm:core-js@1.2.6/library/modules/$.to-integer", "npm:core-js@1.2.6/library/modules/$.defined"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('npm:core-js@1.2.6/library/modules/$.to-integer'),
      defined = $__require('npm:core-js@1.2.6/library/modules/$.defined');
  module.exports = function(TO_STRING) {
    return function(that, pos) {
      var s = String(defined(that)),
          i = toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l)
        return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/es6.string.iterator", ["npm:core-js@1.2.6/library/modules/$.string-at", "npm:core-js@1.2.6/library/modules/$.iter-define"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $at = $__require('npm:core-js@1.2.6/library/modules/$.string-at')(true);
  $__require('npm:core-js@1.2.6/library/modules/$.iter-define')(String, 'String', function(iterated) {
    this._t = String(iterated);
    this._i = 0;
  }, function() {
    var O = this._t,
        index = this._i,
        point;
    if (index >= O.length)
      return {
        value: undefined,
        done: true
      };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/es6.object.to-string", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/fn/promise", ["npm:core-js@1.2.6/library/modules/es6.object.to-string", "npm:core-js@1.2.6/library/modules/es6.string.iterator", "npm:core-js@1.2.6/library/modules/web.dom.iterable", "npm:core-js@1.2.6/library/modules/es6.promise", "npm:core-js@1.2.6/library/modules/$.core"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('npm:core-js@1.2.6/library/modules/es6.object.to-string');
  $__require('npm:core-js@1.2.6/library/modules/es6.string.iterator');
  $__require('npm:core-js@1.2.6/library/modules/web.dom.iterable');
  $__require('npm:core-js@1.2.6/library/modules/es6.promise');
  module.exports = $__require('npm:core-js@1.2.6/library/modules/$.core').Promise;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.34/core-js/promise", ["npm:core-js@1.2.6/library/fn/promise"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.2.6/library/fn/promise'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register('js/services/http.js', ['npm:babel-runtime@5.8.34/core-js/promise', 'js/services/cookie.js'], function (_export) {
    var _Promise, $cookie, $http;

    return {
        setters: [function (_npmBabelRuntime5834CoreJsPromise) {
            _Promise = _npmBabelRuntime5834CoreJsPromise['default'];
        }, function (_jsServicesCookieJs) {
            $cookie = _jsServicesCookieJs.$cookie;
        }],
        execute: function () {
            'use strict';

            $http = function $http(data) {
                return new _Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.open(data.method, data.url || location.pathname);
                    req.setRequestHeader("X-XSRF-TOKEN", $cookie('XSRF-TOKEN'));
                    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                    //req.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
                    req.onload = function () {
                        // This is called even on 404 etc
                        // so check the status
                        if (req.status === 200) {
                            // Resolve the promise with the response text
                            resolve(req.response);
                        } else {
                            // Otherwise reject with the status text
                            // which will hopefully be a meaningful error
                            reject(Error(req.statusText));
                        }
                    };
                    // Handle network errors
                    req.onerror = function () {
                        reject(Error('Network Error'));
                    };
                    // Make the request
                    req.send(JSON.stringify(data.params));
                });
            };

            _export('$http', $http);
        }
    };
});
System.registerDynamic("npm:core-js@1.2.6/library/modules/$.fails", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.cof", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toString = {}.toString;
  module.exports = function(it) {
    return toString.call(it).slice(8, -1);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.iobject", ["npm:core-js@1.2.6/library/modules/$.cof"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('npm:core-js@1.2.6/library/modules/$.cof');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.defined", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.to-object", ["npm:core-js@1.2.6/library/modules/$.defined"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var defined = $__require('npm:core-js@1.2.6/library/modules/$.defined');
  module.exports = function(it) {
    return Object(defined(it));
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.object-assign", ["npm:core-js@1.2.6/library/modules/$", "npm:core-js@1.2.6/library/modules/$.to-object", "npm:core-js@1.2.6/library/modules/$.iobject", "npm:core-js@1.2.6/library/modules/$.fails"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.2.6/library/modules/$'),
      toObject = $__require('npm:core-js@1.2.6/library/modules/$.to-object'),
      IObject = $__require('npm:core-js@1.2.6/library/modules/$.iobject');
  module.exports = $__require('npm:core-js@1.2.6/library/modules/$.fails')(function() {
    var a = Object.assign,
        A = {},
        B = {},
        S = Symbol(),
        K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function(k) {
      B[k] = k;
    });
    return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
  }) ? function assign(target, source) {
    var T = toObject(target),
        $$ = arguments,
        $$len = $$.length,
        index = 1,
        getKeys = $.getKeys,
        getSymbols = $.getSymbols,
        isEnum = $.isEnum;
    while ($$len > index) {
      var S = IObject($$[index++]),
          keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j)
        if (isEnum.call(S, key = keys[j++]))
          T[key] = S[key];
    }
    return T;
  } : Object.assign;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.a-function", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (typeof it != 'function')
      throw TypeError(it + ' is not a function!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.ctx", ["npm:core-js@1.2.6/library/modules/$.a-function"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var aFunction = $__require('npm:core-js@1.2.6/library/modules/$.a-function');
  module.exports = function(fn, that, length) {
    aFunction(fn);
    if (that === undefined)
      return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.core", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core = module.exports = {version: '1.2.6'};
  if (typeof __e == 'number')
    __e = core;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.global", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number')
    __g = global;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$.export", ["npm:core-js@1.2.6/library/modules/$.global", "npm:core-js@1.2.6/library/modules/$.core", "npm:core-js@1.2.6/library/modules/$.ctx"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('npm:core-js@1.2.6/library/modules/$.global'),
      core = $__require('npm:core-js@1.2.6/library/modules/$.core'),
      ctx = $__require('npm:core-js@1.2.6/library/modules/$.ctx'),
      PROTOTYPE = 'prototype';
  var $export = function(type, name, source) {
    var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        IS_WRAP = type & $export.W,
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
        key,
        own,
        out;
    if (IS_GLOBAL)
      source = name;
    for (key in source) {
      own = !IS_FORCED && target && key in target;
      if (own && key in exports)
        continue;
      out = own ? target[key] : source[key];
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? (function(C) {
        var F = function(param) {
          return this instanceof C ? new C(param) : C(param);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (IS_PROTO)
        (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  module.exports = $export;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/es6.object.assign", ["npm:core-js@1.2.6/library/modules/$.export", "npm:core-js@1.2.6/library/modules/$.object-assign"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('npm:core-js@1.2.6/library/modules/$.export');
  $export($export.S + $export.F, 'Object', {assign: $__require('npm:core-js@1.2.6/library/modules/$.object-assign')});
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/fn/object/assign", ["npm:core-js@1.2.6/library/modules/es6.object.assign", "npm:core-js@1.2.6/library/modules/$.core"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('npm:core-js@1.2.6/library/modules/es6.object.assign');
  module.exports = $__require('npm:core-js@1.2.6/library/modules/$.core').Object.assign;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.34/core-js/object/assign", ["npm:core-js@1.2.6/library/fn/object/assign"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.2.6/library/fn/object/assign'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.34/helpers/class-call-check", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/modules/$", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:core-js@1.2.6/library/fn/object/define-property", ["npm:core-js@1.2.6/library/modules/$"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('npm:core-js@1.2.6/library/modules/$');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.34/core-js/object/define-property", ["npm:core-js@1.2.6/library/fn/object/define-property"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('npm:core-js@1.2.6/library/fn/object/define-property'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.registerDynamic("npm:babel-runtime@5.8.34/helpers/create-class", ["npm:babel-runtime@5.8.34/core-js/object/define-property"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var _Object$defineProperty = $__require('npm:babel-runtime@5.8.34/core-js/object/define-property')["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register('js/controllers/router.js', ['npm:babel-runtime@5.8.34/helpers/create-class', 'npm:babel-runtime@5.8.34/helpers/class-call-check', 'npm:babel-runtime@5.8.34/core-js/object/assign', 'js/services/http.js', 'js/views/page.js', 'js/models/user.js'], function (_export) {
  var _createClass, _classCallCheck, _Object$assign, $http, Page, User, prevRoute, Router;

  return {
    setters: [function (_npmBabelRuntime5834HelpersCreateClass) {
      _createClass = _npmBabelRuntime5834HelpersCreateClass['default'];
    }, function (_npmBabelRuntime5834HelpersClassCallCheck) {
      _classCallCheck = _npmBabelRuntime5834HelpersClassCallCheck['default'];
    }, function (_npmBabelRuntime5834CoreJsObjectAssign) {
      _Object$assign = _npmBabelRuntime5834CoreJsObjectAssign['default'];
    }, function (_jsServicesHttpJs) {
      $http = _jsServicesHttpJs.$http;
    }, function (_jsViewsPageJs) {
      Page = _jsViewsPageJs['default'];
    }, function (_jsModelsUserJs) {
      User = _jsModelsUserJs['default'];
    }],
    execute: function () {
      'use strict';

      Router = (function () {
        function Router() {
          _classCallCheck(this, Router);
        }

        _createClass(Router, [{
          key: 'getFile',
          value: function getFile(page) {
            prevRoute = page.file;
            if (page && page.file) {
              if (page.file.slice(-4) === 'html') {
                new Page(page.file);
              } else {
                System['import'](page.file).then(function (C) {
                  new C['default']();
                });
              }
            }
          }

          /* Sometimes we have a hyperlink that needs to be a hyperlink but we don’t want it
          to process and open the link but only call a javascript function. Fortunately here
          comes a little sassy function to stop the hyperlink and trigger a function call.
          This could be very useful for changing the view of the page or adding information
          to it when making AJAX requests or asynchronous module loading instead of preserving
          the link natural behaviour and redirecting. This architecture help us provide
          graceful degradation functionality and provides key driver of SEO goodnes. */
        }, {
          key: 'handleClick',
          value: function handleClick(e) {
            var el = e.target;
            /* Event delegation allows us to avoid adding event listeners to specific nodes; 
            instead, the event listener is added to one parent. That event listener analyses
            bubbled events to find a match on child elements. */
            do {
              if (el.nodeName === 'A') {
                var href = el.getAttribute('href');
                var page = this.getPage(href);
                if (page) {
                  history.pushState({ account: User.account }, page.file, href);
                  this.getFile(page);
                  e.preventDefault();
                  return;
                }
              }
            } while (el = el.parentNode);
          }
        }, {
          key: 'getRoute',
          value: function getRoute(path) {
            return path === '/' ? '/' : path.replace(/\//g, '');
          }
        }, {
          key: 'getPage',
          value: function getPage(ref) {
            var route = this.routes[ref];
            if (!route) {
              return;
            }
            var page = _Object$assign({}, route);
            if (page.account && User.account) {
              page.file = page.account;
            }
            return page;
          }

          /* Determines the current route by mathcing current location pathname to
          routes map, and returning the route entry with all of its properties. */
        }, {
          key: 'handleRouteChange',
          value: function handleRouteChange() {
            var e = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var page = this.getPage(this.getRoute(location.pathname));
            if (page) {
              if (e.state && e.state.account !== User.account) {
                history.replaceState({ account: User.account }, '', '/');
              } else if (!prevRoute || !e.state) {
                history.replaceState({ account: User.account }, '');
              }
              if (prevRoute === page.file) {
                return;
              }
              this.getFile(page);
            }
          }

          // Starts the SPA app router and processes the  view initialisation
        }, {
          key: 'init',
          value: function init() {
            var _this = this;

            var success = function success(routes) {
              _this.routes = JSON.parse(routes);
              /* As we don't want to make an extra Ajax request to check
              whether the user is logged in or not we set this data as
              part of a document body classList. */
              User.account = document.body.classList.contains('account');
              _this.handleRouteChange();
            },
                error = function error(res) {
              return console.log('error', res);
            };
            window.addEventListener('popstate', function (e) {
              return _this.handleRouteChange(e);
            });
            document.addEventListener('click', function (e) {
              return _this.handleClick(e);
            });
            $http({
              method: 'GET',
              url: 'js/config/routes.json'
            }).then(success, error);
          }
        }, {
          key: 'prevRoute',
          get: function get() {
            return prevRoute;
          },
          set: function set(route) {
            prevRoute = route;
          }
        }]);

        return Router;
      })();

      _export('default', new Router());
    }
  };
});
System.register('index.js', ['js/controllers/router.js'], function (_export) {
  'use strict';

  var Router;
  return {
    setters: [function (_jsControllersRouterJs) {
      Router = _jsControllersRouterJs['default'];
    }],
    execute: function () {
      Router.init();
    }
  };
});
//# sourceMappingURL=build.js.map