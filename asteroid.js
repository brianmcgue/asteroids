(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	Function.prototype.inherits = function(superFn) {
		function Surrogate() {};
		Surrogate.prototype = superFn.prototype;
		this.prototype = new Surrogate();
	};


	var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color) {
		Asteroids.MovingObject.apply(this, arguments);
	};

	Asteroid.COLOR = 'black';
	Asteroid.RADIUS = 10;

	Asteroid.inherits(Asteroids.MovingObject);

	Asteroid.randomAsteroid = function(dimX, dimY) {
		var pos = [Math.random() * dimX, Math.random() * dimY];
		var vel = [(Math.random() * 2) - 1, (Math.random() * 2) - 1];
		return new Asteroid (pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
	};
})(this);