/// <reference path="../ga.plugins.d.ts" />

(function () {
/*
This file requires these convenience functions from `plugins.js`:
`move`
`contain`
`keyControlFourWay`
*/

//Create a new GA instance, and start it.
//Pre-load images in the array.

var g = ga(256, 256, setup, ["images/platforms.png"]);
g.start();

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states

var cat:GA.Sprite, message:GA.Text;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  //Make the background white and add a border to the canvas
  g.backgroundColor = "white";
  g.canvas.style.border = "1px black dashed";

  //Make a sprite from a tileset
  cat = g.sprite(g.frame("images/platforms.png", 32, 32, 32, 32));

  //Center the cat
  g.stage.putCenter(cat);

  //The above code is the equivalent to this:
  //cat.x = g.canvas.width / 2 - cat.halfWidth;
  //cat.y = g.canvas.height / 2 - cat.halfHeight;

  /*
  Use the `keyControlFourWay` convenience method to make the cat
  move up, right, down and left at a speed of 2 pixels per second when
  the arrow keys are pressed. It also adds a `direction` property to
  the sprite which is a string that tells you the direction the
  sprite is moving in: "up", "right", "down" or "left"
  `keyControlFourWay` arguments:
  sprite, speed, upCode, rightCode, downCode, leftCode
  (You can remember the order of the key codes because they're listed
  clockwise from top.)
  */

  g.fourKeyController(cat, 2, 38, 39, 40, 37);

  /*
  That's quick and easy, but for most games you'll need a lot more
  control over how your keys are assigned and what they do.
  The game engine has a built-in `key` object with keyboard bindings
  to the arrow keys and space bar. Access them like this:
  `key.leftArray`, `key.rightArrow`, `key.upArrow`, `key.downArrow`,
  `key.space`. All these keys have `press` and
  `release` methods that you can define. Here's how to create you own
  custom key:

      var customKey = g.keyboard(asciiCode);

  Here's how to customize the `press` and `release` methods of
  Ga's pre-defined arrow keys to control an on-screen game character:
  */

  /*
  //Assign key `press` methods
  g.key.leftArrow.press = function() {
    //Change the cat's velocity when the key is pressed
    cat.vx = -2;
    cat.vy = 0;
    cat.direction = "left";
  };
  g.key.leftArrow.release = function() {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!g.key.rightArrow.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };
  g.key.upArrow.press = function() {
    cat.vy = -2;
    cat.vx = 0;
    cat.direction = "up";
  };
  g.key.upArrow.release = function() {
    if (!g.key.downArrow.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };
  g.key.rightArrow.press = function() {
    cat.vx = 2;
    cat.vy = 0;
    cat.direction = "right";
  };
  g.key.rightArrow.release = function() {
    if (!g.key.leftArrow.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };
  g.key.downArrow.press = function() {
    cat.vy = 2;
    cat.vx = 0;
    cat.direction = "down";
  };
  g.key.downArrow.release = function() {
    if (!g.key.upArrow.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };
  */

  //Have a look at the `animationStates` for details on
  //assigning your own custom key bindings

  //Add some text to display messages
  message = g.text("Use the arrow keys to move...", "16px sans-serif", "black");

  //Change the state to `play`
  g.state = play;
}

//The `play` function will run in a loop
function play() {

  /*
  Use the `move` convenience method to move the cat. This just updates
  the cat's `x` and `y` position with its velocity (`vx` and `vy`)
  each frame. If you have a lot of sprites inside an array, you can
  move them all the same time by supply the array as an argument, like this:

      g.move(arrayOfSprites);

  Or, just move one sprite at a time, like this:
  */

  g.move(cat);

  //Of course you can also move a sprite the good old-fashioned way if
  //really want to!
  //cat.x += cat.vx;
  //cat.y += cat.vy;

  //If the cat is moving, display its direction
  if (Math.abs(cat.vx) > 0 || Math.abs(cat.vy) > 0) {
    message.content = "The cat is going: " + cat.direction;
  } else {
    message.content = "Use the arrow keys to move...";
  }

  /*
  Contain the cat inside the canvas.
  'contain` constrains the sprite's movement to a rectangular space
  defined by the `localBounds` property of any object.
  (`localBounds` returns an object with `x`, `y`, `width` and `height`
  properties).
  If the sprite hits the edges of
  that space, `contain` returns a useful a string that will tell you which
  side the sprite hit: "left", "right". "top" or "bottom".
  */

  var catHitsEdges = g.contain(cat, g.stage.localBounds);

  //Display the edge of canvas that the cat hit
  if (catHitsEdges) {
    message.content
      = "The cat hit the " + catHitsEdges + " of the canvas";
  }
}

})();
