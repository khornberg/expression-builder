import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expression-block', 'Integration | Component | expression block', {
  integration: true
});

test('empty block empty block text', function(assert) {
  this.render(hbs`{{expression-block id=123}}`);
  assert.equal(this.$().text().trim(), 'Pass options to select type');
  assert.ok(this.$('.block-123').length);
});

test('block without id generates one', function(assert) {
  this.render(hbs`{{expression-block}}`);
  assert.equal(this.$().text().trim(), 'Pass options to select type');
  let cls = this.$('div:first-child').attr('class');
  assert.ok(cls.match(/block-ember\d+/));
});

test('empty block does show if there are no options', function(assert) {
  this.set('options', {});
  this.render(hbs`{{expression-block options=options}}`);
  assert.equal(this.$().text().trim(), 'Pass options to select type');
});

test('block shows type selection if there are options', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.render(hbs`{{expression-block options=options}}`);
  assert.equal(this.$('select > option:first-child').text().trim(), 'Select type');
  assert.equal(this.$('select > option:last-child').text().trim(), 'y');
});

test('can select type option', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.render(hbs`{{expression-block options=options}}`);
  assert.equal(this.$('select > option:selected').text().trim(), 'Select type');
  this.$('option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
});

test('after type is selected one can select value option based on the type', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.render(hbs`{{expression-block options=options}}`);
  assert.equal(this.$('select > option:selected').text().trim(), 'Select type');
  assert.notOk(this.$('.block-value select').length);
  this.$('option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.ok(this.$('.block-value').length);
  assert.equal(this.$('.block-value select > option:selected').text().trim(), 'Select value');
  assert.equal(this.$('.block-value select > option').text().trim(), 'Select value23');
});

test('values change based on type', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.render(hbs`{{expression-block options=options}}`);
  assert.equal(this.$('select > option:selected').text().trim(), 'Select type');
  assert.notOk(this.$('.block-value select').length);
  this.$('option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.ok(this.$('.block-value').length);
  assert.equal(this.$('.block-value select > option:selected').text().trim(), 'Select value');
  assert.equal(this.$('.block-value select > option').text().trim(), 'Select value23');
  this.$('option[value="x"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-value select > option').text().trim(), 'Select value1');
});

test('types change based on options', function(assert) {
  this.set('options', {'y': [2, 3]});
  this.render(hbs`{{expression-block options=options}}`);
  assert.equal(this.$('.block-type select > option').text().trim(), 'Select typey');
  this.set('options', {'x': [1]});
  assert.equal(this.$('.block-type select > option').text().trim(), 'Select typex');
});

test('type changes clear selected value', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.render(hbs`{{expression-block options=options}}`);
  assert.equal(this.$('select > option:selected').text().trim(), 'Select type');
  assert.notOk(this.$('.block-value select').length);
  this.$('option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.ok(this.$('.block-value').length);
  assert.equal(this.$('.block-value select > option:selected').text().trim(), 'Select value');
  this.$('option[value="2"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-value select > option:selected').text().trim(), '2');
  this.$('option[value="x"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-value select > option:selected').text().trim(), 'Select value');
  assert.equal(this.$('.block-value select > option').text().trim(), 'Select value1');
});

test('operator enabled if type and value are set', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('operators', ['-', '+']);
  this.render(hbs`{{expression-block options=options operators=operators}}`);
  assert.notOk(this.$('.block-operator').length);
  this.$('option[value="y"]').prop('selected', true).trigger('change');
  this.$('option[value="2"]').prop('selected', true).trigger('change');
  assert.ok(this.$('.block-operator').length);
});

test('operator shown if present', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('operators', ['-', '+']);
  this.set('block', {'operator': '+'})
  this.render(hbs`{{expression-block options=options operators=operators block=block}}`);
  this.$('option[value="y"]').prop('selected', true).trigger('change');
  this.$('option[value="2"]').prop('selected', true).trigger('change');
  assert.ok(this.$('.block-operator').length);
  assert.equal(this.$('.block-operator option:selected').text().trim(), '+');
});

test('can change operator', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('operators', ['-', '+']);
  this.render(hbs`{{expression-block options=options operators=operators}}`);
  this.$('option[value="y"]').prop('selected', true).trigger('change');
  this.$('option[value="2"]').prop('selected', true).trigger('change');
  assert.ok(this.$('.block-operator').length);
  this.$('option[value="-"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-operator option:selected').text().trim(), '-');
});

test('can change operator from passed in ', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('operators', ['-', '+']);
  this.set('block', {'operator': '+'})
  this.render(hbs`{{expression-block options=options operators=operators block=block}}`);
  this.$('option[value="y"]').prop('selected', true).trigger('change');
  this.$('option[value="2"]').prop('selected', true).trigger('change');
  assert.ok(this.$('.block-operator').length);
  assert.equal(this.$('.block-operator option:selected').text().trim(), '+');
  this.$('option[value="-"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-operator option:selected').text().trim(), '-');
});
