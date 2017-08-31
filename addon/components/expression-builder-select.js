import Ember from 'ember';
import layout from '../templates/components/expression-builder-select';

export default Ember.Component.extend({
  layout,

  selectedOption: Ember.computed('options', function() {
    Ember.set(this, '_selectedOption', undefined);
    return Ember.get(this, '_selectedOption');
  }),

  actions: {
    onchange(value) {
      Ember.set(this, '_selectedOption', value);
      let typeChangeAction = Ember.get(this, 'typeChanged') || Ember.get(this, 'valueChanged');
      if (typeChangeAction) {
        typeChangeAction(Ember.get(this, '_selectedOption'));
      }
    }
  }
});
