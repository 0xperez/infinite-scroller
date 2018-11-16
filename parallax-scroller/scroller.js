

function Scroller(stage, imagePath1, imagePath2){
	this.far = new ScrollingBackground(imagePath1, 0.128);
	stage.addChild(this.far);

	this.mid = new ScrollingBackground(imagePath2, 0.64);
	stage.addChild(this.mid);
	this.deltaOverlap(128);

	this.front = new GameMap();
	stage.addChild(this.front);

	this.mapBuilder = new MapBuilder(this.front);

	this.builder = new RandomBuilder(this.mapBuilder);

	this.viewportX = 0;
}

Scroller.prototype.update = function(){
	this.far.scroll();
	this.mid.scroll();
}

Scroller.prototype.setViewportX = function(viewport){
	this.viewportX = viewport;
	this.far.scrollBy(viewport);
	this.mid.scrollBy(viewport);
	this.front.setViewportX(viewport);
}

Scroller.prototype.getViewportX = function(){
	return this.viewportX;
}


Scroller.prototype.scrollViewportBy = function(speed){
	var newView = this.viewportX + speed;
	this.setViewportX(newView);
}







Scroller.prototype.deltaOverlap = function(difference){
	this.mid.y = this.far.y + difference;
}

Scroller.prototype.backScrollSpeed = function(dx){
	this.far.displacement = displacement;
}
Scroller.prototype.frontScrollSpeed = function(dx){
	this.mid.displacement = displacement;
}