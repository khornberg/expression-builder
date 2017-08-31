import Ember from 'ember';
import layout from '../templates/components/expression-block';

export default Ember.Component.extend({
  layout,
  emptyText: 'Pass options to select type',
  selectComponent: 'expression-builder-select',
  hasOptions: Ember.computed(function() {
    return Ember.isPresent(Ember.get(this, 'optionKeys'));
  }),
  optionKeys: Ember.computed('options', function() {
    return Object.keys(Ember.getWithDefault(this, 'options', []));
  }),
  typeOptions: Ember.computed('options', function() {
    let defaultOption = [{'text': 'Select type', 'disabled': true}];
    return defaultOption.concat(this.formatForSelect(Ember.get(this, 'optionKeys')));
  }),
  valueOptions: Ember.computed('type', function() {
    Ember.setProperties(this, {'hasValue': false, 'value': undefined});
    let defaultOption = [{'text': 'Select value', 'disabled': true}];
    let values = Ember.get(this, 'options')[Ember.get(this, 'type')];
    if (values) {
      return defaultOption.concat(this.formatForSelect(values));
    }
    return defaultOption;
  }),

  formatForSelect(options) {
    return options.map((key) => {
      return {'text': key, 'value': key};
    });
  },

  actions: {
    typeChanged(value) {
      if (value) {
        Ember.setProperties(this, {'hasType': true, 'type': value});
      }
    },

    valueChanged(value) {
      Ember.setProperties(this, {'hasValue': true, 'value': value});
    }
  }
});
