# react-styled [![Build Status](https://travis-ci.org/floatdrop/react-styled.svg?branch=master)](https://travis-ci.org/floatdrop/react-styled)

:warning: __Highly experimental__ tool for applying styles to React components.

__TODO:__

 * [ ] Proper CSS matching
 * [x] Pass props to selector matching
 * [x] Pass state to selector matching
 * [ ] Implement className generation in cases when `:before` is used
 * [ ] Implement `<style>` tag generation for custom classes

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
var styled = new Styled(require('css-loader!./index.css').toString());

var Button = React.createClass({
	getInitialState: function() {
		return {hovered: 'no'};
	},

	mouseLeave: function () {
		this.setState({hovered: 'no'});
	},

	mouseEnter: function () {
		this.setState({hovered: 'yes'});
	},

	render: styled(function () {
		return (
			<button onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
				<span>
					{this.props.children}
				</span>
			</button>
		);
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
