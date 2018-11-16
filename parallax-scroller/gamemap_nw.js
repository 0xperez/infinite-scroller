GameMap.VIEWPORT_WIDTH = document.getElementById("gamecanvas").width;
GameMap.VIEWPORT_NUM_SLICES = Math.ceil(GameMap.VIEWPORT_WIDTH/WallSlice.WIDTH);
/*
GameMap.prototype.initLookupTables = function() {
//class SliceType is used as index for such array (goes to 0 to 6)
  this.borrowWallSpriteLookup = [];
  this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
  this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
  this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
  this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
  this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;

  this.returnWallSpriteLookup = [];
  this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
  this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
  this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
  this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
  this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;
};
*/

GameMap.prototype.initBorrowLookupTable = function(){
    var borrowTable = [];
    /*
    borrowTable[SliceType.FRONT] = this.pool.borrowFrontEdge;
    borrowTable[SliceType.BACK] = this.pool.borrowBackEdge;
    borrowTable[SliceType.STEP] = this.pool.borrowStep;
    borrowTable[SliceType.DECORATION] = this.pool.borrowDecoration;
    borrowTable[SliceType.WINDOW] = this.pool.borrowWindow;
*/
    return borrowTable;
}

GameMap.prototype.initReturnLookupTable = function() {

  var returnTable = [];

  returnTable[SliceType.FRONT] = this.pool.returnFrontEdge;
  returnTable[SliceType.BACK] = this.pool.returnBackEdge;
  returnTable[SliceType.STEP] = this.pool.returnStep;
  returnTable[SliceType.DECORATION] = this.pool.returnDecoration;
  returnTable[SliceType.WINDOW] = this.pool.returnWindow;

  return returnTable;
};


GameMap.prototype.addSlice = function(sliceType, yPos) {
  var slice = new WallSlice(sliceType, yPos);
  this.slices.push(slice);
};

/*
GameMap.prototype.setViewPortX = function(viewportX){
  this.viewportX = this.checkViewportXBounds(viewportX);
}

GameMap.prototype.checkViewportXBounds = function(viewportX){
  var maxX = (this.slices.length - this.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH;
  if(viewportX < 0){
    viewportX = 0;
  }
  else if(viewportX > maxX){
    viewportX = maxX;
  }

  return viewportX;
}
*/

GameMap.prototype.createTestWallSpan = function() {
  this.addSlice(SliceType.FRONT, 192);
  this.addSlice(SliceType.WINDOW, 192);
  this.addSlice(SliceType.DECORATION, 192);
  this.addSlice(SliceType.WINDOW, 192);
  this.addSlice(SliceType.DECORATION, 192);
  this.addSlice(SliceType.WINDOW, 192);
  this.addSlice(SliceType.DECORATION, 192);
  this.addSlice(SliceType.WINDOW, 192);
  this.addSlice(SliceType.BACK, 192);
};
GameMap.prototype.createTestSteppedWallSpan = function() {
  this.addSlice(SliceType.FRONT, 192);
  this.addSlice(SliceType.WINDOW, 192);
  this.addSlice(SliceType.DECORATION, 192);
  this.addSlice(SliceType.STEP, 256);
  this.addSlice(SliceType.WINDOW, 256);
  this.addSlice(SliceType.BACK, 256);
};
GameMap.prototype.createTestGap = function() {
  this.addSlice(SliceType.GAP);
};
GameMap.prototype.createTestMap = function() {
  for (var i = 0; i < 10; i++)
  {
    this.createTestWallSpan();
    this.createTestGap();
    this.createTestSteppedWallSpan();
    this.createTestGap();
  }
};




//.call(this.pool) is like this.pool.chosenFunction()
GameMap.prototype.borrowWallSprite = function(sliceType) {
  return this.borrowWallSpriteLookup[sliceType].call(this.pool);
};

GameMap.prototype.returnWallSprite = function(sliceType, sliceSprite) {
  return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
};


//Subclass of PIXI Container

GameMap.prototype = Object.create(PIXI.Container.prototype);
function GameMap(){

  PIXI.Container.call(this);

  this.pool = new WallSpritesPool();
  //this.initLookupTables();
  this.borrowWallSpriteLookup = GameMap.initBorrowLookupTable();
  this.returnWallSpriteLookup = initReturnLookupTable();

  this.slices = []
  this.createTestMap();

  this.viewportX = 0;
  //multiplicator for slice array index
  this.viewportSliceX = 0;

}Object.defineProperty(GameMap.prototype, 'constructor', {
  value: GameMap,
  enumerable: false,
  writable: true});

GameMap.prototype.test = function(){
  console.log("This is a function");
}