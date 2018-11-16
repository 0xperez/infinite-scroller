
var stage, far, mid;


function loadAssets(){
	var loader = new PIXI.loaders.Loader();
	loader.add("farBackground", "resources/bg-far.png")
		  .add("midBackground", "resources/bg-mid.png");

	loader.load((loader, resources) => {
		console.log("Loading completed.");
		init();
	});


}

function init(){
	console.log("Set up completed.");
	stage = new PIXI.Container();
	var width = document.getElementById("gamecanvas").width;
	var height = document.getElementById("gamecanvas").height;
	renderer = PIXI.autoDetectRenderer(
    width,
    height,
    {view:document.getElementById("gamecanvas")}
  );

	var farTex = PIXI.Texture.fromImage("resources/bg-far.png");
	console.log("Far texture size: " +  farTex.width + " x " + farTex.height);
	far = new PIXI.extras.TilingSprite(farTex, farTex.baseTexture.width, farTex.baseTexture.height);
  	far.position.x = 0;
  	far.position.y = 0;
  	far.tilePosition.x = 0;
  	far.tilePosition.y = 0;
  	stage.addChild(far);

  	var midTex = PIXI.Texture.fromImage("resources/bg-mid.png");
	console.log("Mid texture size: " +  midTex.baseTexture.width + " x " + midTex.baseTexture.height);
  	mid = new PIXI.extras.TilingSprite(midTex, midTex.baseTexture.width, midTex.baseTexture.height);
  	mid.position.x = 0;
  	mid.position.y = 128;
  	stage.addChild(mid);

	console.log("Rendering completed.");

	requestAnimationFrame(update);
}


function update(){
	far.tilePosition.x -= 0.128;
	mid.tilePosition.x -= 0.64;

	renderer.render(stage);

	requestAnimationFrame(update);

}