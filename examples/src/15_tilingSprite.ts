// Tiling sprites

/// <reference path="../../ga.plugins.d.ts" />  

(function () {
/*
Use the `emitter` function to create a constant stream of particles
at fixed intervals. The emitter is a simple timer that calls the 
`particleEffect` function repeatedly at intervals in milliseconds that
you define. Use the emitter's `play` and `stop` methods to start and 
stop the particle stream.
*/

//Create a new GA instance, and start it.
//Pre-load images in the array.
let g = ga(256, 256, setup, 
  [
    "assets/images/tile.png", 
    "assets/images/animals.json"
  ]
);
g.start();

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states
var box:GA.TilingSprite;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  box = g.tilingSprite(128, 128, "assets/images/tile.png");

  //It also works with texture atlas frames
  //box = g.tilingSprite(128, 128, "cat.png");

  g.stage.putCenter(box);
  
  //Set the game state to `play`
  g.state = play;    
}

//The `play` function will run in a loop
function play() {
  
  //Scroll the sprite's tile pattern using the 
  //`tileX` and `tileY` properties
  box.tileX += 1;
  box.tileY += 1;

  //box.rotation += 0.01;
}


})();

