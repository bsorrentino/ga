 

// Sounds


/// <reference path="../ga.plugins.d.ts" />  

(function () {

/*
This file is a working example of how to use sounds in Ga.
Ga implements the latest version of "Sound for Games" under the
hood.
Check out the "Sound for Games" repository for full details on how
to control and generate sounds:

https://github.com/kittykatattack/soundForGames

The only difference in Ga's implementation is that you can pre-load sounds inside Ga's assets
array, in the same way that you can pre-load images and data files.
Also, after sounds have loaded you can access them like this:

    g.sound("sounds/anySound.mp3")

Let's find out how it all works:
*/

//First, create a new GA instance, and start it.
//Pre-load sounds in the constructor array.
let g = ga(
  256, 350, setup, 
  [
    "sounds/shoot.wav",
    "sounds/music.wav",
    "sounds/explosion.wav",
    "fonts/PetMe64.ttf"
  ]
);
g.start();

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  //First, create some sound objects
  //Use the `sounds` method to create sound objects. The `sound`
  //method takes one argument: a string that describes the sound file path
  var shoot = g.sound("sounds/shoot.wav"),
      explosion = g.sound("sounds/explosion.wav"),
      music = g.sound("sounds/music.wav");

  //Next, setup the sounds

  //Make the music loop
  music.loop = true;

  //Set the pan
  shoot.pan = 0.8;
  music.pan = -0.8;

  //Set the volume
  shoot.volume = 0.5;
  music.volume = 0.3;

  //Create the keyboard objects to play the sounds
  let one = g.keyboard(49),
      a = g.keyboard(65),
      b = g.keyboard(66),
      c = g.keyboard(67),
      d = g.keyboard(68),
      e = g.keyboard(69),
      f = g.keyboard(70),
      gee = g.keyboard(71),
      h = g.keyboard(72),
      i = g.keyboard(73),
      j = g.keyboard(74);

  //Create `press` actions for each sound 
  one.press = () => {
    shoot.play();
  };
  a.press = () => {
    //Allow the music to start playing only once
    if (!music.playing) music.play(); 
  };
  b.press = () => {
    music.pause();
  };
  c.press = () => {
    music.restart();
  };
  d.press = () => {
    music.playFrom(10);
  };
  e.press = () => {
    music.fadeOut(3);
  };
  f.press = () => {
    music.fadeIn(3);
  };

  //You can also generate sound effects from scratch using Ga's
  //versatile `soundEffect` function.

  //First, define your sounds as re-usable functions

  //The shoot sound
  function shootSound() {
    g.soundEffect(
      1046.5,           //frequency
      0,                //attack
      0.3,              //decay
      "sawtooth",       //waveform
      1,                //Volume
      -0.8,             //pan
      0,                //wait before playing
      1200,             //pitch bend amount
      false,            //reverse bend
      0,                //random pitch range
      25,               //dissonance
      [0.2, 0.2, 2000], //echo: [delay, feedback, filter]
      undefined         //reverb: [duration, decay, reverse?]
    );
  }

  //The jump sound
  function jumpSound() {
    g.soundEffect(
      523.25,       //frequency
      0.05,         //attack
      0.2,          //decay
      "sine",       //waveform
      3,            //volume
      0.8,          //pan
      0,            //wait before playing
      600,          //pitch bend amount
      true,         //reverse
      100,          //random pitch range
      0,            //dissonance
      undefined,    //echo: [delay, feedback, filter]
      undefined     //reverb: [duration, decay, reverse?]
    );
  }

  //The explosion sound
  function explosionSound() {
    g.soundEffect(
      16,          //frequency
      0,           //attack
      1,           //decay
      "sawtooth",  //waveform
      1,           //volume
      0,           //pan
      0,           //wait before playing
      0,           //pitch bend amount
      false,       //reverse
      0,           //random pitch range
      50,          //dissonance
      undefined,   //echo: [delay, feedback, filter]
      undefined    //reverb: [duration, decay, reverse?]
    );
  }

  //The bonus points sound
  function bonusSound() {
    //D
    g.soundEffect(587.33, 0, 0.2, "square", 1, 0, 0);
    //A
    g.soundEffect(880, 0, 0.2, "square", 1, 0, 0.1);
    //High D
    g.soundEffect(1174.66, 0, 0.3, "square", 1, 0, 0.2);
  }
 
  //Program keyboard keys to play the sounds.
  gee.press = () => { shootSound() };
  h.press = () => { jumpSound() };
  i.press = () => { explosionSound() };
  j.press = () => { bonusSound() };

  //Ga doesn't have multi-line support for text (yet!) so let's
  //do it caveman-style for now:

  //Define the font and color
  const ff = "10px PetMe64";
  const cc = "YellowGreen";

  //Create each line of text
  g.text("To shoot, press 1", ff, cc, 10, 10);
  g.text("To control music:", ff, cc, 10, 50);
  g.text("a - Play", ff, cc, 10, 70);
  g.text("b - Pause", ff, cc, 10, 90);
  g.text("c - Restart", ff, cc, 10, 110);
  g.text("d - Go to 10 sec. mark", ff, cc, 10, 130);
  g.text("e - Fade out", ff, cc, 10, 150);
  g.text("f - Fade in", ff, cc, 10, 170);
  g.text("Generated sound effects:", ff, cc, 10, 210);
  g.text("g - Shoot sound", ff, cc, 10, 230);
  g.text("h - Jump sound", ff, cc, 10, 250);
  g.text("i - Explosion sound", ff, cc, 10, 270);
  g.text("j - Bonus sound", ff, cc, 10, 290);

  //g.state = play;    
}

//The `play` function will run in a loop
function play() {
  //...but we don't need a game loop in this example, yay! :)
}


})();
