import Ember from 'ember';
import layout from '../templates/components/expression-builder';

export default Ember.Component.extend({
  layout,
  tagName: '',
  addComponent: 'expression-add',
  wrapComponent: 'expression-wrap',
  resultComponent: 'expression-result',
  hasOptions: Ember.computed.notEmpty('options'),

  expression: Ember.computed('blocks.@each.{id,type,value,operator}', function() {
    let blocks = Ember.get(this, 'blocks');
    let kv = blocks.map((block, i) => {
      if (block.wrapper) {
        return `${block.wrapper}`;
      }
      let showOperator = i + 1 < blocks.length;
      let operator = showOperator && block.operator ? ` ${block.operator}` : '';
      let type = block.type || '';
      let value = type && block.value ? `:${block.value}` : '';
      return `${type}${value}${operator}`
    })
    let exp = kv.join(' ');
    return exp;
  }),

  init() {
    this._super(...arguments);
    if (!Ember.get(this, 'blocks')) {
      this.set('blocks', Ember.A([{}]));
    }
  },

  setBlockProperties(blocks, block) {
    ['id','type','value','operator'].forEach((prop) => {
      Ember.set(blocks, prop, block[prop]);
    });
  },

  actions: {
    update(block) {
      let blocks = Ember.get(this, 'blocks');
      let ids = blocks.map((block) => {
        return block.id;
      })
      let index = ids.indexOf(block.id)
      if (index !== -1) {
        this.setBlockProperties(blocks[index], block);
      } else {
        let last = blocks.length - 1;
        this.setBlockProperties(blocks[last], block);
      }
    },

    add() {
      let blocks = Ember.get(this, 'blocks');
      blocks.pushObject({});
    },

    delete(index) {
      let blocks = Ember.get(this, 'blocks');
      blocks.removeAt(index);
    },

    wrap() {
      let blocks = Ember.get(this, 'blocks');
      blocks.insertAt(0, {wrapper: '('})
      blocks.pushObject({wrapper: ')'});
    }
  }
});
