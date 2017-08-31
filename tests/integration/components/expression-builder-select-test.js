import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expression-builder-select', 'Integration | Component | expression builder select', {
  integration: true
});

test('select renders option', function(assert) {
  this.set('options', [{'text': 'Select type'}]);
  this.render(hbs`{{expression-builder-select options=options}}`);
  assert.equal(this.$().text().trim(), 'Select type');
  assert.notOk(this.$('option').attr('disabled'));
});

test('select renders option as disabled', function(assert) {
  this.set('options', [{'text': 'Select type', 'disabled': true}]);
  this.render(hbs`{{expression-builder-select options=options}}`);
  assert.equal(this.$().text().trim(), 'Select type');
  assert.ok(this.$('option').attr('disabled'));
});

test('select renders option as selected', function(assert) {
  this.set('options', [{'text': 'Select type', 'value': 1}, {'text': 'Select type2', 'value': 0}]);
  this.render(hbs`{{expression-builder-select options=options selectedOption=0}}`);
  assert.equal(this.$('option:selected').val(), 0);
});

test('select renders first option as selected if no option is selected', function(assert) {
  this.set('options', [{'text': 'Select type', 'value': 1}, {'text': 'Select type2', 'value': 0}]);
  this.render(hbs`{{expression-builder-select options=options}}`);
  assert.equal(this.$('option:selected').val(), 1);
});

test('select renders a disabled option as selected if no option is selected', function(assert) {
  this.set('options', [{'text': 'Select type', 'disabled': true, 'value': 1}, {'text': 'Select type2', 'value': 0}]);
  this.render(hbs`{{expression-builder-select options=options}}`);
  assert.equal(this.$('option:selected').val(), 1);
});

test('select renders option value', function(assert) {
  this.set('options', [{'text': 'Select type', 'value': 123}]);
  this.render(hbs`{{expression-builder-select options=options}}`);
  assert.equal(this.$().text().trim(), 'Select type');
  assert.equal(this.$('option').attr('value'), 123);
});

test('select renders options', function(assert) {
  this.set('options', [{'text': 'Select type'}, {'text': 'xyz'}]);
  this.render(hbs`{{expression-builder-select options=options}}`);
  assert.equal(this.$('select > option:first-child').text().trim(), 'Select type');
  assert.equal(this.$('select > option:last-child').text().trim(), 'xyz');
});

test('changing type triggers type change action', function(assert) {
  this.set('options', [{'text': 'Select type', 'value': 1}, {'text': 'xyz', 'value': 2}]);
  let changed = false;
  this.set('typeChanged', () => { changed = true });
  this.render(hbs`{{expression-builder-select options=options selectedOption=1 typeChanged=typeChanged}}`);
  assert.equal(this.$('option:selected').val(), 1);
  this.$(`option[value="${2}"]`).prop('selected',true).trigger('change');
  assert.equal(this.$('option:selected').val(), 2);
  assert.ok(changed);
});

test('changing value triggers value change action', function(assert) {
  this.set('options', [{'text': 'Select type', 'value': 1}, {'text': 'xyz', 'value': 2}]);
  let changed = false;
  this.set('valueChanged', () => { changed = true });
  this.render(hbs`{{expression-builder-select options=options selectedOption=1 valueChanged=valueChanged}}`);
  assert.equal(this.$('option:selected').val(), 1);
  this.$(`option[value="${2}"]`).prop('selected',true).trigger('change');
  assert.equal(this.$('option:selected').val(), 2);
  assert.ok(changed);
});
