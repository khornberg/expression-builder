import Ember from 'ember';

export default Ember.Route.extend({
  options: {'x': [1], 'y': [2, 3]},
  operators: ['OR', 'AND'],
});
