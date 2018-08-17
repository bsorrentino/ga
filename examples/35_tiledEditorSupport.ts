 

// Tiled editor support



/// <reference path="../ga.plugins.d.ts" />  

(function () {

/*
This file requires these convenience functions from `plugins.js`:
`move`
`contain`
`hitTestTile`
`getIndex`
`getPoints`
`makeTiledWorld`
*/

/*
Ga supports game maps and levels created using the popular Tiled
Editor level designer:

www.mapeditor.org
   
To prepare your Tiled Editor game world for use in Ga, give any significant thing a
`name` property. Anything with a `name` property in Tiled Editor can 
be accessed in your code by its string name, as you'll see ahead. Tiled Editor layers have a 
`name` property by default, and you can assign custom `name`
properties to tiles and objects.

Open `maps/timeBomPanic.tmx` file in Tiled Editor and take a careful
look at how it's been structured. Notice how sprites have been
organized into layers, and how those layers have been named and
stacked. Also, notice that the tileset images of the alien and bomb 
both have custom `name` properties: "alien" and "bomb".

*/

//Create a new GA instance, and start it.
//Load the tileset PNG and the Tiled Editor JSON file

var g = ga(512, 512, setup, 
  [
    "images/timeBombPanic.png",
    "maps/timeBombPanic.json"
  ]
);
g.start();

interface Alien extends GA.TiledSprite {
  direction:""|"none"|"left"|"up"|"right"|"down";
}
//Declare global sprites, objects, and variables
//that you want to access in all the game functions and states

var world:GA.TiledWorld, alien:Alien, message, wallMapArray:[number],
    bombMapArray:[number], bombSprites:GA.TiledSprite[], bombLayer:GA.TileLayer;

//A `setup` function that will run only once.
//Use it for initialization tasks
function setup() {

  g.backgroundColor = "white";

  //Make the world from the Tiled JSON data and the tileset PNG image
  world = g.makeTiledWorld(
    "maps/timeBombPanic.json", 
    "images/timeBombPanic.png"
  );
    
  /*
  Get a reference to the `alien` sprite.
  Use `world.getObject` to do this. `getObject` searches for and
  returns and sprite in the `world` that has a `name` property that
  matches the string in the argument.
  */
  alien = world.getObject("alien") as Alien;

  /*
  Each Tiled Editor layer has a `name` that can be accessed in your
  game code using
  `world.getObject` Tiled Editor's `tilelayers` have a `data` property
  that is an array containing all the grid index numbers (`gid`) of
  the tiles in that array. In this example we want to access all the
  wall sprites. In Tiled Editor, all the wall sprites were added to 
  a tile layer called `wallLayer`. We can access the `wallLayer`'s
  `data` array of sprites like this: 
  */

  let wallMap = world.getObject("wallLayer") as GA.TileLayer;
  wallMapArray = wallMap.data;

  /*
  We also need a reference to the bomb layer. All Tiled Editor layers are 
  created as `groups` by Ga's `makeTiledWorld` method. That means they
  all have a `children` array that lets' you access all the sprites on
  that layer, if you even need to do that. 
  */

  bombLayer = world.getObject("bombLayer") as GA.TileLayer;

  //Get a reference to the level's bomb layer array. This is the
  //bomb layer's `data` array

  bombMapArray = bombLayer.data;

  /*
  You can use `world.getObjects` (with an "s") to get an array of all
  the things in the world that have the same `name` properties. There
  are 5 bombs in the world, all which have share the same `name`
  property: "bomb". Here's how you can access to all of them in an
  array:
  */

  bombSprites = world.getObjects("bomb");

  //`bombSprites` is now an array that contains all the bomb sprites
  //in the world

  //Give the `alien` a `direction` property
  alien.direction = "";

  //Configure Ga's built in arrow keys to assign the alien a direction
  g.key.leftArrow.press = () => {alien.direction = "left"}; 
  g.key.upArrow.press = () => {alien.direction = "up"}; 
  g.key.rightArrow.press = () => {alien.direction = "right"}; 
  g.key.downArrow.press = () => {alien.direction = "down"}; 

  //Change the game state to `play`
  g.state = play;  
}

//The `play` function will run in a loop
function play() {
  //Change the alien's direction only if it's at an intersection
  //(This keeps it aligned to the grid cells. You don't have to do
  //this but it's a nice effect that you might want to use in your
  //own games at some point.)

  if(Math.floor(alien.x) % world.tilewidth === 0
  && Math.floor(alien.y) % world.tileheight === 0) {
    switch (alien.direction) {
      case "up":
        alien.vy = -4;
        alien.vx = 0;
        break;
      case "down":
        alien.vy = 4;
        alien.vx = 0;
        break;
      case "left":
        alien.vx = -4;
        alien.vy = 0;
        break;
      case "right":
        alien.vx = 4;
        alien.vy = 0;
        break;
      case "none":
        alien.vx = 0;
        alien.vy = 0;
        break;
    }
  }
  
  //Move the alien
  g.move(alien);

  //Keep the alien contained inside the canvas
  g.contain(alien, g.stage.localBounds);

  /*
  Prevent the alien from walking through walls using the 
  versatile `hitTestTile` method. `hitTestTile` checks for a
  collision between a sprite and a tile in any map array that you
  specify. It returns a `collision` object. 
  `collision.hit` is a Boolean that tells you if a sprite is colliding
  with the tile that you're checking. `collision.index` tells you the
  map array's index number of the colliding sprite. You can check for
  a collision with the tile against "every" corner point on the
  sprite, "some" corner points, or the sprite's "center" point. (Each
  of these three options has a different and useful effect, so experiment with
  them.)

  `hitTestTile` arguments:
  sprite, array, collisionTileGridIdNumber, worldObject, spritesPointsToCheck 

  The `world` object (the 4th argument) has to have these properties:
  `tileheight`, `tilewidth`, `widthInTiles`.

  `hitTestTile` will work for any map array, not just those made with
  Tiled Editor. So you can use it with your own game maps in the same way.

  */
  var alienVsFloor = g.hitTestTile(alien, wallMapArray, 0, world, "every");

  //If every corner point on the alien isn't touching a floor tile (array gridIDNumber: 0) then
  //prevent the alien from moving
  if (!alienVsFloor.hit) {
    //To prevent the alien from moving, subtract its velocity from its position
    alien.x -= alien.vx;
    alien.y -= alien.vy;
    alien.vx = 0;
    alien.vy = 0;
  }

  //Let the alien pick up bombs
  var alienVsBomb = g.hitTestTile(alien, bombMapArray, 5, world, "every");

  //Find out if the alien's position in the bomb array matches a bomb gid number
  if (alienVsBomb.hit) {
    //If it does, filter through the bomb sprites and find the one
    //that matches the alien's position
    bombSprites = bombSprites.filter(function(bomb) {
      //Does the bomb sprite have the same index number as the alien?
      if (bomb.index === alienVsBomb.index) {
        //If it does, remove the bomb from the 
        //`bombMapArray` by setting its gid to `0`
        bombMapArray[bomb.index] = 0;
        //Remove the bomb sprite from its container group
        g.remove(bomb);
        //Alternatively, remove the bomb with `removeChild` on
        //the `bombLayer` group
        //bombLayer.removeChild(bomb);
        //Filter the bomb out of the `bombSprites` array
        return false;
      } else {
        //Keep the bomb in the `bombSprites` array if it doesn't match
        return true;
      }
    });
  }

}


})();
