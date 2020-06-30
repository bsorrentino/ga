 

// Drag and drop


// <reference path="../../ga.d.ts" />  

(function () {

//Create a new GA instance, and start it.
//Pre-load images in the array.
var g = ga(
  256, 256, setup, 
  [
    "assets/images/cat.png",
    "assets/images/tiger.png",
    "assets/images/hedgehog.png",
  ]
);
g.start();

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states

var cat:GA.Sprite, hedgehog:GA.Sprite, tiger:GA.Sprite;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  g.backgroundColor = "white";
  g.canvas.style.border = "1px black dashed";

  //Create three sprites from images and set their `draggable` property to `true`
  cat = g.sprite("assets/images/cat.png");
  cat.draggable = true;

  tiger = g.sprite("assets/images/tiger.png");
  tiger.draggable = true;
  tiger.setPosition(64, 64);

  hedgehog = g.sprite("assets/images/hedgehog.png");
  hedgehog.draggable = true;
  hedgehog.setPosition(128, 128);

  //If you ever need to disable drag and drop, set Ga's 
  //`dragAndDrop` property to `false`, like this:
  //g.dragAndDrop = false;
  //`dragAndDrop` is set to `true` automatically whenever set a
  //sprite's `draggable` property to `true`
  
  //Buttons remain interactive even if there's no game loop running.
  //g.state = play;    
}

//The `play` function will run in a loop...
function play() {
  //... but we don't need a game loop in this example, yay again!
}


})();
