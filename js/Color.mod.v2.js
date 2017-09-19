function Color() {

	// if (!(this instanceof Color)) { throw new Error("Instantiate with the 'new' keyword."); }

	var r = arguments[0];
	var g = arguments[1];
	var b = arguments[2];
	var a = arguments[3];

	var k;

	var arg = arguments[0];
	var arg2 = arguments[1];

	if (typeof arg === 'object') {
		if (arg !== null) {
			k = Object.keys(arg);
			if (k.length <= 3) arg.a = arg2;
		}
		helpSetRGBA(arg);
	}
	else if (typeof arg === 'string') {
		var h;
		if (arg.charAt(0) === "#") {
			h = Color.hexToRGB(arg);
			if (h !== null) {
				h.a = arg2;
			}	
		}
		else if (arg.slice(0,3) === "rgb") {
			h = {};
			// var nums = arg.match(/\d+/g);
			// var nums = arg.match(/(?:-\d+)|(?:\d+)|(?:-\d+[.]\d+)|(?:\d+[.]\d+)/g);
			// var nums = arg.match(/(?:-\d+\.\d+)|(?:\d+\.\d+)|(?:-\.\d+)|(?:\.d+)|(?:-\d+)|(?:\d+)/g);
			var nums = arg.match(/(?:-\d*\.\d*)|(?:\d*\.\d*)|(?:-\d+)|(?:\d+)/g);
			nums = nums === null ? [] : nums;
			// console.log(nums);
			try {
				if (nums.length > 4) {
					throw "Invalid input - Use a CSS color string, individual RGB/A components, an Object with RGB/A components, or valid Hex color codes - Returning random color instead.";
				}
				else {
					for (var i=0; i<nums.length; i++) { 
						h[i] = parseFloat(nums[i]); 
						h[i] = !isFinite(h[i]) ? null : h[i];
					}
				}
			}
			catch(e) {
				console.log(e);
				h = {r: -1, g: -1, b: -1, a: 1};
			}			
		}
		else {
			try { throw "Invalid input - Use a CSS color string, individual RGB/A components, an Object with RGB/A components, or valid Hex color codes - Returning random color instead.";
			}
			catch(e) { 
				console.log(e);
				h = {r: -1, g: -1, b: -1, a: 1};
			}
		}
		helpSetRGBA(h);
	}

	function helpSetRGBA(obj) {
		if (obj === null) {
			r = g = b = a = null;
			return;
		}
		var k = Object.keys(obj);
		
		r = (typeof obj[k[0]] === 'number' && isFinite(obj[k[0]]) || obj[k[0]] === undefined) ? obj[k[0]] : null;
		g = (typeof obj[k[1]] === 'number' && isFinite(obj[k[1]]) || obj[k[1]] === undefined) ? obj[k[1]] : null;
		b = (typeof obj[k[2]] === 'number' && isFinite(obj[k[2]]) || obj[k[2]] === undefined) ? obj[k[2]] : null;
		a = (typeof obj[k[3]] === 'number' && isFinite(obj[k[3]]) || obj[k[3]] === undefined) ? obj[k[3]] : null;

		// console.log(typeof r);
		// console.log(typeof g);
		// console.log(typeof b);
		// console.log(typeof a);
		// console.log(k);
		// console.log(obj);
		// console.log("r: " + r + " g: " + g + " b: " + b + " a: " + a);
	}

	function genRGB(c) {
		try {
			if (c === undefined || c === -1) return randInt(0,255);
			else if (c > 255 || c < 0 || c === null) throw "An RGB component was either out of bounds or had an improper value - Random value used instead";
			else return Math.floor(c);	
		}
		catch(e) { 
			console.log(e);
			return randInt(0,255);
		}
	}

	function genAlpha(c) {
		try {
			if (c === -1) return randReal(0,1);
			else if (c === undefined) return 1;
			else if (c < 0 || c > 1 || c === null) throw "The Alpha component was either out of bounds or had an improper value - Default of 1 used instead";
			else return c;	
		}
		catch(e) { 
			console.log(e); 
			return 1;
		}
	}

	var _r = genRGB(r);
	var _g = genRGB(g);
	var _b = genRGB(b);
	var _a = genAlpha(a);	
	
	function my() {}

	my.rgbString = function(){ return "rgb(" + _r + ", " + _g + ", " + _b + ")"; };
	my.rgbaString = function(){ return "rgba(" + _r + ", " + _g + ", " + _b + ", " + _a + ")";};
	my.hex = function(value) {
		if (!arguments.length) return Color.rgbToHex(_r, _g, _b); 
		var h = Color.hexToRGB(value);
		if (h !== null) {
			_r = h.r;
			_g = h.g;
			_b = h.b;
		}
		return my;
	};
	my.rgb = function(r,g,b) { 
		if (!arguments.length) return { r: _r, g: _g, b: _b }; 
		my.r(r);
		my.g(g);
		my.b(b);
		return my;
	};
	my.rgba = function(r,g,b,a) { 
		if (!arguments.length) return { r: _r, g: _g, b: _b, a: _a }; 
		my.rgb(r,g,b);
		my.a(a);
		return my;
	};

	my.r = function(value) {
		if (!arguments.length) return _r;
		_r = (typeof value === 'number' && isFinite(value)) ? genRGB(value) : _r;
		return my;
	};

	my.g = function(value) {
		if (!arguments.length) return _g;
		_g = (typeof value === 'number' && isFinite(value)) ? genRGB(value) : _g;
		return my;
	};

	my.b = function(value) {
		if (!arguments.length) return _b;
		_b = (typeof value === 'number' && isFinite(value)) ? genRGB(value) : _b;
		return my;
	};

	my.a = function(value) {
		if (!arguments.length) return _a;
		_a = (typeof value === 'number' && isFinite(value)) ? genAlpha(value) : _a;
		return my;
	};

	my.clone = function() {
		return new Color(my.r(), my.g(), my.b(), my.a());
	};

	return my;
}




