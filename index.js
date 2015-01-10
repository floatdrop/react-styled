'use strict';

var postcss = require('postcss');
var camelCase = require('camelcase');
var match = require('./matcher.js');

var Styled = function Styled(css) {
	var cssRoot = postcss.parse(css);

	function traverse(element, path) {
		// TODO: optimize with some tree-structure
		cssRoot.each(function (rule) {
			if (rule.type === 'rule' && match(path, rule.selector)) {
				rule.eachDecl(function (decl) {
					element.props.style = element.props.style || {};
					element.props.style[camelCase(decl.prop)] = decl.value;
				});
			}
		});

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
		var self = this;
		return function () {
			var element = ReactElement.apply(self);
			return traverse(element, [element]);
		};
	};
};

module.exports = Styled;
