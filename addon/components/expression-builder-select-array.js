import Ember from 'ember';
import layout from '../templates/components/expression-builder-select';

export default Ember.Component.extend({
  layout,
  tagName: '',
  selectedOption: Ember.computed('options', function() {
    Ember.set(this, '_selectedOption', undefined);
    return Ember.get(this, '_selectedOption');
  }),

  actions: {
    onchange(value) {
      Ember.set(this, '_selectedOption', value);
      let changeAction = Ember.get(this, 'changeAction');
      if (changeAction) {
        changeAction('dummy-value', Ember.get(this, '_selectedOption'));
      }
    }
  }
});
