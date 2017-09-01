import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expression-builder', 'Integration | Component | expression builder', {
  integration: true
});

test('has empty text block if no options are passed', function(assert) {
  this.render(hbs`{{expression-builder}}`);
  assert.equal(this.$('.expression-blocks').text().trim(), 'Pass options to select type');
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
  this.$('.expression-blocks > div:nth-child(2) > .block-type option[value="x"]').prop('selected', true).trigger('change');
  this.$('.expression-blocks > div:nth-child(2) > .block-value option[value="1"]').prop('selected', true).trigger('change');
  this.$('.expression-blocks > div:nth-child(2) > .block-operator option[value="OR"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.expression-result').text().trim(), 'y:3 OR x:1');
  Ember.run(() => document.querySelector('.add').click());
  this.$('.expression-blocks > div:nth-child(3) > .block-type option[value="x"]').prop('selected', true).trigger('change');
  this.$('.expression-blocks > div:nth-child(3) > .block-value option[value="1"]').prop('selected', true).trigger('change');
  assert.equal(this.$('.expression-result').text().trim(), 'y:3 OR x:1 OR x:1');
});
