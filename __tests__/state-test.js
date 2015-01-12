/* global describe, it, expect, jest */

'use strict';

jest
	.dontMock('..')
	.dontMock('../matcher.js')
	.dontMock('postcss');

var Styled = require('..');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('props assignment', function() {
	it('should support simple props as attributes', function() {
		var styled = new Styled('button { display: block }; button[hovered="yes"] { color: red }');

		var Button = React.createClass({
			getInitialState: function () {
				return {hovered: 'yes'};
			},
			render: styled(function () {
				return React.createElement('button');
			})
		});

		var button = TestUtils.renderIntoDocument(React.createElement(Button));
		expect(button.getDOMNode().style.display).toBe('block');
		expect(button.getDOMNode().style.color).toBe('red');
	});
});
