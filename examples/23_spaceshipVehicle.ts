 

// Spaceship vehicle

/// <reference path="../ga.plugins.d.ts" />  

(function () {

/*
Learn how to create a generic spaceship vehicle.
*/

//Create a new GA instance, and start it.

let g = ga(256, 256, setup, ["fonts/puzzler.otf"]);
g.start();

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states

interface Ship extends GA.Group {
  accelerationX:number;
  accelerationY:number;
  frictionX:number;
  frictionY:number;
  rotationSpeed:number;
  moveForward:boolean;
}

var ship:Ship, message:GA.Text;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  //Make the background white and add a border to the canvas
  g.backgroundColor = "white";
  g.canvas.style.border = "1px black dashed";

  //Make the box and turret
  var box = g.rectangle(32, 32, "gray"),
      turret = g.line("red", 4, 0, 0, 32, 0);
  turret.x = 16;
  turret.y = 16;

  //Group them together as a composite sprite called `ship`
  ship = g.group(box, turret);
  g.stage.putCenter(ship);

  //Add some physics properties
  ship.vx = 0;
  ship.vy = 0;
  ship.accelerationX = 0.2;
  ship.accelerationY = 0.2;
  ship.frictionX = 0.96;
  ship.frictionY = 0.96;

  //The speed at which the ship should rotate,
  //initialized to 0
  ship.rotationSpeed = 0;

  //Whether or not the ship should move forward
  ship.moveForward = false;
  
  //Set the ship's `rotationSpeed` to -0.1 (to rotate left) if the
  //left arrow key is being pressed
  g.key.leftArrow.press = () => ship.rotationSpeed = -0.1;

  //If the left arrow key is released and the right arrow
  //key isn't being pressed down, set the `rotationSpeed` to 0
  g.key.leftArrow.release = () => {
    if (!g.key.rightArrow.isDown) ship.rotationSpeed = 0;
  };

  //Do the same for the right arrow key, but set
  //the `rotationSpeed` to 0.1 (to rotate right)
  g.key.rightArrow.press = () => ship.rotationSpeed = 0.1;


  g.key.rightArrow.release = () => {
    if (!g.key.leftArrow.isDown) ship.rotationSpeed = 0;
  };

  //Set `ship.moveForward` to `true` if the up arrow key is
  //pressed, and set it to `false` if it's released
  g.key.upArrow.press = () => ship.moveForward = true;
  g.key.upArrow.release = () => ship.moveForward = false;

  //Make a text sprite
  message = g.text("", "12px puzzler", "black", 8, 8);

  //Change the state to `play`
  g.state = play;  
}

//The `play` function will run in a loop
function play() {

  //Use the `rotationSpeed` to set the ship's rotation
  ship.rotation += ship.rotationSpeed;

  //If `ship.moveForward` is `true`, use acceleration  with a 
  //bit of basic trigonometry to make the ship move in the
  //direction of its rotation
  if (ship.moveForward) {
    ship.vx += ship.accelerationX * Math.cos(ship.rotation);
    ship.vy += ship.accelerationY * Math.sin(ship.rotation);
  } 
  
  //If `ship.moveForward` is `false`, use 
  //friction to slow the ship down
  else {
    ship.vx *= ship.frictionX;
    ship.vy *= ship.frictionY;
  }

  //Apply the ship's velocity to its position to make the ship move
  ship.x += ship.vx;
  ship.y += ship.vy;

  //Display the ship's angle of rotation
  message.content = String(ship.rotation);

}

})();

