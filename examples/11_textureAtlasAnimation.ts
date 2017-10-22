// Texture atlas animation

/// <reference path="../ga.plugins.d.ts" />

(function () {

/*
This file requires these convenience functions from `plugins.js`:
`ease`
*/

//Create a new GA instance, and start it.
//Pre-load images in the array.
var g = ga(
  256, 256, setup, 
  [
    "images/fairy.json"
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
  An easier way to create animated sprites is to use a texture atlas,
  made with a software tool like Texture Packer. Save the PNG and JSON 
  files that Texture Packer
  produces in the same "images" folder. Then load the JSON file when you
  initialize Ga, as you can see at the beginning of this file. Next, create an array that
  lists the frame id names of all the images from the texture atlas
  that you want your sprite to contain. 
  */

  var fairyFrames = ["0.png", "1.png", "2.png"];

  //Finally, initialize the sprite using the array of frames.

  fairy = g.sprite(fairyFrames);

  //That's a lot easier than the previous example!
  //You can now control the animation just like you did in the
  //previous example

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

  /*
  You can also use the `show` method to display
  a specific frame. This is usually better to use than `gotoAndStop`
  because its more tightly integrated into the sprite's 
  state and animation manager.
  
      fairy.show(1);

  Or, use the frame id string of the frame you want to display

      fairy.show("1.png");

  */

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
