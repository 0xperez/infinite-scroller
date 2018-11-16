
//var stage, renderer, scroller;
/*
function loadAssets(){
	var loader = new PIXI.loaders.Loader();
	loader.add("farBackground", "resources/bg-far.png")
		  .add("midBackground", "resources/bg-mid.png");

	loader.load((loader, resources) => {
		console.log("Assets loaded.");
		init();
	});
}	

function init2(){
	main = new MainLoop();
}
*/
/*

function loadAssets(){
	var loader = new PIXI.loaders.Loader();
	loader.add("farBackground", "resources/bg-far.png")
		  .add("midBackground", "resources/bg-mid.png");

	loader.load((loader, resources) => {
		console.log("Assets loaded.");
		init();
	});
}


function init2(){

	stage = new PIXI.Container();
	var w = document.getElementById("gamecanvas").width;
	var h = document.getElementById("gamecanvas").height;
	renderer = PIXI.autoDetectRenderer(w, h, {view:document.getElementById("gamecanvas")});
	
	var imgBack = "resources/bg-far.png";
	var imgMid = "resources/bg-mid.png";

	scroller = new Scroller(stage, "resources/bg-far.png", "resources/bg-mid.png");

	requestAnimationFrame(update);

}


function update2(){

	scroller.scrollViewportBy(0.5);

	renderer.render(stage);

	requestAnimationFrame(update);

}
*/