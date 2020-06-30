 

// Shooting bullets



/// <reference path="../../ga.plugins.d.ts" />  

(function () {

/*
Learn how to use the keyboard to control a player character.

This file requires these convenience functions from `plugins.js`:
`shoot`
`move`
`angle`
`outsideBounds`
*/

//Create a new GA instance, and start it.

let g = ga(256, 256, setup);
g.start();

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states

var box:GA.Rectangle, turret:GA.Line, bullets:Array<GA.DisplayableObject>, message:GA.Text;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  //Make the background white and add a border to the canvas
  g.backgroundColor = "white";
  g.canvas.style.border = "1px black dashed";

  //Make a square and center it in the stage
  box = g.rectangle(32, 32, "gray", "black", 2);
  g.stage.putCenter(box);

  //Make a turret by drawing a red, 4 pixel wide line that's 32 pixels
  //long
  turret = g.line("red", 4, 0, 0, 32, 0);

  //Add the line as a child of the box and place its
  //start point at the box's center
  box.addChild(turret);
  turret.x = 16;
  turret.y = 16;

  //Make an array to store the bullets
  bullets = [];

  //Make the stage interactive and give it a `press` action. Every
  //time the player clicks or taps the stage a bullet will be fired
  //from the turret
  g.stage.interactive = true;
  g.stage.press = () => {
    g.shoot(
      box,           //The shooter
      box.rotation,  //The angle at which to shoot
      32,            //The bullet's offset from the center
      7,             //The bullet's speed (pixels per frame)
      bullets,        //The array used to store the bullets
      //A function that returns the sprite that should
      //be used to make each bullet
      () => g.circle(8, "red")
    );
  };

  //Add some text 
  message = g.text(
    "Click or tap to shoot", 
    "16px sans-serif",
    "black", 10, 10
  );
    
  //Change the state to `play`
  g.state = play;  
}

//The `play` function will run in a loop
function play() {

  //Make the box and turret angle towards the pointer
  box.rotation = g.angle(box, g.pointer);

  //Id you just want to move all the bullets without removing them
  //they hit the screen boundaries, you can just use the help of the `move` method
  //g.move(bullets);
 
  //Remove the bullets if they cross the screen boundaries
  //Loop through the bullets using `filter` so that we can remove
  //the bullet easily
  bullets = bullets.filter((bullet) => {
    //Move the bullet
    g.move(bullet);
    //Check for a collision with the stage boundary
    var collision = g.outsideBounds(bullet, g.stage.localBounds);
    //If there's a collision, display the side that the collision
    //happened on, remove the bullet sprite and filter it out of 
    //the `bullets` array
    if(collision) {
      message.content = "The bullet hit the " + collision; 
      //The `remove` function will remove a sprite for its parent.
      g.remove(bullet); 
      //Remove the bullet from the `bullets` array
      return false;
    } 
    //If the bullet hasn't hit the edge of the screen,
    //keep it in the `bullets` array
    return true;
  });
}

})();

