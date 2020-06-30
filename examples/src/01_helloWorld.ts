// <reference path="../../ga.d.ts" />

(function () {

//Create a new GA instance, and start it.
var g = ga(256, 256, setup);
g.start();

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {
  console.log("setup");

  //Change the state to `play`
  g.state = play;
}

//The `play` function will run in a loop
function play() {
  console.log("play");
}

})();
