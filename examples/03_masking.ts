/// <reference path="../ga.plugins.d.ts" />

(function () {

//Learn how to use square and circle shapes as a mask for other
//sprites.

//Create a new GA instance, and start it.
//Pre-load a texture atlas called `animals.json` from the `images`
//folder.
var g = ga( 256, 256, setup, ["images/animals.json"]);
g.start();

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states

var cat:GA.Sprite, hedgehog:GA.Sprite, roundMask:GA.Circle, squareMask:GA.Rectangle;

//A `setup` function that will run only once.
//Use it for initialization tasks.
function setup() {

  //1. Mask the cat sprite with a square shaped mask

  //Create a square shaped mask for the cat. Do this by creating
  //an ordinary rectangle sprite, and setting its `mask` property
  //to `true`.
  squareMask = g.rectangle(64, 64);
  squareMask.mask = true;

  //Create a `cat` sprite using a texture atlas frame.
  cat = g.sprite("cat.png");

  //Add the cat as child of the mask
  squareMask.addChild(cat);

  //Position the mask in the center of the stage, but offset it
  //64 pixels to the left.
  g.stage.putCenter(squareMask, -64);

  //2. Mask the hedgehog sprite with a round shaped mask

  //Create a circle shape and set its `mask` property to `true`.
  roundMask = g.circle(128);
  roundMask.mask = true;

  //Create a `hedgehog` sprite from the texture atlas.
  hedgehog = g.sprite("hedgehog.png");

  //Add the hedgehog as child of the mask
  roundMask.addChild(hedgehog);

  //Center the hedgehog in the middle of the mask
  roundMask.putCenter(hedgehog);

  //Center the mask on the stage, but offset it 64 pixels to the right.
  g.stage.putCenter(roundMask, 64);

  //Change the game state to `play`.
  g.state = play;
}

//The `play` function will run in a loop... but it doesn't do anything
//in this example
function play() {

  //Add any optional game loop code here.
}

})();
