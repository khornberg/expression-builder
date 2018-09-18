import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expression-builder', 'Integration | Component | expression builder', {
  integration: true
});

test('has empty text block if no options are passed', function(assert) {
  this.render(hbs`{{expression-builder}}`);
  assert.equal(this.$('.expression-blocks .block').text().trim(), 'Pass options to select type');
  assert.equal(this.$('.expression-result').text().trim(), '');
  assert.notOk(this.$('.add').length);
});

test('has initial block if options are passed', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.render(hbs`{{expression-builder options=options}}`);
  assert.equal(this.$('.expression-blocks .block-type select > option:selected').text().trim(), 'Select type');
  assert.equal(this.$('.expression-result').text().trim(), '');
});

test('does not have expression from placeholder block', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.render(hbs`{{expression-builder options=options}}`);
  assert.equal(this.$('.expression-blocks .block-type select > option:selected').text().trim(), 'Select type');
  assert.equal(this.$('.expression-result').text().trim(), '');
});

test('has expression from block', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.render(hbs`{{expression-builder options=options}}`);
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.equal(this.$('.expression-result').text().trim(), 'y');
  this.$('.block-value option[value="3"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.expression-result').text().trim(), 'y:3');
});

test('do not show operation when there is not another block', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('operators', ['-', '+']);
  this.render(hbs`{{expression-builder options=options operators=operators}}`);
  assert.notOk(this.$('.block-operator').length);
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.equal(this.$('.expression-result').text().trim(), 'y');
  this.$('.block-value option[value="3"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.expression-result').text().trim(), 'y:3');
  assert.ok(this.$('.block-operator').length);
  this.$('option[value="-"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-operator option:selected').text().trim(), '-');
  assert.ok(this.$('.block-operator').length);
  assert.equal(this.$('.expression-result').text().trim(), 'y:3');
});

test('can add another block', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('operators', ['OR', 'AND']);
  this.render(hbs`{{expression-builder options=options operators=operators}}`);
  assert.notOk(this.$('.block-operator').length);
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  this.$('.block-value option[value="3"]').prop('selected', true).trigger('change');
  this.$('.block-operator option[value="OR"]').prop('selected', true).trigger('change');
  Ember.run(() => document.querySelector('.add').click());
  this.$('.expression-blocks > div:nth-child(4) > .block-type option[value="x"]').prop('selected', true).trigger('change');
  this.$('.expression-blocks > div:nth-child(4) > .block-value option[value="1"]').prop('selected', true).trigger('change');
  this.$('.expression-blocks > div:nth-child(5) option[value="OR"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.expression-result').text().trim(), 'y:3 OR x:1');
  Ember.run(() => document.querySelector('.add').click());
  this.$('.expression-blocks > div:nth-child(7) > .block-type option[value="x"]').prop('selected', true).trigger('change');
  this.$('.expression-blocks > div:nth-child(7) > .block-value option[value="1"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.expression-result').text().trim(), 'y:3 OR x:1 OR x:1');
});

test('values change based on type', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('operators', ['OR', 'AND']);
  this.render(hbs`{{expression-builder options=options operators=operators}}`);
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  this.$('.block-value option[value="3"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.equal(this.$('.block-value select > option:selected').text().trim(), '3');
  this.$('.block-type option[value="x"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'x');
  assert.equal(this.$('.block-value select > option:selected').text().trim(), 'Select value');
});

test('can delete block', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('operators', ['OR', 'AND']);
  this.render(hbs`{{expression-builder options=options operators=operators}}`);
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  this.$('.block-value option[value="3"]').prop('selected', true).trigger('change');
  this.$('.block-operator option[value="OR"]').prop('selected', true).trigger('change');
  Ember.run(() => document.querySelector('.add').click());
  this.$('.expression-blocks > div:nth-child(4) > .block-type option[value="x"]').prop('selected', true).trigger('change');
  this.$('.expression-blocks > div:nth-child(4) > .block-value option[value="1"]').prop('selected', true).trigger('change');
  this.$('.expression-blocks > div:nth-child(5) option[value="OR"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.expression-result').text().trim(), 'y:3 OR x:1');
  Ember.run(() => document.querySelector('.expression-blocks > div:nth-child(6) .delete').click());
  assert.equal(this.$('.expression-result').text().trim(), 'y:3');
});

