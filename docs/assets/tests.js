'use strict';

define('dummy/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
});
define('dummy/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('dummy/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'dummy/tests/helpers/start-app', 'dummy/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };

  var resolve = Ember.RSVP.resolve;
});
define('dummy/tests/helpers/resolver', ['exports', 'dummy/resolver', 'dummy/config/environment'], function (exports, _resolver, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var resolver = _resolver.default.create();

  resolver.namespace = {
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix
  };

  exports.default = resolver;
});
define('dummy/tests/helpers/start-app', ['exports', 'dummy/app', 'dummy/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('dummy/tests/integration/components/expression-block-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('expression-block', 'Integration | Component | expression block', {
    integration: true
  });

  (0, _emberQunit.test)('empty block empty block text', function (assert) {
    this.render(Ember.HTMLBars.template({
      "id": "A+wenPmK",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"id\"],[123]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), 'Pass options to select type', 'assert.equal(this.$().text().trim(), \'Pass options to select type\')');
    assert.ok(this.$('.block[data-id="123"]').length, 'assert.ok(this.$(\'.block[data-id="123"]\').length)');
  });

  (0, _emberQunit.test)('block without id generates one', function (assert) {
    this.render(Ember.HTMLBars.template({
      "id": "FXeNs1b1",
      "block": "{\"statements\":[[1,[26,[\"expression-block\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), 'Pass options to select type', 'assert.equal(this.$().text().trim(), \'Pass options to select type\')');
    var cls = this.$('div:first-child').attr('data-id');
    assert.ok(cls.match(/ember\d+/), 'assert.ok(cls.match(/ember\\d+/))');
  });

  (0, _emberQunit.test)('empty block does show if there are no options', function (assert) {
    this.set('options', {});
    this.render(Ember.HTMLBars.template({
      "id": "kp1pQT/r",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), 'Pass options to select type', 'assert.equal(this.$().text().trim(), \'Pass options to select type\')');
  });

  (0, _emberQunit.test)('block shows type selection if there are options', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.render(Ember.HTMLBars.template({
      "id": "kp1pQT/r",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('select > option:first-child').text().trim(), 'Select type', 'assert.equal(this.$(\'select > option:first-child\').text().trim(), \'Select type\')');
    assert.equal(this.$('select > option:last-child').text().trim(), 'y', 'assert.equal(this.$(\'select > option:last-child\').text().trim(), \'y\')');
  });

  (0, _emberQunit.test)('can select type option', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.render(Ember.HTMLBars.template({
      "id": "kp1pQT/r",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('select > option:selected').text().trim(), 'Select type', 'assert.equal(this.$(\'select > option:selected\').text().trim(), \'Select type\')');
    this.$('option[value="y"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y', 'assert.equal(this.$(\'.block-type select > option:selected\').text().trim(), \'y\')');
  });

  (0, _emberQunit.test)('after type is selected one can select value option based on the type', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.render(Ember.HTMLBars.template({
      "id": "kp1pQT/r",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('select > option:selected').text().trim(), 'Select type', 'assert.equal(this.$(\'select > option:selected\').text().trim(), \'Select type\')');
    assert.notOk(this.$('.block-value select').length, 'assert.notOk(this.$(\'.block-value select\').length)');
    this.$('option[value="y"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y', 'assert.equal(this.$(\'.block-type select > option:selected\').text().trim(), \'y\')');
    assert.ok(this.$('.block-value').length, 'assert.ok(this.$(\'.block-value\').length)');
    assert.equal(this.$('.block-value select > option:selected').text().trim(), 'Select value', 'assert.equal(this.$(\'.block-value select > option:selected\').text().trim(), \'Select value\')');
    assert.equal(this.$('.block-value select > option').text().trim(), 'Select value23', 'assert.equal(this.$(\'.block-value select > option\').text().trim(), \'Select value23\')');
  });

  (0, _emberQunit.test)('values change based on type', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.render(Ember.HTMLBars.template({
      "id": "kp1pQT/r",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('select > option:selected').text().trim(), 'Select type', 'assert.equal(this.$(\'select > option:selected\').text().trim(), \'Select type\')');
    assert.notOk(this.$('.block-value select').length, 'assert.notOk(this.$(\'.block-value select\').length)');
    this.$('option[value="y"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y', 'assert.equal(this.$(\'.block-type select > option:selected\').text().trim(), \'y\')');
    assert.ok(this.$('.block-value').length, 'assert.ok(this.$(\'.block-value\').length)');
    assert.equal(this.$('.block-value select > option:selected').text().trim(), 'Select value', 'assert.equal(this.$(\'.block-value select > option:selected\').text().trim(), \'Select value\')');
    assert.equal(this.$('.block-value select > option').text().trim(), 'Select value23', 'assert.equal(this.$(\'.block-value select > option\').text().trim(), \'Select value23\')');
    this.$('option[value="x"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-value select > option').text().trim(), 'Select value1', 'assert.equal(this.$(\'.block-value select > option\').text().trim(), \'Select value1\')');
  });

  (0, _emberQunit.test)('types change based on options', function (assert) {
    this.set('options', { 'y': [2, 3] });
    this.render(Ember.HTMLBars.template({
      "id": "kp1pQT/r",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('.block-type select > option').text().trim(), 'Select typey', 'assert.equal(this.$(\'.block-type select > option\').text().trim(), \'Select typey\')');
    this.set('options', { 'x': [1] });
    assert.equal(this.$('.block-type select > option').text().trim(), 'Select typex', 'assert.equal(this.$(\'.block-type select > option\').text().trim(), \'Select typex\')');
  });

  (0, _emberQunit.test)('type changes clear selected value', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.render(Ember.HTMLBars.template({
      "id": "kp1pQT/r",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('select > option:selected').text().trim(), 'Select type', 'assert.equal(this.$(\'select > option:selected\').text().trim(), \'Select type\')');
    assert.notOk(this.$('.block-value select').length, 'assert.notOk(this.$(\'.block-value select\').length)');
    this.$('option[value="y"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y', 'assert.equal(this.$(\'.block-type select > option:selected\').text().trim(), \'y\')');
    assert.ok(this.$('.block-value').length, 'assert.ok(this.$(\'.block-value\').length)');
    assert.equal(this.$('.block-value select > option:selected').text().trim(), 'Select value', 'assert.equal(this.$(\'.block-value select > option:selected\').text().trim(), \'Select value\')');
    this.$('option[value="2"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-value select > option:selected').text().trim(), '2', 'assert.equal(this.$(\'.block-value select > option:selected\').text().trim(), \'2\')');
    this.$('option[value="x"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-value select > option:selected').text().trim(), 'Select value', 'assert.equal(this.$(\'.block-value select > option:selected\').text().trim(), \'Select value\')');
    assert.equal(this.$('.block-value select > option').text().trim(), 'Select value1', 'assert.equal(this.$(\'.block-value select > option\').text().trim(), \'Select value1\')');
  });

  (0, _emberQunit.test)('operator enabled if type and value are set', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.set('operators', ['-', '+']);
    this.render(Ember.HTMLBars.template({
      "id": "kEalAU6f",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"options\",\"operators\"],[[28,[\"options\"]],[28,[\"operators\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.notOk(this.$('.block-operator').length, 'assert.notOk(this.$(\'.block-operator\').length)');
    this.$('option[value="y"]').prop('selected', true).trigger('change');
    this.$('option[value="2"]').prop('selected', true).trigger('change');
    assert.ok(this.$('.block-operator').length, 'assert.ok(this.$(\'.block-operator\').length)');
  });

  (0, _emberQunit.test)('operator shown if present', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.set('operators', ['-', '+']);
    this.set('block', { 'operator': '+' });
    this.render(Ember.HTMLBars.template({
      "id": "SpKkO5fV",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"options\",\"operators\",\"block\"],[[28,[\"options\"]],[28,[\"operators\"]],[28,[\"block\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    this.$('option[value="y"]').prop('selected', true).trigger('change');
    this.$('option[value="2"]').prop('selected', true).trigger('change');
    assert.ok(this.$('.block-operator').length, 'assert.ok(this.$(\'.block-operator\').length)');
    assert.equal(this.$('.block-operator option:selected').text().trim(), '+', 'assert.equal(this.$(\'.block-operator option:selected\').text().trim(), \'+\')');
  });

  (0, _emberQunit.test)('can change operator', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.set('operators', ['-', '+']);
    this.render(Ember.HTMLBars.template({
      "id": "kEalAU6f",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"options\",\"operators\"],[[28,[\"options\"]],[28,[\"operators\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    this.$('option[value="y"]').prop('selected', true).trigger('change');
    this.$('option[value="2"]').prop('selected', true).trigger('change');
    assert.ok(this.$('.block-operator').length, 'assert.ok(this.$(\'.block-operator\').length)');
    this.$('option[value="-"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-operator option:selected').text().trim(), '-', 'assert.equal(this.$(\'.block-operator option:selected\').text().trim(), \'-\')');
  });

  (0, _emberQunit.test)('can change operator from passed in ', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.set('operators', ['-', '+']);
    this.set('block', { 'operator': '+' });
    this.render(Ember.HTMLBars.template({
      "id": "SpKkO5fV",
      "block": "{\"statements\":[[1,[33,[\"expression-block\"],null,[[\"options\",\"operators\",\"block\"],[[28,[\"options\"]],[28,[\"operators\"]],[28,[\"block\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    this.$('option[value="y"]').prop('selected', true).trigger('change');
    this.$('option[value="2"]').prop('selected', true).trigger('change');
    assert.ok(this.$('.block-operator').length, 'assert.ok(this.$(\'.block-operator\').length)');
    assert.equal(this.$('.block-operator option:selected').text().trim(), '+', 'assert.equal(this.$(\'.block-operator option:selected\').text().trim(), \'+\')');
    this.$('option[value="-"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-operator option:selected').text().trim(), '-', 'assert.equal(this.$(\'.block-operator option:selected\').text().trim(), \'-\')');
  });
});
define('dummy/tests/integration/components/expression-builder-select-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('expression-builder-select', 'Integration | Component | expression builder select', {
    integration: true
  });

  (0, _emberQunit.test)('select renders option', function (assert) {
    this.set('options', [{ 'text': 'Select type' }]);
    this.render(Ember.HTMLBars.template({
      "id": "Yh3MIubf",
      "block": "{\"statements\":[[1,[33,[\"expression-builder-select\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), 'Select type', 'assert.equal(this.$().text().trim(), \'Select type\')');
    assert.notOk(this.$('option').attr('disabled'), 'assert.notOk(this.$(\'option\').attr(\'disabled\'))');
  });

  (0, _emberQunit.test)('select renders option as disabled', function (assert) {
    this.set('options', [{ 'text': 'Select type', 'disabled': true }]);
    this.render(Ember.HTMLBars.template({
      "id": "Yh3MIubf",
      "block": "{\"statements\":[[1,[33,[\"expression-builder-select\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), 'Select type', 'assert.equal(this.$().text().trim(), \'Select type\')');
    assert.ok(this.$('option').attr('disabled'), 'assert.ok(this.$(\'option\').attr(\'disabled\'))');
  });

  (0, _emberQunit.test)('select renders option as selected', function (assert) {
    this.set('options', [{ 'text': 'Select type', 'value': 1 }, { 'text': 'Select type2', 'value': 0 }]);
    this.render(Ember.HTMLBars.template({
      "id": "3jgalG+l",
      "block": "{\"statements\":[[1,[33,[\"expression-builder-select\"],null,[[\"options\",\"selected\"],[[28,[\"options\"]],0]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('option:selected').val(), 0, 'assert.equal(this.$(\'option:selected\').val(), 0)');
  });

  (0, _emberQunit.test)('select renders first option as selected if no option is selected', function (assert) {
    this.set('options', [{ 'text': 'Select type', 'value': 1 }, { 'text': 'Select type2', 'value': 0 }]);
    this.render(Ember.HTMLBars.template({
      "id": "Yh3MIubf",
      "block": "{\"statements\":[[1,[33,[\"expression-builder-select\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('option:selected').val(), 1, 'assert.equal(this.$(\'option:selected\').val(), 1)');
  });

  (0, _emberQunit.test)('select renders a disabled option as selected if no option is selected', function (assert) {
    this.set('options', [{ 'text': 'Select type', 'disabled': true, 'value': 1 }, { 'text': 'Select type2', 'value': 0 }]);
    this.render(Ember.HTMLBars.template({
      "id": "Yh3MIubf",
      "block": "{\"statements\":[[1,[33,[\"expression-builder-select\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('option:selected').val(), 1, 'assert.equal(this.$(\'option:selected\').val(), 1)');
  });

  (0, _emberQunit.test)('select renders option value', function (assert) {
    this.set('options', [{ 'text': 'Select type', 'value': 123 }]);
    this.render(Ember.HTMLBars.template({
      "id": "Yh3MIubf",
      "block": "{\"statements\":[[1,[33,[\"expression-builder-select\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), 'Select type', 'assert.equal(this.$().text().trim(), \'Select type\')');
    assert.equal(this.$('option').attr('value'), 123, 'assert.equal(this.$(\'option\').attr(\'value\'), 123)');
  });

  (0, _emberQunit.test)('select renders options', function (assert) {
    this.set('options', [{ 'text': 'Select type' }, { 'text': 'xyz' }]);
    this.render(Ember.HTMLBars.template({
      "id": "Yh3MIubf",
      "block": "{\"statements\":[[1,[33,[\"expression-builder-select\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('select > option:first-child').text().trim(), 'Select type', 'assert.equal(this.$(\'select > option:first-child\').text().trim(), \'Select type\')');
    assert.equal(this.$('select > option:last-child').text().trim(), 'xyz', 'assert.equal(this.$(\'select > option:last-child\').text().trim(), \'xyz\')');
  });

  (0, _emberQunit.test)('changing type triggers type change action', function (assert) {
    this.set('options', [{ 'text': 'Select type', 'value': 1 }, { 'text': 'xyz', 'value': 2 }]);
    var changed = false;
    this.set('typeChanged', function () {
      changed = true;
    });
    this.render(Ember.HTMLBars.template({
      "id": "QGHwZpJh",
      "block": "{\"statements\":[[1,[33,[\"expression-builder-select\"],null,[[\"options\",\"selected\",\"changeAction\"],[[28,[\"options\"]],1,[28,[\"typeChanged\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('option:selected').val(), 1, 'assert.equal(this.$(\'option:selected\').val(), 1)');
    this.$('option[value="' + 2 + '"]').prop('selected', true).trigger('change');
    assert.equal(this.$('option:selected').val(), 2, 'assert.equal(this.$(\'option:selected\').val(), 2)');
    assert.ok(changed, 'assert.ok(changed)');
  });

  (0, _emberQunit.test)('changing value triggers value change action', function (assert) {
    this.set('options', [{ 'text': 'Select type', 'value': 1 }, { 'text': 'xyz', 'value': 2 }]);
    var changed = false;
    this.set('valueChanged', function () {
      changed = true;
    });
    this.render(Ember.HTMLBars.template({
      "id": "Yk8bZa8E",
      "block": "{\"statements\":[[1,[33,[\"expression-builder-select\"],null,[[\"options\",\"selected\",\"changeAction\"],[[28,[\"options\"]],1,[28,[\"valueChanged\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('option:selected').val(), 1, 'assert.equal(this.$(\'option:selected\').val(), 1)');
    this.$('option[value="' + 2 + '"]').prop('selected', true).trigger('change');
    assert.equal(this.$('option:selected').val(), 2, 'assert.equal(this.$(\'option:selected\').val(), 2)');
    assert.ok(changed, 'assert.ok(changed)');
  });
});
define('dummy/tests/integration/components/expression-builder-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('expression-builder', 'Integration | Component | expression builder', {
    integration: true
  });

  (0, _emberQunit.test)('has empty text block if no options are passed', function (assert) {
    this.render(Ember.HTMLBars.template({
      "id": "hNYv7TMx",
      "block": "{\"statements\":[[1,[26,[\"expression-builder\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('.expression-blocks').text().trim(), 'Pass options to select type', 'assert.equal(this.$(\'.expression-blocks\').text().trim(), \'Pass options to select type\')');
    assert.equal(this.$('.expression-result').text().trim(), '', 'assert.equal(this.$(\'.expression-result\').text().trim(), \'\')');
    assert.notOk(this.$('.add').length, 'assert.notOk(this.$(\'.add\').length)');
  });

  (0, _emberQunit.test)('has initial block if options are passed', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.render(Ember.HTMLBars.template({
      "id": "DIz7LPhj",
      "block": "{\"statements\":[[1,[33,[\"expression-builder\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('.expression-blocks .block-type select > option:selected').text().trim(), 'Select type', 'assert.equal(this.$(\'.expression-blocks .block-type select > option:selected\').text().trim(), \'Select type\')');
    assert.equal(this.$('.expression-result').text().trim(), '', 'assert.equal(this.$(\'.expression-result\').text().trim(), \'\')');
  });

  (0, _emberQunit.test)('does not have expression from placeholder block', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.render(Ember.HTMLBars.template({
      "id": "DIz7LPhj",
      "block": "{\"statements\":[[1,[33,[\"expression-builder\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$('.expression-blocks .block-type select > option:selected').text().trim(), 'Select type', 'assert.equal(this.$(\'.expression-blocks .block-type select > option:selected\').text().trim(), \'Select type\')');
    assert.equal(this.$('.expression-result').text().trim(), '', 'assert.equal(this.$(\'.expression-result\').text().trim(), \'\')');
  });

  (0, _emberQunit.test)('has expression from block', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.render(Ember.HTMLBars.template({
      "id": "DIz7LPhj",
      "block": "{\"statements\":[[1,[33,[\"expression-builder\"],null,[[\"options\"],[[28,[\"options\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y', 'assert.equal(this.$(\'.block-type select > option:selected\').text().trim(), \'y\')');
    assert.equal(this.$('.expression-result').text().trim(), 'y', 'assert.equal(this.$(\'.expression-result\').text().trim(), \'y\')');
    this.$('.block-value option[value="3"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.expression-result').text().trim(), 'y:3', 'assert.equal(this.$(\'.expression-result\').text().trim(), \'y:3\')');
  });

  (0, _emberQunit.test)('do not show operation when there is not another block', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.set('operators', ['-', '+']);
    this.render(Ember.HTMLBars.template({
      "id": "EVChWsIO",
      "block": "{\"statements\":[[1,[33,[\"expression-builder\"],null,[[\"options\",\"operators\"],[[28,[\"options\"]],[28,[\"operators\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.notOk(this.$('.block-operator').length, 'assert.notOk(this.$(\'.block-operator\').length)');
    this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y', 'assert.equal(this.$(\'.block-type select > option:selected\').text().trim(), \'y\')');
    assert.equal(this.$('.expression-result').text().trim(), 'y', 'assert.equal(this.$(\'.expression-result\').text().trim(), \'y\')');
    this.$('.block-value option[value="3"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.expression-result').text().trim(), 'y:3', 'assert.equal(this.$(\'.expression-result\').text().trim(), \'y:3\')');
    assert.ok(this.$('.block-operator').length, 'assert.ok(this.$(\'.block-operator\').length)');
    this.$('option[value="-"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-operator option:selected').text().trim(), '-', 'assert.equal(this.$(\'.block-operator option:selected\').text().trim(), \'-\')');
    assert.ok(this.$('.block-operator').length, 'assert.ok(this.$(\'.block-operator\').length)');
    assert.equal(this.$('.expression-result').text().trim(), 'y:3', 'assert.equal(this.$(\'.expression-result\').text().trim(), \'y:3\')');
  });

  (0, _emberQunit.test)('can add another block', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.set('operators', ['OR', 'AND']);
    this.render(Ember.HTMLBars.template({
      "id": "EVChWsIO",
      "block": "{\"statements\":[[1,[33,[\"expression-builder\"],null,[[\"options\",\"operators\"],[[28,[\"options\"]],[28,[\"operators\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.notOk(this.$('.block-operator').length, 'assert.notOk(this.$(\'.block-operator\').length)');
    this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
    this.$('.block-value option[value="3"]').prop('selected', true).trigger('change');
    this.$('.block-operator option[value="OR"]').prop('selected', true).trigger('change');
    Ember.run(function () {
      return document.querySelector('.add').click();
    });
    this.$('.expression-blocks > div:nth-child(3) > .block-type option[value="x"]').prop('selected', true).trigger('change');
    this.$('.expression-blocks > div:nth-child(3) > .block-value option[value="1"]').prop('selected', true).trigger('change');
    this.$('.expression-blocks > div:nth-child(4) option[value="OR"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.expression-result').text().trim(), 'y:3 OR x:1', 'assert.equal(this.$(\'.expression-result\').text().trim(), \'y:3 OR x:1\')');
    Ember.run(function () {
      return document.querySelector('.add').click();
    });
    this.$('.expression-blocks > div:nth-child(5) > .block-type option[value="x"]').prop('selected', true).trigger('change');
    this.$('.expression-blocks > div:nth-child(5) > .block-value option[value="1"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.expression-result').text().trim(), 'y:3 OR x:1 OR x:1', 'assert.equal(this.$(\'.expression-result\').text().trim(), \'y:3 OR x:1 OR x:1\')');
  });

  (0, _emberQunit.test)('values change based on type', function (assert) {
    this.set('options', { 'x': [1], 'y': [2, 3] });
    this.set('operators', ['OR', 'AND']);
    this.render(Ember.HTMLBars.template({
      "id": "EVChWsIO",
      "block": "{\"statements\":[[1,[33,[\"expression-builder\"],null,[[\"options\",\"operators\"],[[28,[\"options\"]],[28,[\"operators\"]]]]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
    this.$('.block-value option[value="3"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y', 'assert.equal(this.$(\'.block-type select > option:selected\').text().trim(), \'y\')');
    assert.equal(this.$('.block-value select > option:selected').text().trim(), '3', 'assert.equal(this.$(\'.block-value select > option:selected\').text().trim(), \'3\')');
    this.$('.block-type option[value="x"]').prop('selected', true).trigger('change');
    assert.equal(this.$('.block-type select > option:selected').text().trim(), 'x', 'assert.equal(this.$(\'.block-type select > option:selected\').text().trim(), \'x\')');
    assert.equal(this.$('.block-value select > option:selected').text().trim(), 'Select value', 'assert.equal(this.$(\'.block-value select > option:selected\').text().trim(), \'Select value\')');
  });
});
define('dummy/tests/integration/helpers/is-equal-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('is-equal', 'helper:is-equal', {
    integration: true
  });

  (0, _emberQunit.test)('it renders true when parameters are equal', function (assert) {
    this.set('inputValue', '1234');
    this.render(Ember.HTMLBars.template({
      "id": "6AVOk/AD",
      "block": "{\"statements\":[[1,[33,[\"is-equal\"],[[28,[\"inputValue\"]],\"1234\"],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), 'true', 'assert.equal(this.$().text().trim(), \'true\')');
  });

  (0, _emberQunit.test)('it renders false when parameters are not equal', function (assert) {
    this.set('inputValue', '1234');
    this.render(Ember.HTMLBars.template({
      "id": "c7U3Ujiu",
      "block": "{\"statements\":[[1,[33,[\"is-equal\"],[[28,[\"inputValue\"]]],null],false]],\"locals\":[],\"named\":[],\"yields\":[],\"hasPartials\":false}",
      "meta": {}
    }));
    assert.equal(this.$().text().trim(), 'false', 'assert.equal(this.$().text().trim(), \'false\')');
  });
});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit', 'ember-cli-qunit'], function (_resolver, _emberQunit, _emberCliQunit) {
  'use strict';

  (0, _emberQunit.setResolver)(_resolver.default);
  (0, _emberCliQunit.start)();
});
define('dummy/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/expression-block-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/expression-block-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/expression-builder-select-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/expression-builder-select-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/expression-builder-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/expression-builder-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/is-equal-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/is-equal-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
require('dummy/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
