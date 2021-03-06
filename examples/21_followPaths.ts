 // Tweening

/// <reference path="../ga.plugins.d.ts" />  

(function () {

/*
Use `walkPath` or `walkCurve` to make a sprite follow a
path between a series of connected waypoints.
*/

//Create a new GA instance, and start it.
//Pre-load images in the array.
let g = ga(
  512, 600, setup, 
  [
    "images/animals.json"
  ]
);
g.start();

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  g.backgroundColor = "white";
  g.canvas.style.border = "1px black dashed";

  //The cat sprite
  let cat = g.sprite("cat.png"); 
  cat.setPosition(32, 32);

  //Use `walkPath` to make the cat follow a straight path 
  //between a series of connected waypoints. Here's how to use it:

  let catPath = g.walkPath(
    cat,                   //The sprite

    //An array of x/y waypoints to connect in sequence
    [
      [32, 32],            //First x/y point
      [32, 128],           //Next x/y point
      [300, 128],          //Next x/y point
      [300, 32],           //Next x/y point
      [32, 32]             //Last x/y point
    ], 

    300,                   //Total duration, in frames
    "smoothstep",          //Easing type
    true,                  //Should the path loop?
    true,                  //Should the path reverse?
    1000                   //Delay in milliseconds between segments
  ); 

  //The hedgehog sprite
  let hedgehog = g.sprite("hedgehog.png"); 
  hedgehog.setPosition(32, 256);

  //Use `walkCurve` to make the hedgehog follow a curved path 
  //between a series of connected waypoints. Here's how to use it:

  var hedgehogPath = g.walkCurve(
    hedgehog,              //The sprite

    //An array of Bezier curve points that 
    //you want to connect in sequence
    [
      [[hedgehog.x, hedgehog.y],[75, 500],[200, 500],[300, 300]],
      [[300, 300],[250, 100],[100, 100],[hedgehog.x, hedgehog.y]]
    ],

    300,                   //Total duration, in frames
    "smoothstep",          //Easing type
    true,                  //Should the path loop?
    true,                  //Should the path yoyo?
    1000                   //Delay in milliseconds between segments
  );

  //Tweens are updated independently in Ga's internal 
  //game engine loop, so there's no need to update them in
  //your own `play` state to make them work.
  //g.state = play;    
}

//The `play` function will run in a loop...
function play() {
  //... but we don't need a game loop in this example, yay!
}


})();
