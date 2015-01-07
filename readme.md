# react-styled [![Build Status](https://travis-ci.org/floatdrop/react-styled.svg?branch=master)](https://travis-ci.org/floatdrop/react-styled)

Simple tool for applying styles to React components.

:warning: __Highly experimental__

__TODO:__

 * [ ] Proper CSS matching
 * [ ] Way to work with `:before`, `:after`, etc...

## Usage

`index.css`:

```css
button {
	border: 1px solid #eee;
}

button span {
	color: blue;
}

button[pressed="yes"] span {
	color: red;
}
```

`index.jsx`:

```js
var React = require('react');
var Styled = require('react-styled');

// Somehow get index.css contents, webpack for example:
var styled = new Styled(require('css!./index.css'));

var Button = React.createClass({
	onMouseUp: function () {
		this.props.pressed = 'no';
	},

	onMouseLeave: function () {
		this.props.pressed = 'no';
	},

	onMouseDown: function () {
		this.props.pressed = 'yes';
	},

	render: styled(function () {
		var button = (
			<button>
				<span>{this.props.children}</span>
			</button>
		);

		var link = (
			<a>
				<span>{this.props.children}</span>
			</a>
		);

		return this.props.url ? button : link;
	})
});
```

## How does it works

Magic.

## API

### Styled(css)

Returns decorator `Function` for wrapping `render` method of React component.

Not so much yet.

## License

MIT © [Vsevolod Strukchinsky](floatdrop@gmail.com)
