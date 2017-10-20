/// <reference path="../ga.plugins.d.ts" />

(function () {
/*
Learn how to make use and access Ga's built in universal `pointer`
that works with both touch and the mouse.
*/

//Create a new GA instance, and start it.
//Pre-load a texture atlas called `animals.json` from the `images`
//folder.
var g = ga(256, 256, setup);
g.start();

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states.

var output:HTMLParagraphElement;

//A `setup` function that will run only once.
//Use it for initialization tasks.
function setup() {

  //Get a reference to the output <p> tag
  output = document.querySelector("p") as HTMLParagraphElement;

  //Add a custom `press` method
  g.pointer.press = () => console.log("The pointer was pressed");

  //Add a custom `release` method
  g.pointer.release = () => console.log("The pointer was released");

  //Add a custom `tap` method
  g.pointer.tap = () => console.log("The pointer was tapped");

  //Change the game state to `play`.
  g.state = play;
}

//The `play` function will run in a loop
function play() {

  //Display the pointer properties in the
  //HTML <p> tag called `output`
  output.innerHTML
    = "Pointer properties: " + "<br>"
    + "pointer.x: " + g.pointer.x + "<br>"
    + "pointer.y: " + g.pointer.y + "<br>"
    + "pointer.isDown: " + g.pointer.isDown + "<br>"
    + "pointer.isUp: " + g.pointer.isUp + "<br>"
    + "pointer.tapped: " + g.pointer.tapped
    + "<br><br>"
    + "Open the console window to see the result of the `press`, "
    + "`release` and `tap` methods.";

  //Add any extra optional game loop code here.
}

})();
