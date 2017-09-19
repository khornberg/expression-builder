# expression-builder

## Installation

* `emebr install expression-builder`

## Usage

`{{expression-builder options=options operators=operators}}`

Passed in

```
options: {'x': [1], 'y': [2, 3]},
operators: ['OR', 'AND'],
```

### Options

You can specify the components used for various parts.

Provide an action to `expressionChanged` and it will be invoked with the expresion when it changes.

`showExpression=false` disables `expression-builder` from showing the expression. This is useful if you want to show the expression outside of the component.

## Contributing

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

### Docs

* `npm docs` Builds docs
