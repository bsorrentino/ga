// Particle emitter

/// <reference path="../ga.plugins.d.ts" />  

(function () {

  /*
Use the `emitter` function to create a constant stream of particles
at fixed intervals. The emitter is a simple timer that calls the 
`particleEffect` function repeatedly at intervals in milliseconds that
you define. Use the emitter's `play` and `stop` methods to start and 
stop the particle stream.
*/

//Create a new GA instance, and start it.
//Pre-load images in the array.
let g = ga(256, 256, setup, ["images/star.png"]);
g.start();

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  //Create the particle emitter that emits star sprites
  //a 100ms intervals
  var particleStream = g.emitter(
    100,                                           //The interval
    () => 
      g.particleEffect(                     //The particle function
        g.pointer.x,                               //x position
        g.pointer.y,                               //y position
        () => g.sprite("images/star.png"),         //Particle sprite
        10,                                        //Number of particles
        0.1,                                       //Gravity
        false,                                     //Random spacing
        3.14, 6.28,                                //Min/max angle
        16, 32,                                    //Min/max size
        2, 5                                       //Min/max speed
      )
  );

  //Play the particle stream when the pointer is pressed
  g.pointer.press = () => {
    particleStream.play();
    console.log(particleStream.playing)
  };

  //Stop the particle stream when the pointer is released
  g.pointer.release = () => {
    particleStream.stop();
    console.log(particleStream.playing)
  };
  
  //Set the game state to `play`
  g.state = play;    
}

//The `play` function will run in a loop
function play() {
  //Not used in this example
}


})();

