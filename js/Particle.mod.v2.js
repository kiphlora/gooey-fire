function Particle() {
	var life = 100;
	var position = Vec2.zero();
	var velocity = Vec2.zero();
	var acceleration = Vec2.zero();
	var customizations = {};

	function my() {}
	my.pos = function(value) {
		if (!arguments.length) return position;
		position = value instanceof Vec2 ? value : position;
		return my;
	};
	my.vel = function(value) {
		if (!arguments.length) return velocity;
		velocity = value instanceof Vec2 ? value : velocity;
		return my;
	};
	my.angle = function() {
		return velocity.angle();
	};
	my.life = function(value) {
		if (!arguments.length) return life;
		life = isFinite(value) && value >= 0 ? value : life;
		return my;
	};
	my.decay = function(value) {
		if (!arguments.length) life--;
		else life -= isFinite(value) ? value : 1;
		return my;
	};
	my.isAlive = function() {
		return life > 0 ? true : false;
	};

	my.applyForce = function(xf, yf) {
		var force;
		if (arguments.length === 1 && arguments[0] instanceof Vec2) {
			force = arguments[0];
		}
		else if (arguments.length === 2) {
			var x = isFinite(xf) ? xf : 0;
			var y = isFinite(yf) ? yf : 0;
			force = new Vec2(x,y);
		}
		else {
			force = Vec2.zero();
		}

		acceleration.add(force);
		velocity.add(acceleration);
		position.add(velocity);
		acceleration = Vec2.zero();

		return my;
	};

	my.custom = function(key, value) {
		if (key !== undefined) {
			if (value === undefined) {
				return customizations[key];
			}
			else {
				if (customizations[key] === undefined) {
					customizations[key] = value;
				}
			}
		}
		return my;
	};

	return my;
}

function Emitter() {
	var particles = [];
	var maxParticles = 100;
	var particleLife = 100;

	var position = Vec2.zero();
	var velocity = Vec2.zero();
	var acceleration = Vec2.zero();

	var emissionDirection = Vec2.north();
	var sprayAngle = 2*Math.PI;

	var totalParticleCount = 0;


	function emitParticles() {
		if (particles.length < maxParticles) {
			var p = Particle();
			// always remember to send the position's clone since it's really passing a reference to the position object
			p.pos(position.clone()) 
			 .vel(Vec2.randSpray(emissionDirection, sprayAngle))
			 .life(particleLife)
			 .custom("id", totalParticleCount % maxParticles)
			particles.push(p);
			totalParticleCount++;
		}
	}

	function removeDeadParticles() {
		for (var i=particles.length-1; i>=0; i--) {
			if (!particles[i].isAlive()) particles.splice(i,1);
		}
	}

	function my() {}

	my.update = function(f) {
		emitParticles();
		removeDeadParticles();
		if (typeof f === "function") {
			f(particles);	
		}
		else {
			particles.forEach(function(p,i){
				p.applyForce(Vec2.zero());
				p.decay();
			});	
		}
	};
	my.draw = function(f) {
		f(particles);
	};
	my.emissionDirection = function(x,y) {
		if (arguments.length === 1 && arguments[0] instanceof Vec2) emissionDirection = arguments[0];
		else if (arguments.length === 1 && isFinite(arguments[0])) emissionDirection = Vec2.normWithAngle(arguments[0]);
		else if (arguments.length === 2 && isFinite(x) && isFinite(y)) emissionDirection = new Vec2(x,y);
		else if (!arguments.length) return emissionDirection;
		return my;
	};
	my.pos = function(value) {
		if (!arguments.length) return position;
		position = value instanceof Vec2 ? value : position;
		return my;
	};
	my.vel = function(value) {
		if (!arguments.length) return velocity;
		velocity = value instanceof Vec2 ? value : velocity;
		return my;
	};
	my.maxParticles = function(value) {
		if (!arguments.length) return maxParticles;
		maxParticles = isFinite(value) && value >= 0 ? value : maxParticles;
		return my;
	};
	my.particleLife = function(value) {
		if (!arguments.length) return particleLife;
		particleLife = isFinite(value) ? value : particleLife;
		return my;
	};

	return my;
}