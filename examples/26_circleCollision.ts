 

// Circle collision

/// <reference path="../ga.plugins.d.ts" />  

(function () {

/*
This file requires these convenience functions from `plugins.js`:
`hitTestCircle`
*/

//Create a new GA instance, and start it.

let g = ga(256, 256, setup);
g.start();

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states

var blue:GA.Circle, red:GA.Circle, message:GA.Text;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  //Make the background white and add a border to the canvas
  g.backgroundColor = "white";
  g.canvas.style.border = "1px black dashed";

  //Make a blue circle
  blue = g.circle(64, "blue");
  g.stage.putCenter(blue, blue.halfWidth + 16, blue.halfHeight +16);
  blue.draggable = true;
  
  //Make a red circle
  red = g.circle(64, "red");
  g.stage.putCenter(red, -red.radius -16, -red.radius -16);
  red.draggable = true;

  //Add some text 
  message = g.text(
    "No collision...", 
    "16px sans-serif",
    "black", 10, 10
  );
    
  //Change the state to `play`
  g.state = play;  
}

//The `play` function will run in a loop
function play() {

  //Set the default message content 
  message.content = "No collision...";

  //Check for a collision between the blue and red circles using
  //the universal `hit` method.
  //The collision variable will be `true`
  //if there's a collision and `false` if there isn't
  var collision = g.hit(blue, red);

  //Alternatively, you can use the lower-level `hitTestCircle` method.
  //`hitTestCircle` arguments:
  //sprite, sprite
  //var collision = g.hitTestCircle(blue, red);
  
  //Change the message if there's a collision between the circles
  if(collision) {
    message.content = "Collision!"; 
  }
}

})();

