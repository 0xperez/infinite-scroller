
function RandomBuilder(mapbuilder){
	this.builder = mapbuilder;
	this.engine = new RandomEngine(this.builder);
	this.createSpans();
}


RandomBuilder.prototype.linearWallSpan = function(){
	var h = this.engine.getRandomInt(0, MapBuilder.WALL_HEIGHTS.length);
	var span = this.engine.getRandomInt(1, 11);
	this.builder.createWallSpan(h, span, true, true);
	console.log("Created wall span with length " + span + " and heigth " + h);
	this.engine.trigger(0.8, this.builder.createGap, [1]);
}


RandomBuilder.prototype.createSpans = function(){
	var i = 0;
	while(i < 10){
		this.linearWallSpan();
		i++;
	}
}