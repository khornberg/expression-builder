import Ember from 'ember';
import layout from '../templates/components/expression-builder';

export default Ember.Component.extend({
  layout,
  tagName: '',
  blockComponent: 'expression-block',
  addComponent: 'expression-add',
  deleteComponent: 'expression-delete',
  typeComponent: 'expression-builder-select',
  valueComponent: 'expression-builder-select',
  operatorComponent: 'expression-builder-select',
  resultComponent: 'expression-result',
  hasOptions: Ember.computed.notEmpty('options'),
  hasExpression: Ember.computed.and('expression', 'showExpression'),
  showExpression: true,
  multipleBlocks: Ember.computed('blocks.@each', function() {
    return this.get('blocks').length > 1;
  }),

  expression: Ember.computed('blocks.@each.{id,type,value,operator}', function() {
    let blocks = Ember.get(this, 'blocks');
    let kv = blocks.map((block, i) => {
      let showOperator = i + 1 < blocks.length;
      let operator = showOperator && block.operator ? ` ${block.operator}` : '';
      let type = block.type || '';
      let value = type && block.value ? `:${block.value}` : '';
      return `${type}${value}${operator}`
    })
    let exp = kv.join(' ');
    if(this.notFirstRun && Ember.get(this, 'expressionChanged')) {
      Ember.get(this, 'expressionChanged')(exp, blocks);
    }
    if (!this.notFirstRun) {
      this.set('notFirstRun', true);
    }
    return exp;
  }),

  init() {
    this._super(...arguments);
    this.set('blocks', Ember.A(this.preset || [{}]));
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
    }
  }
});
