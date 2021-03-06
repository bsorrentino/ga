 

// Tank vehicle



/// <reference path="../ga.plugins.d.ts" />  

(function () {

/*
Learn how to create a generic tank vehicle.
*/

//Create a new GA instance, and start it.

let g = ga(256, 256, setup, ["fonts/puzzler.otf"]);
g.start();

interface Tank extends GA.Group {
  accelerationX:number;
  accelerationY:number;
  friction:number;
  rotationSpeed:number;
  moveForward:boolean;
  speed:number;
}

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states

var tank:Tank, message:GA.Text;

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

  //Group them together as a composite sprite called `tank`
  tank = g.group(box, turret);
  g.stage.putCenter(tank);

  //Add some physics properties
  tank.vx = 0;
  tank.vy = 0;
  tank.accelerationX = 0.2;
  tank.accelerationY = 0.2;
  tank.rotationSpeed = 0;
  tank.friction = 0.96;
  tank.speed = 0;

  //The speed at which the tank should rotate,
  //initialized to 0
  tank.rotationSpeed = 0;

  //Whether or not the tank should move forward
  tank.moveForward = false;
  
  //Set the tank's `rotationSpeed` to -0.1 (to rotate left) if the
  //left arrow key is being pressed
  g.key.leftArrow.press = () => {
    tank.rotationSpeed = -0.1;
  };

  //If the left arrow key is released and the right arrow
  //key isn't being pressed down, set the `rotationSpeed` to 0
  g.key.leftArrow.release = () => {
    if (!g.key.rightArrow.isDown) tank.rotationSpeed = 0;
  };

  //Do the same for the right arrow key, but set
  //the `rotationSpeed` to 0.1 (to rotate right)
  g.key.rightArrow.press = () => {
    tank.rotationSpeed = 0.1;
  };

  g.key.rightArrow.release = () => {
    if (!g.key.leftArrow.isDown) tank.rotationSpeed = 0;
  };

  //Set `tank.moveForward` to `true` if the up arrow key is
  //pressed, and set it to `false` if it's released
  g.key.upArrow.press = () => {
    tank.moveForward = true;
  };
  g.key.upArrow.release = () => {
    tank.moveForward = false;
  };

  //Make a text sprite
  message = g.text("", "12px puzzler", "black", 8, 8);

  //Change the state to `play`
  g.state = play;  
}

//The `play` function will run in a loop
function play() {

  //Use the `rotationSpeed` to set the tank's rotation
  tank.rotation += tank.rotationSpeed;

  //If `tank.moveForward` is `true`, increase the speed
  if (tank.moveForward) {
    tank.speed += 0.1;
  } 
    
  //If `tank.moveForward` is `false`, use 
  //friction to slow the tank down
  else {
    tank.speed *= tank.friction;
  }

  //Use the `speed` value to figure out the acceleration in the
  //direction of the tank’s rotation
  tank.accelerationX = tank.speed * Math.cos(tank.rotation);
  tank.accelerationY = tank.speed * Math.sin(tank.rotation);

  //Apply the acceleration to the tank's velocity
  tank.vx = tank.accelerationX;
  tank.vy = tank.accelerationY;

  //Apply the tank's velocity to its position to make the tank move
  tank.x += tank.vx;
  tank.y += tank.vy;

  //Display the tank's angle of rotation
  message.content = String(tank.rotation);

}

})();


