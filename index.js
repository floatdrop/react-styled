'use strict';

var parse = require('css/lib/parse');
var camelCase = require('camelcase');
var match = require('./matcher.js');

var Styled = function Styled(css) {
	var cssRoot = parse(css);

	function traverse(element, path) {
		// TODO: optimize with some tree-structure
		cssRoot.stylesheet.rules.forEach(function (rule) {
			if (rule.type === 'rule' && match(path, rule.selectors)) {
				rule.declarations.forEach(function (decl) {
					element.props.style = element.props.style || {};
					element.props.style[camelCase(decl.property)] = decl.value;
				});
			}
		});

		if (!element.props) {
			return element;
		}

		var children = element.props.children;

		if (children) {
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					path.push(children[i]);
					traverse(children, path);
					path.pop();
				}
			} else {
				path.push(children);
				traverse(children, path);
				path.pop();
			}
		}

		return element;
	}

	return function (ReactElement) {
		return function () {
			var element = ReactElement.apply(this);
			return traverse(element, [element]);
		};
	};
};

module.exports = Styled;
