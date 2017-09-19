// adding in "return this;" at the end of each function to allow for method chaining
function Vec2(x, y) {
	this.x = x;
	this.y = y;

	this.scale = function(s) {
		this.x *= s;
		this.y *= s;
		return this;
	};

	this.add = function(vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	};

	this.subtract = function(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	};

	this.normalize = function() {
		var m = this.mag();
		if (m > 0) {
			this.x /= m;
			this.y /= m;
		}
		return this;
	};

	// if m < 0 then the vector has positive magnitude in the opposite direction
	this.mag = function(m) {
		if (!arguments.length) return Math.sqrt( (this.x * this.x) + (this.y * this.y) );
		this.normalize();
		this.scale(m);
		return this;
	};

	this.makeZeroVec2 = function() {
		this.x = 0;
		this.y = 0;
		return this;
	};

	this.limit = function(lim) {
		if (this.mag() > lim) {
			this.mag(lim);
		}
		return this;
	};

	this.angle = function() {
		var a = Math.atan2(this.y, this.x);
		return a >= 0 ? a : a + (2 * Math.PI);
	};

	this.deg = function() {
		return this.angle() * 180 / Math.PI;
	};

	this.clone = function() {
		return new Vec2(this.x, this.y);
	};

	this.rotate = function(angle) {
		var m = this.mag();
		var a = this.angle();
		var v = Vec2.normWithAngle(a + angle).mag(m);
		this.x = v.x;
		this.y = v.y;
		return this;
	};

}

Vec2.add = function() {
	var n = 0;
	if (arguments[0] instanceof Array) {
		n = arguments[0].length;
	}
	else {
		n = arguments.length;
	}

	var v = Vec2.zero();
	for (var i=0; i<n; i++) {
		var b = (arguments[0] instanceof Array) ? arguments[0][i] : arguments[i];
		b = (b instanceof Vec2) ? b : Vec2.zero();
		v.add(b);
	}
	return v;
};

Vec2.subtract = function(v1, v2) {
	return new Vec2(v1.x - v2.x, v1.y - v2.y);
};
Vec2.randNorm = function() {
	var xparity = Math.random() <= 0.5 ? 1 : -1;
	var yparity = Math.random() <= 0.5 ? 1 : -1; 
	return new Vec2(xparity * Math.random(), yparity * Math.random()).normalize();
};

Vec2.zero = function() {
	return new Vec2(0,0);
};

Vec2.dot = function(v1, v2) {
	return (v1.x * v2.x) + (v1.y * v2.y);
};

Vec2.clone = function(v) {
	return new Vec2(v.x, v.y);
};

Vec2.slope = function(v) {
	return v.y / v.x;
};

Vec2.equals = function(v1, v2) {
	return v1.x === v2.x && v1.y === v2.y;
};

Vec2.angle = function(v1, v2) {
	if (v2 === undefined) return v1.angle();
	var a = v2.angle() - v1.angle();
	return a >= 0 ? a : a + 2 * Math.PI;
};

Vec2.deg = function(v1, v2) {
	return Vec2.angle(v1, v2) * 180 / Math.PI;
};

Vec2.normalize = function(v) {
	var a = Vec2.clone(v);
	return a.normalize();
};

Vec2.randSpray = function(direction, sprayAngle) {
	if (sprayAngle === 2*Math.PI) {
		var b = Vec2.randNorm();
		b.mag(direction.mag());
		return b;
	}
	var r = direction.mag();
	var theta = Vec2.angle(direction);
	var xmin = r * Math.cos(theta - sprayAngle/2);
	var xmax = r * Math.cos(theta + sprayAngle/2);
	var ymin = r * Math.sin(theta - sprayAngle/2);
	var ymax = r * Math.sin(theta + sprayAngle/2);
	var v = new Vec2(randReal(xmin, xmax), randReal(ymin, ymax)); 
	return v;
};

Vec2.north = function() {
	return new Vec2(0,1);
};
Vec2.south = function() {
	return new Vec2(0,-1);
};
Vec2.east = function() {
	return new Vec2(1,0);
};
Vec2.west = function() {
	return new Vec2(-1,0);
};

Vec2.normWithAngle = function(angle, inDeg) {
	var inDeg = inDeg || false; // default is radians

	angle = inDeg ? (angle * Math.PI / 180) : angle; 

	var x = Math.cos(angle);
	var y = Math.sin(angle);
	return new Vec2(x,y);
};

Vec2.rotate = function(v, angle) {
	var m = v.mag();
	var a = v.angle();
	return Vec2.normWithAngle(a + angle).mag(m);
};

Vec2.degToRad = function(deg) {
	return deg * Math.PI / 180;
};

Vec2.radToDeg = function(rad) {
	return rad * 180 / Math.PI;
};