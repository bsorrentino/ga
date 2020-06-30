/// <reference path="../../ga.plugins.d.ts" />

(function () {
  
/*
This file requires these convenience functions from `plugins.js`:
`move`
`contain`
`rotateSprite`
*/

//Create a new GA instance, and start it.
//Pre-load images in the array.

var g = ga(256, 256, setup, ["assets/images/platforms.png"]);
g.start();

interface Star extends GA.Sprite {
  angle:number;
}
//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states
var cat:GA.Sprite, 
star:Star, 
square:GA.Rectangle, 
message, 
ball, 
line, 
localMessage:GA.Text, 
globalMessage:GA.Text, 
collisionMessage:GA.Text;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  /*
  This example illustrates how you can use `addChild` and
  `removeChild` to make sprites the children of other sprites.
  All sprites have local and global x and y coordinates. The local
  coordinates, `x` and `y`, are relative to the top left corner of the
  sprite's parent. The global coordinates, `gx` and `gy` are relative
  to the top left corner of the `stage`. (The `stage` is the root
  container that contains all the sprites in the game.)
  */

  //Make the background white and add a border to the canvas
  g.backgroundColor = "white";
  g.canvas.style.border = "1px black dashed";

  //Make a square, position it, and give it a drop shadow
  square = g.rectangle(128, 128, "lightblue", "black", 1);
  square.shadow = true;

  //Use the stage's `putCenter` method to put the square
  //in the center of the stage. You can also use `putTop`,
  //`putRight`, `putBottom` and `putLeft`. If you want to offset
  //the position, use x and y offset values as the second and third
  //arguments: `sprite.putTop(anySprite, -10, -5)` 
  g.stage.putCenter(square);

  //Make the cat sprite from a tileset
  cat = g.sprite(g.frame("assets/images/platforms.png", 32, 32, 32, 32));
  cat.shadow = true;

  //Control the cat with the keyboard
  const SPEED = 2, UP = 38, RIGHT = 39, DOWN = 40, LEFT = 37;
  g.fourKeyController(cat, SPEED, UP, RIGHT, DOWN, LEFT);

  //Add the cat as a child of the square, and put it at the bottom of
  //the square
  square.addChild(cat);
  square.putBottom(cat, 0, -cat.height);

  //Create some text that we'll use to display the cat's local position
  localMessage = g.text("", "11px sans-serif", "black");

  //Add the text as a child of the square
  square.addChild(localMessage);

  //Use the text's local `x` and local `y` values to set its top left
  //corner position relative to the square's top left corner
  localMessage.x = 4;
  localMessage.y = 2;

  //Make a star sprite and add it as a child of the cat
  star = g.sprite(g.frame("assets/images/platforms.png", 32, 0, 32, 32));

  //Scale the star's size down to 50%
  star.scaleX = 0.5;
  star.scaleY = 0.5;

  //Add the star to the cat and position it to the right of the cat  
  cat.addChild(star);
  cat.putRight(star);

  //Add an `angle` property to the star that we'll use to 
  //help make the star rotate around the cat
  star.angle = 0;

  //Create some text that will display the cat's global position
  globalMessage = g.text("This is some text to start", "11px sans-serif", "black");
  g.stage.putBottom(globalMessage, 0, -20);

  //Add some text to display the side on which
  //the cat is colliding with the edges of the square
  collisionMessage = g.text("Use the arrow keys to move...", "16px sans-serif", "black");

  //Yes, circles and lines work too!
  /*
  ball = g.circle(32, "LightPink");
  ball.shadow = true;
  square.addChild(ball);
  ball.x = 32;
  ball.y = 32;

  line = g.line("black", 4, 0, 0, 32, 32);
  star.addChild(line);
  line.x = 0;
  line.y = 0;
  */
    
  //If you change the square's `alpha`, the child sprites inside it will
  //be similarly affected
  //square.alpha = 0.2;

  //Change the state to `play`
  g.state = play;  
}

//The `play` function will run in a loop
function play() {
 
  //Move the cat
  g.move(cat);

  //You can also move a sprite the good old-fashioned way
  //cat.x += cat.vx;
  //cat.y += cat.vy;
  
  //Rotate the square
  square.rotation += 0.005;

  //Display the cat's local `x` and local `y` coordinates. These are
  //relative to the square's top left corner. (The square is the cat's
  //parent.)
  localMessage.content 
    = "cat.x: " + cat.x + ", " 
    + "cat.y: " + cat.y;

  //Display the cat's global `gx` and global `gy` coordinates. These are
  //relative to the `stage`, which is the root container for all the
  //sprites and groups.
  globalMessage.content 
    = "cat.gx: " + cat.gx + ", " 
    + "cat.gy: " + cat.gy;

  //Contain the cat inside the square's boundary
  var catHitsEdges = g.contain(cat, square.localBounds);

  //Display the edge of canvas that the cat hit
  if (catHitsEdges) {
    collisionMessage.content 
      = "The cat hit the " + catHitsEdges + " of the square";
  }

  //Make the star rotate
  star.rotation += 0.2;

  //Update the star's angle and make it rotate around the cat
  star.angle += 0.05;
  g.rotateAroundSprite(star, cat, 32, star.angle);
}

})();
