// create a Particle "class"
function Particle() {
	// initial values of internal variables
	var x = 0;
	var y = 0;
	var lifespan = 0;
	var life = lifespan;

	var xbounds = [0,0];
	var ybounds = [0,0];

	var isAlive = false;

	function my(){}

	// the following functions allow access to the inner variables
	my.x = function(value) {
		if (!arguments.length) return x;	// call particle.x() to "get" x
		x = value;												// call particle.x(value) to "set" x = value
		return my;
	};

	my.y = function(value) {
		if (!arguments.length) return y;
		y = value;
		return my;
	};

	my.life = function(value) {
		if (!arguments.length) return life;
		lifespan = value;
		life = clamp(value, 0, lifespan);
		isAlive = life > 0 ? true : false;
		return my;
	};

	my.lifeRemainingPercentage = function() {
		return life / lifespan;
	};

	my.xbounds = function(lower, upper) {
		if (!arguments.length) return xbounds;
		xbounds = [Math.min(lower, upper), Math.max(lower, upper)];
		return my;
	};

	my.ybounds = function(lower, upper) {
		if (!arguments.length) return ybounds;
		ybounds = [Math.min(lower, upper), Math.max(lower, upper)];
		return my;
	};

	my.isAlive = function(bool) {
		if (!arguments.length) return isAlive;
		isAlive = bool;
		return my;
	};

	my.hasLifeRemaining = function() {
		if (life > 0)
			return true;
		else
			return false;
	};

	// checks to see if the particle is within the boundaries or not
	my.isInsideBounds = function() {
		if (x >= xbounds[0] && x <= xbounds[1] && y >= ybounds[0] && y <= ybounds[1])
			return true;
		else
			return false;
	};

	my.decreaseLife = function(value) {
		if (!arguments.length)
			life--;
		else
			life -= value;

		my.isAlive(my.hasLifeRemaining());
	};

	my.move = function(vx, vy) {
		x += vx;
		y += vy;
	};

	my.printLog = function() {
		console.log("(x,y): (" + x + "," + y + ")");
		console.log("isAlive: " + my.isAlive());
	};

	return my;
}


// Emitter "class" using the module pattern
function Emitter() {
	var x = 0;
	var y = 0;
	var particleList = [];
	var maxParticles = 0;
	var emissionRate = 1;

	// empty: user should define how to create particles
	var createParticle = function(p){};

	// empty: user should define how to update particles
	var updateParticle = function(p){};
	
	// empty: user should define how to draw particles
	var drawParticle = function(p){};

	// empty: user should define how to destroy particles
	var destroyParticle = function(p){};

	function my(){}

	my.x = function(value) {
		if (!arguments.length) return x;
		x = value;
		return my;
	};

	my.y = function(value) {
		if (!arguments.length) return y;
		y = value;
		return my;
	};

	my.emissionRate = function(value) {
		if (!arguments.length) return emissionRate;
		emissionRate = clamp(value, 1, maxParticles);
		return my;
	};

	my.maxParticles = function(value) {
		if (!arguments.length) return maxParticles;
		maxParticles = value;
		return my;
	};

	function emitParticles() {
		for (var i=0; i<emissionRate; i++) {
			if (particleList.length < maxParticles) {
				// create the particle object to pass to the createParticle function
				// default location of particles set to emitter's location
				var particle = Particle().x(x).y(y);
				createParticle(particle);
				
				particleList.push(particle);
			}
			else {
				break;
			}
		}
	}

	my.update = function() {
		emitParticles();

		// update and draw each particle in the list
		for (var i=particleList.length - 1; i>=0; i--) {
			var particle = particleList[i];
			updateParticle(particle);
			drawParticle(particle);

			// if the particle is "dead", remove it from the list
			if (!particle.isAlive()) {
				destroyParticle(particle);
				particleList.splice(i,1);
			}
		}
	};

	my.createParticle = function(createParticleFunction) {
		if (createParticleFunction !== undefined) {
			if (typeof(createParticleFunction) === "function") {
				createParticle = createParticleFunction;
			}
		}
		return my;
	};

	my.updateParticle = function(updateParticleFunction) {
		if (updateParticleFunction !== undefined) {
			if (typeof(updateParticleFunction) === "function") {
				updateParticle = updateParticleFunction;
			}
		}
		return my;
	};

	my.drawParticle = function(drawParticleFunction) {
		if (drawParticleFunction !== undefined) {
			if (typeof(drawParticleFunction) === "function") {
				drawParticle = drawParticleFunction;
			}
		}
		return my;
	};

	my.destroyParticle = function(destroyParticleFunction) {
		if (destroyParticleFunction !== undefined) {
			if (typeof(destroyParticleFunction) === "function") {
				destroyParticle = destroyParticleFunction;
			}
		}
		return my;
	};

	return my;
}