(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	Function.prototype.inherits = function(superFn) {
		function Surrogate() {};
		Surrogate.prototype = superFn.prototype;
		this.prototype = new Surrogate();
	};

	var Ship = Asteroids.Ship = function(pos, vel, radius, color) {
		Asteroids.MovingObject.apply(this, arguments);
		this.radius = Ship.RADIUS;
		this.color = Ship.COLOR;
	};

	Ship.COLOR = 'blue';
	Ship.RADIUS = 5;

	Ship.inherits(Asteroids.MovingObject);

	Ship.prototype.power = function(impulse){
		this.vel[0] += impulse[0];
		this.vel[1] += impulse[1];
	};


})(this);