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
		var styled = new Styled('button { display: block }; button span { color: black }');

		var Button = React.createClass({
			render: styled(function () {
				return React.createElement('button', null,
					React.createElement('span')
				);
			})
		});

		var button = TestUtils.renderIntoDocument(React.createElement(Button));
		expect(button.getDOMNode().style.display).toBe('block');
		expect(button.getDOMNode().childNodes[0].style.color).toBe('black');
	});
});
