var type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

// PIXI.utils.sayHello(type)
var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});  
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('assets/ship-1.png');  
var bulletTex = PIXI.Texture.fromImage('assets/beam-1x.png');

// create a new Sprite using the texture
var spaceship = new PIXI.Sprite(texture);

// center the sprite's anchor point
spaceship.anchor.x = 0.5;  
spaceship.anchor.y = 0.5;

// move the sprite to the center of the screen
spaceship.position.x = 200;  
spaceship.position.y = 150;

var background = new PIXI.Graphics();  
background.beginFill(0x123456);  
background.drawRect(0,0,800,600);  
background.endFill();

stage.addChild(background);
stage.addChild(spaceship);

stage.interactive = true;

stage.on("mousedown", function(e){  
shoot(spaceship.rotation, {
	x: spaceship.position.x+Math.cos(spaceship.rotation)*20,
	y: spaceship.position.y+Math.sin(spaceship.rotation)*20
	});
})

var bullets = [];  
var bulletSpeed = 5;

function shoot(rotation, startPosition){  
var bullet = new PIXI.Sprite(bulletTex);
	bullet.position.x = startPosition.x;
	bullet.position.y = startPosition.y;
	bullet.rotation = rotation;
	stage.addChild(bullet);
	bullets.push(bullet);
}

function rotateToPoint(mx, my, px, py){  
	var self = this;
	var dist_Y = my - py;
	var dist_X = mx - px;
	var angle = Math.atan2(dist_Y,dist_X);
	//var degrees = angle * 180/ Math.PI;
	return angle;
}

// start animating
animate();  
function animate() {  
	requestAnimationFrame(animate);

	// just for fun, let's rotate mr rabbit a little
	spaceship.rotation = rotateToPoint(renderer.plugins.interaction.mouse.global.x, renderer.plugins.interaction.mouse.global.y, spaceship.position.x, spaceship.position.y);

	for(var b=bullets.length-1;b>=0;b--){
		bullets[b].position.x += Math.cos(bullets[b].rotation)*bulletSpeed;
		bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
	}

	// render the container
	renderer.render(stage);
}