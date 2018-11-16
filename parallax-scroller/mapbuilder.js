function MapBuilder(map) {
   this.map = map;
   //this.createMap2();
}

MapBuilder.WALL_HEIGHTS = [
  256, // Lowest slice
  224,
  192,
  160,
  128  // Highest slice
];


MapBuilder.prototype.randomMap = function(){
  var rand = new RandomEngine(this);
  //we need constraints. 
}


MapBuilder.prototype.createMap = function(){
	  this.createWallSpan(3, 9, true);
  	this.createGap(1);
  	this.createWallSpan(1, 30);
  	this.createGap(1);
  	this.createWallSpan(2, 18, true, true);
  	this.createGap(1);
  	this.createSteppedWallSpan(2, 5, 28);
 	  this.createGap(1);
  	this.createWallSpan(1, 10);
  	this.createGap(1);
  	this.createWallSpan(2, 6); 
  	this.createGap(1);
  	this.createWallSpan(1, 8);
  	this.createGap(1);
  	this.createWallSpan(2, 6);
  	this.createGap(1);
  	this.createWallSpan(1, 8);
  	this.createGap(1)
  	this.createWallSpan(2, 7);
  	this.createGap(1);
  	this.createWallSpan(1, 16);
  	this.createGap(1);
  	this.createWallSpan(2, 6);
  	this.createGap(1);
  	this.createWallSpan(1, 22);
  	this.createGap(2);
  	this.createWallSpan(2, 14);
  	this.createGap(2);
  	this.createWallSpan(3, 8);
  	this.createGap(2);
  	this.createSteppedWallSpan(3, 5, 12);
  	this.createGap(3);
  	this.createWallSpan(0, 8);
  	this.createGap(3);
  	this.createWallSpan(1, 50);
  	this.createGap(20);
};


MapBuilder.prototype.createMap2 = function(){
    this.createWallSpan(3, 4, true);
    this.createGap(2);
    this.createWallSpan(1, 6);
    this.createGap(1);
    this.createSteppedWallSpan(2, 5, 7);
    this.createGap(5);
    this.createWallSpan(1, 10, true, true);
    this.createGap(4);
    this.createWallSpan(2, 5, true, true);
    this.createWallSpan(0, 12);
}





MapBuilder.prototype.createGap = function(spanLength) {
  for (var i = 0; i < spanLength; i++)
  {
    this.map.addSlice(WallSlice.GAP);
  }
};


MapBuilder.prototype.createWallSpan = function( heightIndex, spanLength, front, back) {
	//true if undefined
	front = front || true;
	back = back || true;

	if (front == true && spanLength > 0){
    	this.addWallFront(heightIndex);
    	spanLength--;
  	}

  	var midSpanLength = spanLength - (back ? 1 : 0);

  	if (midSpanLength > 0){
    	this.addWallMid(heightIndex, midSpanLength)
    	spanLength -= midSpanLength;
  	}

	if (back == true && spanLength > 0){
    	this.addWallBack(heightIndex);
	}
};


MapBuilder.prototype.createSteppedWallSpan = function(heightIndex, spanALength, spanBLength){
  if (heightIndex < 2){
    heightIndex = 2;
  }

  this.createWallSpan(heightIndex, spanALength, false, true);
  this.addWallStep(heightIndex - 2);
  this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false);
};



/////////////// SUPPORT METHODS TO CREATE WALL SPANS//////////////

MapBuilder.prototype.addWallFront = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.map.addSlice(WallSlice.FRONT, y);
};


MapBuilder.prototype.addWallBack = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.map.addSlice(WallSlice.BACK, y);
};


MapBuilder.prototype.addWallMid = function(heightIndex, spanLength) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  for (var i = 0; i < spanLength; i++)
  {
    if (i % 2 == 0) //even iteration
    {
      this.map.addSlice(WallSlice.WINDOW, y);
    }
    else
    {
      this.map.addSlice(WallSlice.DECORATION, y);
    }
  }
};

MapBuilder.prototype.addWallStep = function(heightIndex) {
  var y = MapBuilder.WALL_HEIGHTS[heightIndex];
  this.map.addSlice(WallSlice.STEP, y);
};