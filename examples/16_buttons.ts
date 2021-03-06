 

// Buttons


/// <reference path="../ga.plugins.d.ts" />  

(function () {

/*
Learn how to make an interactive button with three
states: up, over and down.
*/

//Create a new GA instance, and start it.
//Pre-load images in the array.
let g = ga(
  256, 256, setup, 
  [
    "images/button.png",
    "fonts/puzzler.otf"
  ]
);
g.start();

//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states

var button:GA.Sprite, stateMessage:GA.Text, actionMessage:GA.Text;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  g.backgroundColor = "white";
  g.canvas.style.border = "1px black dashed";

  //Create the button's three image states using the `frames` method
  var buttonFrames = g.frames(
    "images/button.png",       //The tileset image
    [[0,0],[0,96],[0,192]],    //The `x` and `y` positions of frames
    192, 96                    //The `width` and `height` of each frame
  );

  //Make a `button` using the frames.
  button = g.button(buttonFrames);

  //Assign the button's optional and customizable `press`, `release`, 
  //`over`, `out` and `tap` actions
  button.press = () =>  {
    console.log("pressed");
  };
  button.release = () =>  {
    console.log("released");
  };
  button.over = () =>  {
    console.log("over");
  };
  button.out = () =>  {
    console.log("out");
  };
  button.tap = () =>  {
    console.log("tapped");
  };

  //Position the button
  button.x = g.canvas.width / 2 - 96;
  button.y = g.canvas.height / 2 - 48;

  //Some text to display the button's state and action
  stateMessage = g.text("State not set", "14px puzzler", "black");
  stateMessage.x = 12;
  stateMessage.y = 12;

  actionMessage = g.text("Action not set", "14px puzzler", "black");
  actionMessage.x = 12;
  actionMessage.y = 32;

  //Buttons remain interactive even if there's no game loop running.
  g.state = play;    
}

//The `play` function will run in a loop
function play() {
  stateMessage.content = "State: " + button.state;
  actionMessage.content = "Action: " + button.action;
}


})();
