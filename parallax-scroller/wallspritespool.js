


function WallSpritesPool(){

	this.createWindowSprites(8);
	console.log("Windowed wall sprites pool created.");
	this.createDecorationSprites(8);
	console.log("Wall decorations sprites pool created");
	this.createFrontEdgesSprites(2);
	this.createBackEdgesSprites(2);
	console.log("Wall edges sprites pool created");
	this.createStepSprites(2);
	console.log("Steps created");

}

/******************************************************************
* Window related stuff
*******************************************************************/

/**
* Initalizes a given number of window sprites. Note that, given the parameter number,
* this metod creates number windows of each of the available types, for a total of
* number*2 sprites pooled in a random order.
*
*/
WallSpritesPool.prototype.createWindowSprites = function(number){
	var windows = [];
	for(var i = 0; i < number; i++){
		var sprite1 = PIXI.Sprite.fromFrame("window_01");
		windows.push(sprite1);
		var sprite2 = PIXI.Sprite.fromFrame("window_02");
		windows.push(sprite2);
	}
	shuffle(windows);
	this.windowSprites = windows;
}

/*****************************************************************
* Gives out a window object from the pool.
*/
WallSpritesPool.prototype.borrowWindow = function(){
	//add a check to see if pool runs dry. If so, increase pool by 1
	//and return
	if(this.windowSprites.length === 0){
		console.log("Window pool dry!");
		var sprite1 = PIXI.Sprite.fromFrame("window_01");
		this.windowSprites.push(sprite1);
		var sprite2 = PIXI.Sprite.fromFrame("window_02");
		this.windowSprites.push(sprite2);
	}
	return this.windowSprites.shift();
}


/*******************************************************************
* Called when a window sprite is put back into the pool.
*
*/
WallSpritesPool.prototype.returnWindow = function(sprite){
	this.windowSprites.push(sprite);
}
/******************************************************************
* End of windows related stuff.
*******************************************************************/

/******************************************************************
* Decorations related stuff
*******************************************************************/
WallSpritesPool.prototype.createDecorationSprites = function(number){
	var decorations = [];
	for(var i = 0; i < number; i++){
		var sprite1 = PIXI.Sprite.fromFrame("decoration_01");
		decorations.push(sprite1);
		var sprite2 = PIXI.Sprite.fromFrame("decoration_02");
		decorations.push(sprite2);
		var sprite3 = PIXI.Sprite.fromFrame("decoration_03");
		decorations.push(sprite3);
	}
	shuffle(decorations);
	this.decorationSprites = decorations;
}


WallSpritesPool.prototype.borrowDecoration = function(){
	//add a check to see if pool runs dry. If so, increase pool by 1
	//and return
	if(this.decorationSprites.length === 0){
		console.log("Decorations pool dry!");
		var sprite1 = PIXI.Sprite.fromFrame("decoration_01");
		this.decorationSprites.push(sprite1);
		var sprite2 = PIXI.Sprite.fromFrame("decoration_02");
		this.decorationSprites.push(sprite2);
		var sprite3 = PIXI.Sprite.fromFrame("decoration_03");
		this.decorationSprites.push(sprite3);
	}
	return this.decorationSprites.shift();
}


WallSpritesPool.prototype.returnDecoration = function(sprite){
	this.decorationSprites.push(sprite);
}
/******************************************************************
* End of decorations related stuff.
*******************************************************************/


/******************************************************************
* Wall edges related stuff
*******************************************************************/
WallSpritesPool.prototype.createFrontEdgesSprites = function(number){
	var edges = [];
	for(var i = 0; i < number; i++){
		var sprite1 = PIXI.Sprite.fromFrame("edge_01");
		edges.push(sprite1);
		var sprite2 = PIXI.Sprite.fromFrame("edge_02");
		edges.push(sprite2);
	}
	shuffle(edges);
	this.frontEdgeSprites = edges;
}

WallSpritesPool.prototype.createBackEdgesSprites = function(number){
	var edges = [];
	for(var i = 0; i < number; i++){
		var sprite1 = PIXI.Sprite.fromFrame("edge_01");
		sprite1.anchor.x = 1;
		sprite1.scale.x = -1;
		edges.push(sprite1);
		var sprite2 = PIXI.Sprite.fromFrame("edge_02");
		sprite2.anchor.x = 1;
		sprite2.scale.x = -1;
		edges.push(sprite2);
	}
	shuffle(edges);
	this.backEdgeSprites = edges;
}



WallSpritesPool.prototype.borrowFrontEdge = function(){
	//add a check to see if pool runs dry. If so, increase pool by 1
	//and return
	if(this.frontEdgeSprites.length === 0){
		console.log("Front edge pool dry!");
		var sprite1 = PIXI.Sprite.fromFrame("edge_01");
		this.frontEdgeSprites.push(sprite1);
		var sprite2 = PIXI.Sprite.fromFrame("edge_02");
		this.frontEdgeSprites.push(sprite2);
	}
	return this.frontEdgeSprites.shift();
}


WallSpritesPool.prototype.returnFrontEdge = function(sprite){
	this.frontEdgeSprites.push(sprite);
}


WallSpritesPool.prototype.borrowBackEdge = function(){
	//add a check to see if pool runs dry. If so, increase pool by 1
	//and return
	if(this.backEdgeSprites.length === 0){
		console.log("Back edge pool dry!");
		var sprite1 = PIXI.Sprite.fromFrame("edge_01");
		sprite1.anchor.x = 1;
		sprite1.scale.x = -1;
		this.backEdgeSprites.push(sprite1);
		var sprite2 = PIXI.Sprite.fromFrame("edge_02");
		sprite2.anchor.x = 1;
		sprite2.scale.x = -1;
		this.backEdgeSprites.push(sprite2);	
	}
	return this.backEdgeSprites.shift();
}


WallSpritesPool.prototype.returnBackEdge = function(sprite){
	this.backEdgeSprites.push(sprite);
}
/******************************************************************
* End of edges related stuff.
*******************************************************************/

/*******************************************************************
* Steps related stuff
********************************************************************/
WallSpritesPool.prototype.createStepSprites = function(number){
	var steps = [];
	for(var i = 0; i < number; i++){
		var sprite1 = PIXI.Sprite.fromFrame("step_01");
		sprite1.anchor = 0.25;
		steps.push(sprite1);
	}
	this.stepSprites = steps;
}


WallSpritesPool.prototype.borrowStep = function(){
	//add a check to see if pool runs dry. If so, increase pool by 1
	//and return
	if(this.stepSprites.length === 0){
		console.log("Steps pool dry!");
		var sprite1 = PIXI.Sprite.fromFrame("step_01");
		sprite1.anchor = 0.25;
		this.stepSprites.push(sprite1);
	}
	return this.stepSprites.shift();
}

WallSpritesPool.prototype.returnStep = function(sprite){
	this.stepSprites.push(sprite);
}






//In-place shuffles a given array.
function shuffle(array) {
  var i = array.length;
  var j = 0;
  var temp = null;

  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}