test('does not have expression if showExpression is false', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.render(hbs`{{expression-builder options=options showExpression=false}}`);
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.notOk(this.$('.expression-result').text().trim().length);
});

test('expressionChanged fired when expression changes', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  var exp = null;
  this.set('expressionChanged', (expression) => {exp=expression});
  this.render(hbs`{{expression-builder options=options expressionChanged=expressionChanged}}`);
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.equal(exp, 'y');
});

test('expressionChanged fired when expression changes even if showExpression is false', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  var exp = null;
  this.set('expressionChanged', (expression) => {exp=expression});
  this.render(hbs`{{expression-builder options=options expressionChanged=expressionChanged showExpression=false}}`);
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.equal(exp, 'y');
});

test('expressionChanged only fired when expression is something', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  var exp = 'previous value';
  this.set('expressionChanged', (expression) => {exp=expression});
  this.render(hbs`{{expression-builder options=options expressionChanged=expressionChanged showExpression=false}}`);
  assert.equal(exp, 'previous value');
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.equal(exp, 'y');
});

test('expressionChanged fired and returns blocks object when expression changes', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  var exp = null;
  this.set('expressionChanged', (expression, blocks) => {exp=JSON.stringify(blocks)});
  this.render(hbs`{{expression-builder options=options expressionChanged=expressionChanged}}`);
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.ok(exp.indexOf('"type":"y"') >= 0);
});

test('expressionChanged fired and returns blocks object when expression changes even if showExpression is false', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  var exp = null;
  this.set('expressionChanged', (expression, blocks) => {exp=JSON.stringify(blocks)});
  this.render(hbs`{{expression-builder options=options expressionChanged=expressionChanged showExpression=false}}`);
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.ok(exp.indexOf('"type":"y"') >= 0);
});

test('expressionChanged only fired and returns blocks object when expression is something', function(assert) {
  this.set('options', {'x': [1], 'y': [2, 3]});
  var exp = 'previous value';
  this.set('expressionChanged', (expression, blocks) => {exp=JSON.stringify(blocks)});
  this.render(hbs`{{expression-builder options=options expressionChanged=expressionChanged showExpression=false}}`);
  assert.equal(exp, 'previous value');
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.block-type select > option:selected').text().trim(), 'y');
  assert.ok(exp.indexOf('"type":"y"') >= 0);
});

test('can select a different index from the value', function(assert) {
  Ember.getOwner(this).resolveRegistration('config:environment').expressionBuilder.valueIndex = 1
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.render(hbs`{{expression-builder options=options valueComponent='expression-builder-select-array'}}`);
  this.$('.block-type option[value="y"]').prop('selected', true).trigger('change');
  this.$('.block-value option[value="3"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.expression-result').text().trim(), 'y:3');
});

test('can define a preset expression', function(assert) {
  Ember.getOwner(this).resolveRegistration('config:environment').expressionBuilder.valueIndex = 1
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('exp', [ { id: '', type: 'y', value: 3 } ]);
  this.render(hbs`{{expression-builder options=options valueComponent='expression-builder-select-array' preset=exp}}`);
  assert.equal(this.$('.expression-result').text().trim(), 'y:3');
});

test('correctly changes block of predefined expression', function(assert) {
  Ember.getOwner(this).resolveRegistration('config:environment').expressionBuilder.valueIndex = 1
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('exp', [ { id: 'un', type: 'y', value: 3 }, { id: 'du', type: 'x', value: 1 } ]);
  this.render(hbs`{{expression-builder options=options valueComponent='expression-builder-select-array' preset=exp}}`);
  assert.equal(this.$('.expression-result').text().trim(), 'y:3 x:1');
  this.$('.block-value option[value="2"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.expression-result').text().trim(), 'y:2 x:1');
});
