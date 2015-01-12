'use strict';

var parse = require('slick').parse;

function getAttr(element, name) {
	// TODO: Should we look into context to?
	if (element._owner && element._owner.state && element._owner.state[name]) {
		return element._owner.state[name];
	}

	if (element.props && element.props[name]) {
		return element.props[name];
	}
}

function matchAttributes(element, attrs) {
	for (var i = 0; i < attrs.length; i++) {
		var expected = attrs[i];
		var actual = getAttr(element, expected.name);

		if (!expected.operator) {
			return !!actual;
		}

		if (expected.operator === '=') {
			return actual === expected.value;
		}

		// TODO: Implement ~= |= ^= $= *= operators
	}
}

function match(path, selectors) {
	var sIdx = 0;
	for (var pathIdx = 0; pathIdx < path.length && sIdx < selectors.length; pathIdx++) {
		var selector = selectors[sIdx];
		var element = path[pathIdx];

		if (selector.tag !== element.type) {
			if (selector.combinator === '>') {
				return false;
			}
			continue;
		}

		if (selector.attributes && !matchAttributes(element, selector.attributes)) {
			if (selector.combinator === '>') {
				return false;
			}
			continue;
		}

		sIdx++;
	}

	if (sIdx === selectors.length && pathIdx === path.length) {
		return true;
	}
}

module.exports = function (path, expression) {
	expression = parse(expression);

	for (var i = 0; i < expression.length; i++) {
		if (match(path, expression[i])) {
			return true;
		}
	}
};
