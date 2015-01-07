'use strict';

module.exports = function (path, selector) {
	selector = selector.split(' ');
	var s = -1;
	for (var i = 0; i < path.length; i++) {
		if (selector[++s] !== path[i]) {
			break;
		}

		if (s + 1 === selector.length && i + 1 === path.length) {
			return true;
		}
	}
};
