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

test('blocks with wrapper blocks show wrapper content', function(assert) {
  let left_wrapper_block = { wrapper: '(' };
  let block = {id: '1', value: 1, type: 'x', operator: undefined};
  let right_wrapper_block = { wrapper: ')' };
  let blocks = Ember.A([left_wrapper_block, block, right_wrapper_block]);
  this.set('blocks', blocks);
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('operators', ['OR', 'AND']);
  this.render(hbs`{{expression-builder blocks=blocks options=options operators=operators}}`);
  assert.equal(this.$('.expression-result').text().trim(), '( x:1 )');
  assert.equal(this.$('.expression-blocks > div:nth-child(1)').text().trim(), '(');
  assert.notEqual(this.$('.expression-blocks > div:nth-child(2)').text().trim(), 'Delete');
  assert.notEqual(this.$('.expression-blocks > div:nth-child(2)').text().trim(), '()');
  assert.ok(this.$('.expression-blocks > div:nth-child(2)').text().trim().startsWith('Select'));
  assert.equal(this.$('.expression-blocks > div:nth-child(5)').text().trim(), ')');
});

test('add parentheses wraps current expression with parentheses', function(assert) {
  let block = {id: '1', value: 1, type: 'x', operator: undefined};
  let blocks = Ember.A([block]);
  this.set('blocks', blocks);
  this.set('options', {'x': [1], 'y': [2, 3]});
  this.set('operators', ['OR', 'AND']);
  this.render(hbs`{{expression-builder blocks=blocks options=options operators=operators}}`);
  assert.equal(this.$('.expression-result').text().trim(), 'x:1');
  assert.ok(this.$('.expression-blocks > div:nth-child(1)').text().trim().startsWith('Select'));
  Ember.run(() => document.querySelector('.expression-blocks > div:nth-child(5) .wrap').click());
  assert.equal(this.$('.expression-blocks > div:nth-child(1)').text().trim(), '(');
  assert.notEqual(this.$('.expression-blocks > div:nth-child(2)').text().trim(), 'Delete');
  assert.notEqual(this.$('.expression-blocks > div:nth-child(2)').text().trim(), '()');
  assert.ok(this.$('.expression-blocks > div:nth-child(2)').text().trim().startsWith('Select'));
  assert.equal(this.$('.expression-blocks > div:nth-child(5)').text().trim(), ')');
  assert.equal(this.$('.expression-result').text().trim(), '( x:1 )');
});
