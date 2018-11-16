
GameMap.prototype = Object.create(PIXI.Container.prototype);
function GameMap(){

  PIXI.Container.call(this);

  this.pool = new WallSpritesPool();

  this.initLookupTables();

  this.slices = [];

  this.viewportX = 0;

  this.viewportSliceX = 0;

}
Object.defineProperty(GameMap.prototype, 'constructor', {
  value: GameMap,
  enumerable: false,
  writable: true});
Object.defineProperty(GameMap.prototype, 'WALLSLICE_WIDTH', {
  value: 64,
  enumerable: false,
  writable: false});
Object.defineProperty(GameMap.prototype, 'VIEWPORT_WIDTH', {
  value: 512,
  enumerable: false,
  writable: false});
Object.defineProperty(GameMap.prototype, 'VIEWPORT_NUM_SLICES', {
  value: Math.ceil(512/ 64) + 1, //64 is WallSlice.WIDTH, that for some fancy reason is not found when referred. Bah
  enumerable: false,
  writable: true});



GameMap.prototype.setViewportX = function(viewportX){
  this.viewportX = this.checkViewportXBounds(viewportX);

  var prevViewportSliceX = this.viewportSliceX;

  this.viewportSliceX = Math.floor(this.viewportX / WallSlice.WIDTH);

  this.removeUnusedSlices(prevViewportSliceX);

  this.addNewSlices();
}


GameMap.prototype.checkViewportXBounds = function(viewportX){
  var maxX = (this.slices.length - this.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH;
  //console.log("Max X is " + maxX);
  if(viewportX < 0){
    viewportX = 0;
  }
  else if(viewportX > maxX){
    viewportX = maxX;
  }

  return viewportX;
}


GameMap.prototype.addSlice = function(sliceType, yPos) {
  var slice = new WallSlice(sliceType, yPos);
  this.slices.push(slice);
};

GameMap.prototype.addNewSlices = function(){
  var firstXPos = - (this.viewportX % WallSlice.WIDTH);

    for(var i = this.viewportSliceX, sliceIndex = 0;
           i < this.viewportSliceX + this.VIEWPORT_NUM_SLICES;
           i++, sliceIndex++){
      var currentSlice = this.slices[i];
      if(currentSlice.toBeRendered()){

        currentSlice.sprite = this.borrowWallSprite(currentSlice.type);
        let spriteX = firstXPos + (sliceIndex * WallSlice.WIDTH);
        currentSlice.setSpritePos(spriteX, currentSlice.y);

        this.addChild(currentSlice.sprite);
      }
      else if(currentSlice.sprite != null){
        let spriteX = firstXPos + (sliceIndex * WallSlice.WIDTH);
        currentSlice.setSpritePos(spriteX, currentSlice.y);
      }

  }
}



GameMap.prototype.removeUnusedSlices = function(prevViewportSliceX){
  var numUnusedSlices = this.viewportSliceX - prevViewportSliceX;
  if(numUnusedSlices > this.VIEWPORT_NUM_SLICES){
    numUnusedSlices = this.VIEWPORT_NUM_SLICES;
  }
  for (var i = prevViewportSliceX; i < prevViewportSliceX + numUnusedSlices; i++){
    var currentSlice = this.slices[i];
    if(currentSlice.sprite != null){
      this.returnWallSprite(currentSlice.type, currentSlice.sprite);
      this.removeChild(currentSlice.sprite);
      currentSlice.sprite = null;
    }
  }
}


//.call(this.pool) is like this.pool.chosenFunction()
GameMap.prototype.borrowWallSprite = function(sliceType) {
  return this.borrowWallSpriteLookup[sliceType].call(this.pool);
};

GameMap.prototype.returnWallSprite = function(sliceType, sliceSprite) {
  return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
};



GameMap.prototype.initLookupTables = function() {
//class WallSlice is used as index for such array (goes to 0 to 6)
  this.borrowWallSpriteLookup = [];
  this.borrowWallSpriteLookup[WallSlice.FRONT] = this.pool.borrowFrontEdge;
  this.borrowWallSpriteLookup[WallSlice.BACK] = this.pool.borrowBackEdge;
  this.borrowWallSpriteLookup[WallSlice.STEP] = this.pool.borrowStep;
  this.borrowWallSpriteLookup[WallSlice.DECORATION] = this.pool.borrowDecoration;
  this.borrowWallSpriteLookup[WallSlice.WINDOW] = this.pool.borrowWindow;

  this.returnWallSpriteLookup = [];
  this.returnWallSpriteLookup[WallSlice.FRONT] = this.pool.returnFrontEdge;
  this.returnWallSpriteLookup[WallSlice.BACK] = this.pool.returnBackEdge;
  this.returnWallSpriteLookup[WallSlice.STEP] = this.pool.returnStep;
  this.returnWallSpriteLookup[WallSlice.DECORATION] = this.pool.returnDecoration;
  this.returnWallSpriteLookup[WallSlice.WINDOW] = this.pool.returnWindow;
};