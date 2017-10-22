/// <reference path="../ga.plugins.d.ts" />

(function () {
  
/*
This example shows how to make a sprite with multiple frames using
a series of individual image files.

This file requires these convenience functions from `plugins.js`:
`followEase`
*/

//Create a new GA instance, and start it.
//Pre-load images in the array.
var g = ga(
  256, 256, setup, 
  [
    "images/buttonFairy/0.png",
    "images/buttonFairy/1.png",
    "images/buttonFairy/2.png"
  ]
);
g.start();

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states

var fairy:GA.Sprite;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  g.backgroundColor = "white";
  g.canvas.style.border = "1px black dashed";

  /*
  Ga has three main way that you can make sprites with animation frames.
  The first, lower level way, is to use the `frames` method. `frames`
  lets you list an array of x/y positions on an image that refer to
  each sub-image that you wan to use. The previous example showed you
  how to do that.
  You can also make animation frames from individual images files.
  Just feed the sprite any array containing the image files that you
  want to use for each frame.
  (The best way to make a sprite with multiple frames is to use a 
  texture atlas - see the next example.)
  */   


  //You can make a sprite from an array of images, like this:
  fairy = g.sprite([
    "images/buttonFairy/0.png",
    "images/buttonFairy/1.png",
    "images/buttonFairy/2.png"
  ]);
  
  //You can control the sprites using the same methods and properties
  //you learned in the previous example.

  //Use the `play` method to play the fairy's frames.
  //The animation will loop unless you set the sprite's `loop`
  //property to `false`. Change the frame-rate with the
  //`fps` property (it's default value is `12`)
  fairy.fps = 24;
  fairy.play();

  //Use the `stop` method to stop an animation.
  //Here's an example of how you could stop the
  //fairy from flapping her wings after 3 seconds
  /*
  g.wait(3000, function(){
     fairy.stop(); 
  });
  */

  //You can use `gotoAndStop` to go to a specific frame number
  //fairy.gotoAndStop(2);

  //You can also use the `show` method to display
  //a specific frame. This is usually better to use than `gotoAndStop`
  //because its more tightly integrated into the sprite's 
  //state and animation manager.
  //fairy.show(1);

  //Use `playSequence` to play a range of frames. 
  //fairy.fps = 1;
  //fairy.playSequence([0, 1]);

  g.state = play;    
}

//The `play` function will run in a loop
function play() {
 
  //Make the fairy ease towards the pointer.
  //`followEase` arguments: follower, leader, speed
  g.followEase(fairy, g.pointer, 0.1);

}


})();
