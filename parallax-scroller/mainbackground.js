
function MainBackground(){


	this.stage = new PIXI.Container();

	var w = document.getElementById("gamecanvas").width;
	var h = document.getElementById("gamecanvas").height;
	this.renderer = PIXI.autoDetectRenderer(w, h, {view:document.getElementById("gamecanvas")});

	this.scroller = new Scroller(this.stage, "resources/bg-far.png", "resources/bg-mid.png");

	requestAnimationFrame(this.update.bind(this));
}


MainBackground.prototype.update = function(){

	this.scroller.scrollViewportBy(5);

	this.renderer.render(this.stage);

	requestAnimationFrame(this.update.bind(this));

}

