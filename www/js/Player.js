function Player() {
	Sprite.call(this);

	this.accel.x = 3;
	this.accel.y = 3;

	this.velocity.maxX = 12;
	this.velocity.maxY = 12;

	this.allowOffScreen = false;

}
// setting up the inheritance
Player.prototype = Object.create(Sprite.prototype);

Player.prototype.load = function(stage, x, y) {
	this.sprite = new createjs.Shape();
	this.sprite.graphics.beginFill("blue").drawRect(0, 0, 50, 50);

	this.sprite.width = 50;
	this.sprite.height = 50;

	this.sprite.x = x;
	this.sprite.y = y;

	stage.addChild(this.sprite);
}

Player.prototype.updateVelocity = function(input, tilt) {
	//alert(typeof(navigator.accelerometer));

	if(typeof(navigator.accelerometer) == 'undefined') {
		this.friction = 1;
		//left
		if(input[37] != undefined) {
			this.velocity.x -= this.accel.x;
		}

		//right
		if(input[39] != undefined) {
			this.velocity.x += this.accel.x;
		}

		//up
		if(input[38] != undefined) {
			this.velocity.y -= this.accel.y;
		}

		//down
		if(input[40] != undefined) {
			this.velocity.y += this.accel.y;
		}
	}else{
		if(typeof(tilt.horizontal) != 'undefined') {
			this.velocity.x = tilt.horizontal * 2;
		}
		if(typeof(tilt.vertical) != 'undefined') {
			this.velocity.y = tilt.vertical * 2;
		}
	}
}

Player.prototype.shoot = function(stage, input) {
	if(input[32] != undefined) {
		if(game.frameDelayCount.shoot == 0) {
			game.frameDelayCount.shoot = 20;

			var i = game.bullets.length;

			game.bullets[i] = new Bullet();
			game.bullets[i].load(game.stage, this.sprite.x + 20, this.sprite.y);

			stage.addChild(game.bullets[i].sprite);
		}
	}
};

Player.prototype.update = function() {
	this.yVelocity += gravity;
	this.sprite.y += this.yVelocity;
	
	if(this.yVelocity > 0) {
		player.sprite.gotoAndPlay('fall');
	}

	if(this.sprite.y > 430) {
		this.sprite.y = 430;
	}
};
