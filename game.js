(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function(ctx) {
		this.ctx = ctx;
		this.asteroids = [];
		this.addAsteroids(6);
		this.ship = new Asteroids.Ship(
			[Game.DIM_X / 2, Game.DIM_Y / 2],
			[0,0],
			null,
			null
		);
	};

	Game.DIM_X = 300;
	Game.DIM_Y = 300;

	Game.prototype.addAsteroids = function(numAsteroids) {
		for (var i = 0; i < numAsteroids; i++) {
			this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
		}
	};

	Game.prototype.bindKeyHandlers = function() {
		var that = this;
		key('space', function(){ that.stop() });
		key('up', function() { that.ship.power([0, -0.01]) });
		key('down', function() { that.ship.power([0, 0.01]) });
		key('left', function() { that.ship.power([-0.01,0]) });
		key('right', function() { that.ship.power([0.01,0]) });
	};

	Game.prototype.checkCollisions = function() {
		for (var i = 0; i < this.asteroids.length; i++){
			if (this.asteroids[i].isCollidedWith(this.ship)) {
				this.stop();
				window.alert("You've been hit!");
			}
		}
	};


	Game.prototype.draw = function() {
		this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
		this.ship.draw(this.ctx);
		for(var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].draw(this.ctx);
		}
	};

	Game.prototype.move = function() {
		this.ship.move();
		this.ship.vel[0] -= this.ship.vel[0]/10;
		this.ship.vel[1] -= this.ship.vel[1]/10;
		var newAsteroids = [];
		for(var i = 0; i < this.asteroids.length; i++){
			this.asteroids[i].move();
			if (this.asteroids[i].pos[0] < Game.DIM_X &&
				this.asteroids[i].pos[1] < Game.DIM_Y &&
				this.asteroids[i].pos[0] > 0 && this.asteroids[i].pos[1] > 0){
					newAsteroids.push(this.asteroids[i]);
			}
		}
		this.asteroids = newAsteroids;
	};

	Game.prototype.start = function(){
		var that = this;
		interval = setInterval(function() { that.step() }, 30);
	};

	Game.prototype.step = function() {
		this.bindKeyHandlers();
		this.move();
		this.checkCollisions();
		this.draw();
	};

	Game.prototype.stop = function() {
		clearInterval(interval);
	};

})(this);