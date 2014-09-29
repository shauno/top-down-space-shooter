function Bullet() {
	Sprite.call(this);

	this.friction = 0;

	this.velocity = {};
	this.velocity.x = 0;
	this.velocity.y = -12;

	this.velocity.maxX = 0;
	this.velocity.maxY = 12;

	this.accel = {};
	this.accel.x = 0;
	this.accel.y = 0;

	this.sprite = {};
	this.allowOffScreen = true;


}
// setting up the inheritance
Bullet.prototype = Object.create(Sprite.prototype);

Bullet.prototype.load = function(stage, x, y) {
	this.sprite = new createjs.Shape();
	this.sprite.graphics.beginFill("red").drawRect(0, 0, 10, 20);

	this.sprite.width = 50;
	this.sprite.height = 50;

	this.sprite.x = x;
	this.sprite.y = y;

	stage.addChild(this.sprite);
}


Bullet.prototype.load = function(stage, x, y) {
	this.sprite = new createjs.Shape();
	this.sprite.graphics.beginFill("red").drawRect(0, 0, 10, 20);

	this.sprite.width = 10;
	this.sprite.height = 20;

	this.sprite.x = x;
	this.sprite.y = y;

	stage.addChild(this.sprite);
}
