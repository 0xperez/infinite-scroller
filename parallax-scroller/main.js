/**
* Main prototype constructor.
*/
function Main(){
	this.loadAssets();
}


/**
* Loads the primary resources of the application. It is called immediately
* as a new Main object is created.
*/
Main.prototype.loadAssets = function(){
	var loader = new PIXI.loaders.Loader();
	loader.add("farBackground", "resources/bg-far.png")
		  .add("midBackground", "resources/bg-mid.png");
	loader.add("wall", "resources/wall.json");
	loader.load((loader, resources) => {
		console.log("Assets loaded.");
		this.init();
	});
}


/**
* Initializes main application entities, such as the background.
*/
Main.prototype.init = function(){

	this.background = new MainBackground();
	console.log("Background rendered.");

	//this.map = new GameMap();
}



/**
* Application entry point from HTML document.
*/
function start(){
	main = new Main();
}

