
function WallSlice(type, yPos){
	this.type = type;
	this.y = yPos;
	this.sprite = null;
}
Object.defineProperty(WallSlice.prototype, 'WIDTH', {
  value: 64,
  enumerable: false,
  writable: true});


WallSlice.WIDTH = 64;
WallSlice.FRONT = 0;
WallSlice.BACK = 1;
WallSlice.STEP = 2;
WallSlice.DECORATION = 3;
WallSlice.WINDOW = 4;
WallSlice.GAP = 5;

/**
* Specifies wether the wall slice has to be drawn. Must be drawn if its sprite is null and it is not a gap.
*/
WallSlice.prototype.toBeRendered = function(){
	return this.sprite == null && this.type != WallSlice.GAP;
}


WallSlice.prototype.setSpritePos = function(newX, newY){
	if(this.sprite != null){
		this.sprite.x = newX;
		this.sprite.y = newY;
	}
}

