import Ember from 'ember';
import layout from '../templates/components/expression-block';

export default Ember.Component.extend({
  layout,
  tagName: '',
  emptyText: 'Pass options to select type',
  typeComponent: 'expression-builder-select',
  valueComponent: 'expression-builder-select',
  operatorComponent: 'expression-builder-select',
  deleteComponent: 'expression-delete',
  id: Ember.computed(function() {
    return Ember.guidFor(Ember.getProperties(this, 'type', 'value'));
  }),
  hasType: Ember.computed('type', function() {
    return Ember.getWithDefault(this, 'type', false);
  }),
  hasValue: Ember.computed('value', function() {
    return Ember.getWithDefault(this, 'value', false);
  }),
  hasOptions: Ember.computed(function() {
    return Ember.isPresent(Ember.get(this, 'optionKeys'));
  }),
  optionKeys: Ember.computed('options', function() {
    return Object.keys(Ember.getWithDefault(this, 'options', []));
  }),
  typeOptions: Ember.computed('options', function() {
    let defaultOption = [{ text: 'Select type', disabled: true }];
    return defaultOption.concat(this.formatForSelect(Ember.get(this, 'optionKeys')));
  }),
  valueOptions: Ember.computed('type', function() {
    let defaultOption = [{ text: 'Select value', disabled: true }];
    let values = Ember.get(this, 'options')[Ember.get(this, 'type')];
    if (values) {
      return defaultOption.concat(this.formatForSelect(values));
    }
    return defaultOption;
  }),
  operatorOptions: Ember.computed('operators', function() {
    let defaultOption = [{ text: 'Select operator', disabled: true }];
    return defaultOption.concat(this.formatForSelect(Ember.getWithDefault(this, 'operators', [])));
  }),

  formatForSelect(options) {
    return options.map(key => {
      return { text: key, value: key };
    });
  },

  updateBuilder() {
    let update = Ember.get(this, 'update');
    if (update) {
      update(Ember.getProperties(this, 'id', 'type', 'value', 'operator'));
    }
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (Ember.get(this, 'block')) {
      this.setProperties({
        value: Ember.get(this, 'block.value'),
        type: Ember.get(this, 'block.type'),
        operator: Ember.get(this, 'block.operator'),
      });
    }
  },

  actions: {
    typeChanged(value) {
      if (value) {
        Ember.setProperties(this, {'type': value, 'value': undefined});
        this.updateBuilder();
      }
    },

    valueChanged(value) {
      Ember.set(this, 'value', value);
      this.updateBuilder();
    },

    operatorChanged(value) {
      Ember.set(this, 'operator', value);
      this.updateBuilder();
    },
  },
});
