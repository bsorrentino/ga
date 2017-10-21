/// <reference path="../ga.plugins.d.ts" />

(function () {
  
/*
This file requires these convenience functions from `plugins.js`:
`followEase`
*/

//Create a new GA instance, and start it.
//Pre-load images in the array.
var g = ga(
  256, 256, setup, 
  [
    "images/buttonFairy.png"
  ]
);
g.start();

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states

var fairy;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  g.backgroundColor = "white";
  g.canvas.style.border = "1px black dashed";

  /*
  Ga has three way that you can make sprites with animation frames.
  The first, lower level way, is to use the `frames` method. `frames`
  lets you list an array of x/y positions on an image that refer to
  each sub-image that you wan to use. Here's how to use it:
  */   

  //Create the fairy's animation frames using the `frames` method
  var fairyFrames = g.frames(
    "images/buttonFairy.png", //The tileset image
    [[0,0],[48,0],[96,0]],    //The `x` and `y` positions of frames
    48, 32                    //The `width` and `height` of each frame
  );

  //Make a sprite using the frames
  fairy = g.sprite(fairyFrames);

  //You can also make a sprite with multiple frames by supplying the
  //sprite with an array of image file names. See the next example file
  //if you want to find out how to do that.
  //But the best way to make a sprite with multiple frames is to use
  //a texture atlas. Another example file ahead will show you how. But 
  //no matter how you add frames to a sprite, you control those frames
  //same way, which you'll learn next.

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
