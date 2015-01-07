/* global it */
'use strict';

var React = require('react');
var Styled = require('..');
var cheerio = require('cheerio');
var assert = require('assert');

it('should apply styles to simple button', function () {
	var styled = new Styled('button { border-radius: 5px; }; span { color: black; }');

	var Button = React.createClass({
		render: styled(function () {
			return React.createElement('button', null,
				React.createElement('span', null, this.props.children)
			);
		})
	});

	var markup = React.renderToStaticMarkup(React.createElement(Button));
	var $ = cheerio.load(markup);

	assert.equal($('button').attr('style'), 'border-radius: 5px');
	assert.equal($('button span').attr('style'), 'color: black');
});
