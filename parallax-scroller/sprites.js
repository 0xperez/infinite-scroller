/**
Constructor for a sprite which will be used as background. Given an image, constructs an instance of
TilingSprite prototype. Note that the image must be already have been loaded (via any kind of loader)
for this constructor to work as intended.
It is possible to stack more backgrounds one onto the others by adding them into the desired order and
adjusting the y-position.
*/
function Background(imagePath){
	console.log("Background constructor called with path " + imagePath);
	var texture = PIXI.Texture.fromImage(imagePath);
	var w = texture.baseTexture.width;
	var h = texture.baseTexture.height;
	console.log("Dimensions: " + w + "x" + h);
	PIXI.extras.TilingSprite.call(this, texture, w, h);

	this.position.x = 0;
	this.position.y = 0;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;
}

Background.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
Object.defineProperty(Background.prototype, 'constructor', {
	value: Background,
	enumerable: false,
	writable: true});




/**
* Extension of a background which scrolls at a given rate (parallax scroller).
*/
function ScrollingBackground(imagePath, dx){

	Background.call(this, imagePath);

	this.viewportX = 0;

	this.dx = dx;
}

ScrollingBackground.prototype = Object.create(Background.prototype);
Object.defineProperty(ScrollingBackground.prototype, 'constructor', {
	value: ScrollingBackground,
	enumerable: false,
	writable: true});

/**
* Continuously scrolls the background by the given dx pixel rate.
* @Deprecated - use scrollBy instead.
*/
ScrollingBackground.prototype.scroll = function() {
	this.tilePosition.x -= this.dx;
}

ScrollingBackground.prototype.scrollBy = function(newViewport){
	var distance = newViewport - this.viewportX;
	this.viewportX = newViewport;
	this.tilePosition.x -= (distance * this.dx);
}