function randParity() {
	return Math.random() <= 0.5 ? -1 : 1;
}

function randInt(min, max) {
	var range = max - min;
	return Math.floor(Math.random() * (range + 1)) + min;
}

function randReal(min, max) {
	return Math.random() * (max - min) + min;
}

function radToDeg(rad) {
	return rad * (180 / Math.PI);
}



function mod(n, m) {
	return n % m >= 0 ? n % m : n % m + m;
}

function drawLine(pos1, pos2, ctx, c, lw) {
	var linewidth = lw || 1;
	var color = c === undefined ? "#333" : c;
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.moveTo(pos1.x, pos1.y);
	ctx.lineTo(pos2.x, pos2.y);
	ctx.lineWidth = linewidth;
	ctx.stroke();
}

function terp(a,b) {
	return function(t) {
		return ((1-t) * a) + (t * b);
	};
}

function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

// function scale(dlo, dhi, rlo, rhi) {
// 	var b = terp(rlo, rhi);
// 	return function(t) {
// 		return b(t / (dhi - dlo));
// 	};
// }

function SVGFactory() {
	var width, height;
	var margin = { left: 0, top: 0, right: 0, bottom: 0 };

	function my() {}
	my.newSVG = function(selection) {
		var containerBox = selection.node().getBoundingClientRect();
		width = width === undefined ? containerBox.width - margin.left - margin.right : width;
		height = height === undefined ? containerBox.height - margin.top - margin.bottom : height;

		var svg = selection.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		return svg;
	};

	my.width = function(value) {
		if (!arguments.length) return width;
		width = isFinite(value) ? value : width;
		return my;
	};

	my.height = function(value) {
		if (!arguments.length) return height;
		height = isFinite(value) ? value : height;
		return my;
	};

	my.margin = function() {
		if (arguments.length === 1) {
			margin.left = isFinite(arguments[0]) ? arguments[0] : margin.left;
			margin.top = isFinite(arguments[0]) ? arguments[0] : margin.top;
			margin.right = isFinite(arguments[0]) ? arguments[0] : margin.right;
			margin.bottom = isFinite(arguments[0]) ? arguments[0] : margin.bottom;
		}
		else if (arguments.length === 2) {
			margin.left = isFinite(arguments[0]) ? arguments[0] : margin.left;
			margin.top = isFinite(arguments[1]) ? arguments[1] : margin.top;
			margin.right = isFinite(arguments[0]) ? arguments[0] : margin.right;
			margin.bottom = isFinite(arguments[1]) ? arguments[1] : margin.bottom;
		}
		else if (arguments.length === 4) {
			margin.left = isFinite(arguments[0]) ? arguments[0] : margin.left;
			margin.top = isFinite(arguments[1]) ? arguments[1] : margin.top;
			margin.right = isFinite(arguments[2]) ? arguments[2] : margin.right;
			margin.bottom = isFinite(arguments[3]) ? arguments[3] : margin.bottom;
		}
		else {
			return margin;
		}
		return my;
	};
	return my;
}

function sum() {
	var s = 0;
	var n = 0;
	if (arguments[0] instanceof Array) {
		n = arguments[0].length;
	}
	else {
		n = arguments.length;
	}

	for (var i=0; i<n; i++) {
		s += (arguments[0] instanceof Array) ? arguments[0][i] : arguments[i];
	}
	return s;
}

function AngleLerp(breaks, offsetAngle) {
	var b = breaks;
	var a = offsetAngle || 0;
	return function(i) {
		return (i * 2 * Math.PI / b) + a;
	};
}

function createLine(r1, r2, angle, offset) {
	return {
		x1: r1 * Math.cos(angle) + offset.x,
		y1: r1 * Math.sin(-angle) + offset.y,
		x2: r2 * Math.cos(angle) + offset.x,
		y2: r2 * Math.sin(-angle) + offset.y
	};
}

Array.prototype.indexOfBy = function(id, by) {
	var map = this.map(function(a){ return a[by]; });
	return map.indexOf(id);
};

// function span(f, breaks) {
// 	var myspan = [];
// 	for (var i=0; i<=breaks; i++) {
// 		myspan[i] = {i: i/breaks, fi: f(i/breaks)};
// 	}
// 	return myspan;
// }

function initEmptyArray(n, value) {
	value = value || null;
	var array = [];
	for (var i=0; i<n; i++) {
		array[i] = value;
	}
	return array;
}