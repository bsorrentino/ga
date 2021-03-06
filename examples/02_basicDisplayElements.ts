/// <reference path="../ga.plugins.d.ts" />

(function () {

/*
Learn all the basics you need to know to get
started quickly using Ga.

This file requires these convenience functions from `plugins.js`:
`followEase`
`followConstant`
`angle`
`rotatePoint`
*/

//Create a new GA instance, and start it.
//Pre-load images in the array.
var g = ga(
  256, 256, setup,
  [
    "images/platforms.png",
    "images/rocket.png",
    "fonts/puzzler.otf",
    "fonts/PetMe64.ttf",
    "images/animals.json"
  ]
);
g.start();

interface Line extends GA.Line {
  angleA:number;
  angleB:number;
}

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states
var box:GA.Rectangle, ball:GA.Circle, line:Line, message, cat,
    pathA, pathB, rocket:GA.Sprite, star:GA.Sprite,
    pointerDisplay:GA.Text,
    tiger:GA.Sprite
    ;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  //Set an optional fps for the game.
  //The frame rate will default to 60 fps is you don't set it
  //g.fps = 12;
  //Optionally hide the mouse pointer
  //g.hidePointer();
  //Optionally change the background color
  //g.backgroundColor = "DarkGray";
  //`rectangle` arguments:
  //width, height, fillColor, strokeColor, lineWidth, x, y

  box = g.rectangle(32, 32, "cyan", "white", 4, 32, 32);
  box.rotation = 0.5;
  //You can optionally set the `pivotX` and `pivotY` properties of any
  //sprite to set the point around which the sprite should rotate.
  //0.5 is the default center point. Assign any percentage between
  //0.01 and 0.99 to shift the center of rotation.
  //box.pivotX = 0.25;
  //box.pivotY = 0.25;
  //`circle` argumenets:
  //diameter, fillstyle, stroketyle, lineWidth, x, y

  ball = g.circle(42, "Plum", "PowderBlue", 8, 95, 45);
  //`text` arguments:
  //content, font, fillStyle, x, y
  //The font family name will be the same as the font's file name

  message = g.text("Hello World!", "14px puzzler", "white");
  message.x = 80;
  message.y = 10;

  //Create a sprite from a single image by supplying the
  //image name as the first argument
  rocket = g.sprite("images/rocket.png");

  /*
  Use the `putCenter` convenience method to put the rocket
  in the center of the stage. The stage and all sprites can use
  `put` methods like this.
  `putCenter` arguments:
  sprite, xOffset, yOffset
  */

  g.stage.putCenter(rocket, 0, 40);

  /*
  You can also use `putLeft`, `putTop`, `putRight` and `putBottom`
  to precisely position a sprite around any other sprite.
  */

  //Optionally change the rocket's `width` and `height`
  rocket.width = 50;
  rocket.height = 50;

  /*
  You can make a sprite using a frame JSON tileset file in
  Texture Packer format. Just load the JSON file that contains the
  frame and supply the frame name in the sprite's argument. (The
  tileset image file will be loaded automatically when the JSON file
  loads)
  */

  tiger = g.sprite("tiger.png");
  //Use `setPosition` to set the sprite's `x` and `y` values
  //with one line of code

  tiger.setPosition(10, 190);
  //Use `scaleX` and `scaleY` to scale a sprite proportionately.
  //tiger.scaleX = 0.5;
  //tiger.scaleY = 0.5;

  tiger.width = 42;
  tiger.height = 42;

  /*
  You can access the tiger's tileset image like this:

      var tileset = g.image("images/animals.png");

  You can access the JSON data file like this:

      var json = g.json("images/animals.json");
  You can access the specific JSON data for a tileset
  frame like this:

      var frameData = g.json("tiger.png"));
  */

  //You can also make a sprite from a tileset image by
  //supplying a `frame` object as an argument to the sprite.
  //`frame` arguments:
  //sourceImage, sourceX, sourceY, sourceWidth, sourceHeight
  var starFrame = g.frame("images/platforms.png", 32, 0, 32, 32);
  star = g.sprite(starFrame);

  //You can add `radius` and `diameter` properties
  //to a sprite by setting its `circular` property
  //to `true`.
  star.circular = true;
  console.log("star.radius: " + star.radius);
  console.log("star.diameter: " + star.diameter);

  //Set `circular` back to `false` if you want to remove
  //the `radius` and `diameter` properties.
  //The game has a `pointer` object with a `x` and `y` property
  //that tells you the position of the mouse or touch pointer.
  //Here's how to display the pointer position with a `text` sprite:
  pointerDisplay = g.text("", "8px PetMe64", "white");
  pointerDisplay.x = 10;
  pointerDisplay.y = 235;

  //Every time you create a sprite it's added to the
  //`stage` object's `children` array.
  console.log("stage.children: " + g.stage.children);

  //Make any sprite interactive by setting its
  //`interactive` property to `true`. You can then assign
  //`press` and `release` actions to sprites. You can also
  //access its `state` and `action` properties.
  ball.interactive = true;
  ball.press = function() {

    //An array of color names
    var colors = ["Gold", "Lavender", "Crimson", "DarkSeaGreen"];

    //Set the ball's `fillStyle` and `strokeStyle` to a random color
    //the `randomInt` method
    ball.fillStyle = colors[g.randomInt(0, 3)];
    ball.strokeStyle = colors[g.randomInt(0, 3)];
  };

  //`line` arguments:
  //strokeStyle, lineWidth, ax, ay, bx, by
  line = g.line("Yellow", 4, 162, 52, 220, 94);

  //We're going to make the line's start and end points
  //rotate in space. The line will need two new angle properties
  //to help us do this. both are initialized to 0
  line.angleA = 0;
  line.angleB = 0;

  //Change the game state to `play`
  g.state = play;
}

//The `play` function will run in a loop
function play() {
  //Make the box rotate
  box.rotation += 0.01;

  //Make the star ease towards the pointer.
  //`followEase` arguments: follower, leader, speed
  g.followEase(star, g.pointer, 0.1);

  //Alternatively, use the `followConstant` method if you want to
  //make a sprite follow at a constant speed. The third argument
  //is the speed, which is the pixels/frame that the follower
  //will move
  //g.followConstant(star, g.pointer, 3);

  //Make the rocket rotate towards the star
  //`angle` returns the angle between two sprites, in radians.
  rocket.rotation = g.angle(rocket, star);

  //Make the star invisible if the pointer is "over"
  //the ball or being pressed "down" on it
  if (ball.state === "over" || ball.state === "down") {
    star.visible = false;
  } else {
    star.visible = true;
  }

  //Display the position of the pointer
  pointerDisplay.content
    = "pointer.x: " + g.pointer.x + " "
    + "pointer.y: " + g.pointer.y;

  //Make the line's `ax` and `ay` points rotate clockwise around
  //point 162, 52. Use the `rotateAroundPoint` method to help you do this.
  //`rotatePoint` returns an object with `x` and `y` properties
  //containing the point's new rotated position. Supply different
  //rotationRadiusX/Y arguments if you want the rotation to be ellipical.
  //`rotatePoint` arguments:
  //pointX, pointY, rotationRadiusX, rotationRadiusY, angleOfRotation
  line.angleA += 0.02;
  var rotatingA = g.rotateAroundPoint(162, 52, 10, 10, line.angleA);
  line.ax = rotatingA.x;
  line.ay = rotatingA.y;

  //Make the line's `bx` and `by` point rotate counter
  //clockwise around point 222, 94
  line.angleB -= 0.03;
  var rotatingB = g.rotateAroundPoint(220, 94, 10, 10, line.angleB);
  line.bx = rotatingB.x;
  line.by = rotatingB.y;
}

})();
