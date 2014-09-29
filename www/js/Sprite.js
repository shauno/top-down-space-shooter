function Sprite() {
	//some sane defaults
	this.friction = 1;

	this.velocity = {};
	this.velocity.x = 0;
	this.velocity.y = 0;

	this.velocity.maxX = 0;
	this.velocity.maxY = 0;

	this.accel = {};
	this.accel.x = 0;
	this.accel.y = 0;

	this.sprite = {};
	this.offScreen = false;
	this.allowOffScreen = true;
}

Sprite.prototype.loadImage = function(path, x, y) {
}

Sprite.prototype.move = function() {
	//horizontal velocity checks
	if(this.velocity.x > this.velocity.maxX) {
		this.velocity.x = this.velocity.maxX;
	}

	if(this.velocity.x < this.velocity.maxX * -1) {
		this.velocity.x = this.velocity.maxX * -1;
	}

	if(this.velocity.x > 0) {
		this.velocity.x -= this.friction;
		if(this.velocity.x < 0) {
			this.velocity.x = 0;
		}
	}

	if(this.velocity.x < 0) {
		this.velocity.x += this.friction;
		if(this.velocity.x > 0) {
			this.velocity.x = 0;
		}
	}

	//vertical velocity checks
	if(this.velocity.y > this.velocity.maxY) {
		this.velocity.y = this.velocity.maxY;
	}

	if(this.velocity.y < this.velocity.maxY * -1) {
		this.velocity.y = this.velocity.maxY * -1;
	}

	if(this.velocity.y > 0) {
		this.velocity.y -= this.friction;
		if(this.velocity.y < 0) {
			this.velocity.y = 0;
		}
	}

	if(this.velocity.y < 0) {
		this.velocity.y += this.friction;
		if(this.velocity.y > 0) {
			this.velocity.y = 0;
		}
	}

	this.sprite.x += this.velocity.x;
	this.sprite.y += this.velocity.y;

	//horizontal bounds check
	if((this.sprite.x + this.sprite.width) > game.windowWidth) {
		this.sprite.x = game.windowWidth - this.sprite.width;
	}

	if(this.sprite.x < 0) {
		this.sprite.x = 0;
	}

	//vertical bounds check
	if((this.sprite.y + this.sprite.width) > game.windowHeight) {
		this.sprite.y = game.windowHeight - this.sprite.height;
	}

	if(this.sprite.y < 0) {
		if(!this.allowOffScreen) {
			this.sprite.y = 0;
		}else if(this.sprite.y + this.sprite.height < 0){
			this.offScreen = true;
		}
	}
};