Color.rgbToHex = function(r,g,b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
Color.hexToRGB = function(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
	} : null;
};


function colorTest() {
	console.log(new Color().rgba());
	console.log("-------------\n");

	console.log(new Color(255).rgba());
	console.log("-------------\n");

	console.log(new Color(155,100).rgba());
	console.log("-------------\n");

	console.log(new Color(200,9,70).rgba()); 
	console.log("-------------\n");

	console.log(new Color(200,9,70,-1).rgba()); 
	console.log("-------------\n");

	console.log(new Color(200,9,70,100).rgba()); 
	console.log("-------------\n");

	console.log(new Color(200,9,70,0.85).rgba());
	console.log("-------------\n");

	
	console.log(new Color(255,-1,200).rgba());
	console.log("-------------\n");

	console.log(new Color(-1,100,-1).rgba());
	console.log("-------------\n");

	console.log(new Color(0,0,-1,0.4).rgba());
	console.log("-------------\n");

	console.log(new Color(-1,-1,-1,7).rgba());
	console.log("-------------\n");
	
	console.log(new Color("#333").rgba());
	console.log("-------------\n");

	console.log(new Color("#333",0.4).rgba());
	console.log("-------------\n");

	console.log(new Color("#333",-1).rgba());
	console.log("-------------\n");

	console.log(new Color("#333",-4).rgba());
	console.log("-------------\n");

	console.log(new Color("#0099ff").rgba());
	console.log("-------------\n");

	console.log(new Color("#0099ff",0.9).rgba());
	console.log("-------------\n");

	console.log(new Color("#0099ff",-1).rgba());
	console.log("-------------\n");

	console.log(new Color("#0099ff",9).rgba()); 
	console.log("-------------\n");

	console.log(new Color({}).rgba());
	console.log("-------------\n");

	console.log(new Color({f:50, g:200, b:300}).rgba());
	console.log("-------------\n");

	console.log(new Color({r:-10}).rgba());
	console.log("-------------\n");

	console.log(new Color({r:10, g:10}).rgba()); 
	console.log("-------------\n");

	console.log(new Color({r:10, g:10, b:10}).rgba());
	console.log("-------------\n");

	console.log(new Color({r:10, g:10, b:10, a:0.6}).rgba());
	console.log("-------------\n");



	console.log(new Color("").rgba());
	console.log("\n");

	console.log(new Color(null).rgba());
	console.log("\n");

	console.log(new Color(new Vec2(0,6)).rgba());
	console.log("\n");

	console.log(new Color({r:8, g:"fish"}).rgba());
	console.log("\n");

	console.log(new Color("90f3").rgba());
	console.log("\n");

	console.log(new Color(1000).rgba());
	console.log("\n");

	console.log(new Color(-1, -10).rgba());
	console.log("\n");

	console.log(new Color(-1, 100, 500).rgba());
	console.log("\n");

	console.log(new Color(100, 100, 100, -5).rgba());
	console.log("\n");
	// console.log("---------------");

	console.log(new Color("rgb()").rgba());
	console.log("-------------\n");

	console.log(new Color("rgba()").rgba());
	console.log("-------------\n");

	console.log(new Color("rgb(1)").rgba());
	console.log("-------------\n");

	console.log(new Color("rgb(2,90,-1,-1)").rgba());
	console.log("-------------\n");

	console.log(new Color("rgb(50,50,50,0.11)").rgba());
	console.log("-------------\n");

	console.log(new Color("rgb(500,50,50.5,.15)").rgba());
	console.log("-------------\n");

	console.log(new Color("rgb(500..2,..50,-50.5,-.15)").rgba());
	console.log("-------------\n");

	console.log(new Color("rgb(500..2,.)").rgba());
	console.log("-------------\n");

	console.log(new Color("rbg(50,50,50,1)").rgba());
	console.log("-------------\n");
}
