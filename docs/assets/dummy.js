"use strict";



define('dummy/app', ['exports', 'dummy/resolver', 'ember-load-initializers', 'dummy/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('dummy/components/expression-add', ['exports', 'expression-builder/components/expression-add'], function (exports, _expressionAdd) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _expressionAdd.default;
    }
  });
});
define('dummy/components/expression-block', ['exports', 'expression-builder/components/expression-block'], function (exports, _expressionBlock) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _expressionBlock.default;
    }
  });
});
define('dummy/components/expression-builder-select', ['exports', 'expression-builder/components/expression-builder-select'], function (exports, _expressionBuilderSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _expressionBuilderSelect.default;
    }
  });
});
define('dummy/components/expression-builder', ['exports', 'expression-builder/components/expression-builder'], function (exports, _expressionBuilder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _expressionBuilder.default;
    }
  });
});
define('dummy/components/expression-result', ['exports', 'expression-builder/components/expression-result'], function (exports, _expressionResult) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _expressionResult.default;
    }
  });
});
define('dummy/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    options: { 'x': [1], 'y': [2, 3] },
    operators: ['OR', 'AND']
  });
});
define('dummy/expression-builder/tests/addon.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | addon');

  QUnit.test('expression-builder/components/expression-add.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'expression-builder/components/expression-add.js should pass ESLint\n\n');
  });

  QUnit.test('expression-builder/components/expression-block.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'expression-builder/components/expression-block.js should pass ESLint\n\n');
  });

  QUnit.test('expression-builder/components/expression-builder-select.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'expression-builder/components/expression-builder-select.js should pass ESLint\n\n');
  });

  QUnit.test('expression-builder/components/expression-builder.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'expression-builder/components/expression-builder.js should pass ESLint\n\n');
  });

  QUnit.test('expression-builder/components/expression-result.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'expression-builder/components/expression-result.js should pass ESLint\n\n');
  });

  QUnit.test('expression-builder/helpers/is-equal.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'expression-builder/helpers/is-equal.js should pass ESLint\n\n');
  });
});
define('dummy/helpers/is-equal', ['exports', 'expression-builder/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
define('dummy/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('dummy/initializers/export-application-global', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('dummy/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('dummy/router', ['exports', 'dummy/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {});

  exports.default = Router;
});
define('dummy/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("dummy/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "paB/MSdi", "block": "{\"statements\":[[11,\"h1\",[]],[13],[0,\"Expression builder\"],[14],[0,\"\\n\"],[1,[33,[\"expression-builder\"],null,[[\"options\",\"operators\",\"addComponent\",\"resultComponent\"],[[28,[\"options\"]],[28,[\"operators\"]],\"dummy-add\",\"dummy-result\"]]],false],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/application.hbs" } });
});
define("dummy/templates/components/dummy-add", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "gPSiz1sM", "block": "{\"statements\":[[11,\"section\",[]],[15,\"class\",\"add\"],[5,[\"action\"],[[28,[null]],[28,[\"add\"]]]],[13],[0,\"＋\"],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/components/dummy-add.hbs" } });
});
define("dummy/templates/components/dummy-result", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "eKDX53Af", "block": "{\"statements\":[[11,\"input\",[]],[16,\"value\",[26,[\"expression\"]],null],[15,\"class\",\"expression-result\"],[13],[14],[0,\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}", "meta": { "moduleName": "dummy/templates/components/dummy-result.hbs" } });
});


define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("dummy/app")["default"].create({});
}
//# sourceMappingURL=dummy.map
