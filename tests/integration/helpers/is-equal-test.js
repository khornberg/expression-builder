import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('is-equal', 'helper:is-equal', {
  integration: true
});

test('it renders true when parameters are equal', function(assert) {
  this.set('inputValue', '1234');
  this.render(hbs`{{is-equal inputValue '1234'}}`);
  assert.equal(this.$().text().trim(), 'true');
});

test('it renders false when parameters are not equal', function(assert) {
  this.set('inputValue', '1234');
  this.render(hbs`{{is-equal inputValue}}`);
  assert.equal(this.$().text().trim(), 'false');
});

