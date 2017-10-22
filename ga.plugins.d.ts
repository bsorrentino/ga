/// <reference path="ga.d.ts" />

declare namespace GA {

type Collision = undefined |
                        "left" |
                        "top" |
                        "right" |
                        "bottom";
type Hitting = undefined |
                      "topLeft" |
                      "topRight" |
                      "bottomLeft" |
                      "bottomRight" |
                      "topMiddle" |
                      "bottomMiddle" |
                      "leftMiddle" |
                      "rightMiddle";

type EasingType =
            //Linear
            "linear" |
            //Smoothstep
            "smoothstep" |
            "smoothstepSquared" |
            "smoothstepCubed" |

            //Acceleration
            "acceleration" |
            "accelerationCubed" |

            //Deceleration
            "deceleration" |
            "decelerationCubed" |

            //Sine
            "sine" |
            "sineSquared" |
            "sineCubed" |
            "inverseSine" |
            "inverseSineSquared" |
            "inverseSineCubed" |

            //Spline
            "spline"
;

interface Camera {

    x:number;
    y:number;
    centerX:number;
    centerY:number;
    readonly rightInnerBoundary:number;
    readonly leftInnerBoundary:number;
    readonly topInnerBoundary:number;
    readonly bottomInnerBoundary:number;

    /**
     * Make it follow a sprite
     */
    follow(sprite:DisplayableObject):void;
    /**
     * center the camera over a sprite
     */
    centerOver(sprite:DisplayableObject):void;
}

interface Sound  {

    /**
     *
     */
    volume:number;

    /**
     *
     */
    echo:boolean;

    /**
     *
     */
    reverb:boolean;

    /**
     *
     */
    loop:boolean;

    /**
     * 
     */
    playing:boolean;

    /**
     * You can set the sound object's pan by assigning a value between -1 (left speaker) to 1 (right speaker).
     * A pan value of 0 makes the sound equal volume in both speakers.
     */
    pan:number;

    /**
     *
     */
    playbackRate:number;

    /**
     *
     */
    play():void;

    /**
     *
     */
    playFrom(second:number):void;

    /**
     *
     */
    setReverb(duration:number, decay:number, reverse:boolean):void;

    /**
     *
     */
    setEcho(delayValue:number, feedbackValue:number, filterValue:number):void;

    /**
     *
     */
    fade(targetVolume:number, timeInSeconds:number):void;

    /**
     *
     */
    pause():void;

    /**
     *
     */
    restart():void;

    /**
     *
     */
    fadeIn(durationInSeconds:number):void;

    /**
     *
     */
    fadeOut(durationInSeconds:number):void;

}

interface Tween {
    // bounce
    startMagnitude?:number;
    endMagnitude?:number;

    startValue:number;
    endValue:number;
    playing:boolean;
    totalFrames:number;
    frameCounter:number;

    start( startValue:number, endValue:number ):void;
    update():void;
    end():void;
    play():void;
    pause():void;

    onComplete:()=>void;
}

type Path = Tween;


type ProgressBar = {

    create( canvas:HTMLCanvasElement, assets:Array<any> ):void;
    update():void;
    remove():void;
}

interface Particle extends DisplayableObject {
    scaleSpeed:number;
    alphaSpeed:number;
    rotationSpeed:number;
}

type ParticleStream = {

    playing:boolean;
    play():void;
    stop():void;
}

interface TilingSprite extends Rectangle {

    tileX:number;
    tileY:number;

}

type SurroundingCells = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];

type CornerPoints = {
    topLeft: Coordinate;
    topRight: Coordinate;
    bottomLeft: Coordinate;
    bottomRight: Coordinate;
}

interface TiledSprite extends DisplayableObject {
    name:string;
    gid:number;
    index:number;
}

interface TileLayer {
    data:[number];
}

interface TiledWorld extends Group {

    getObject<T extends TiledSprite|TileLayer>(name:string):T;
    getObjects(name:string):[TiledSprite];

    tilewidth:number;
    tileheight:number;
    widthInTiles:number;
    heightInTiles:number;
}

type BaseObject = { readonly x:number, readonly y:number, readonly centerX:number, readonly centerY:number};
type Follower = BaseObject
type Leader   = BaseObject;


interface Sprite  {
  direction?:""|"left"|"up"|"right"|"down";
}

interface Engine {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// UTILITIES
///
/// [Y] `move`: Make a sprite or group move (or an array of them) by updating its velocity.
/// [Y] `distance`: The distance in pixels between the center point of two sprites.
/// [Y] `followEase`: Make a sprite ease to the position of another sprite.
/// [N] `easeProperty`: Ease a single sprite property to another value.
/// [N] `slide`: Ease a sprite to a specific position. (see TWEENING)
/// [N] `fadeIn`: Fade in a sprite. (see TWEENING)
/// [N] `fadeOut`: Fade out a sprite. (see TWEENING)
/// [N] `fade`: Fades in or out. (see TWEENING)
/// [N] `pulse`: Uses the `fade` method to make a sprite's alpha oscillate. (see TWEENING)
/// [Y] `followConstant`: Make a sprite follow another sprite at a fixed speed.
/// [Y] `rotateAroundSprite`: Make a sprite rotate around the center of another sprite.
/// [Y] `rotateAroundPoint`: Make any x/y point rotate around any other point.
/// [Y] `angle`: Get the angle between the center points of two sprites
/// [Y] `randomInt`: Generate a random integer within a range.
/// [Y] `randomFloat`: Generate a random floating point number within a range.
/// [Y] `wait`: Wait for a certain number of milliseconds and then execute a callback function.
/// [Y] `worldCamera`: A method that creates and returns a camera for a scrolling game world.
/// [Y] `scaleToWindow`: Automatically scales and centers the game to the maximum browser window area.
/// [Y] `shake`: Make a sprite or group shake. You can use it for a screen shake effect.
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Move a sprite or an array of sprites by adding its
 * velocity to its position
 */
move( sprites:DisplayableObject|Array<DisplayableObject> ):void;

/**
 * Find the distance in pixels between two sprites.
 *
 * @param s1 sprite object with `centerX` and `centerX` properties.
 * @param s2 sprite object with `centerX` and `centerX` properties.
 */
distance( s1:DisplayableObject, s2:DisplayableObject|Pointer):number;

/**
 * Make a sprite ease to the position of another sprite.
 *
 * @param follower
 * @param leader
 * @param speed The easing value, such as 0.3. A higher number makes the follower move faster
 */
followEase(follower:Follower, leader:Leader, speed:number):void;

/**
 * Make a sprite move towards another sprite at a regular speed.
 *
 * @param follower
 * @param leader
 * @param speed The speed value, such as 3. The is the pixels per frame that the sprite will move. A higher number makes the follower move faster.
 */
followConstant(follower:DisplayableObject, leader:DisplayableObject, speed:number):void


/**
 * Make a sprite rotate around another sprite
 */
rotateAroundSprite(rotatingSprite:DisplayableObject, centerSprite:DisplayableObject, distance:number, angle:number):void;

/**
 * Make a point rotate around another point.
 * If distanceX and distanceY are the same value, the rotation will be circular.
 * If they're different values, the rotation will be ellipical.
 */
rotateAroundPoint(pointX:number, pointY:number, distanceX:number, distanceY:number, angle:number):Coordinate;

/**
 * Return the angle in Radians between two sprites.
 * You can use it to make a sprite rotate towards another sprite like this:
 *
 *  box.rotation = angle(box, pointer);
 *
 * @param s1 A sprite object with `centerX` and `centerY` properties.
 * @param s2 A sprite object with `centerX` and `centerY` properties.
 */
angle(  s1:{centerX:number,centerY:number}, 
        s2:{centerX:number,centerY:number} ):number;

/*
 *
 *
 * Returns a random integer between a minimum and maximum value
 * @param min an integer.
 * @para, max an integer.
 */
randomInt(min:number, max:number):number;

/**
 * Returns a random floating point number between a minimum and maximum value
 *
 */
randomFloat(min:number, max:number):number;

/**
 * Wait for a certain number of milliseconds and then execute a callback function.
 *
 * @duration millseconds
 * @callback
 * @return handle (@see: clearTimeout)
 */
wait(duration:number, callBack:(()=>void)):number;

/**
 * method that creates and returns a camera for a scrolling game world.
 *
 * @param world   worldObject
 * @param canvas  theCanvas
 * @return Camera
 */
worldCamera(world:DisplayableObject|Bounds, canvas:HTMLCanvasElement):Camera;

/**
 * Center and scale the game engine inside the HTML page
 */
scaleToWindow(backgroundColor?:string):void;

/**
 * Used to create a shaking effect, like a screen shake.
 * Use it like this:
 *
 *      g.shake(sprite, 0.05, true);
 *
 * If `angularShake?` (the 3rd argument) is `true`, the sprite will shake around its axis.
 * The `magnitude` will be the maximum value, in radians, that it should shake.
 * If `angularShake?` is `false` the shake effect will happen on the x/y axis.
 *
 *      g.shake(sprite, 16, false);
 * In that case the magnitude will be the maximum amount of displacement, in pixels.
 *
 * @param sprite
 * @param magnitude optional dfault = 16
 * @param angular if it is an angular shake default = false
 */
shake(sprite:DisplayableObject, magnitude?:number, angular?:boolean):void;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// TWEENING
///
/// [N] `tweens`: An array to store all of Ga's current tweens.
/// [N] `updateTweens`: A function that updates all the tweens each frame inside Ga's game loop.
/// [N] `ease`: An object that stores references to useful easing functions.
/// [N] `tweenProperty`: A generic low-level method that tweens any sprite property.
/// [Y] `slide`: Make a sprite slide from one x/y position to another.
/// [Y] `fadeIn`: Fade a sprite in.
/// [Y] `fadeOut`: Fade a sprite out.
/// [Y] `pulse`: Make a sprite fade in and out in a loop.
/// [N] `makeTween`: A low-level function to help construct complex tweens.
/// [Y] `scale`: Smoothly change the scale of a sprite.
/// [Y] `breathe`: A breathing effect that changes the sprite's scale in a continuous loop.
/// [Y] `strobe`: A psychedelic flashing scale effect.
/// [Y] `wobble`: Make a sprite wobble like a plate of jelly.
/// [Y] `removeTween`: A universal method for remove a tween from Ga's engine.
/// [Y] `followCurve`: Make a sprite follow a bezier curve that you can specify.
/// [N] `followPath`: Make a sprite follow a path of connected waypoints.
/// [Y] `walkCurve`: Make a sprite follow a path of connected curves.
/// [Y] `walkPath`: Make a sprite follow a path.
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Make a sprite slide from one x/y position to another.
 * Use `slide` like this:
 *
 *  var spriteSlide = g.slide(sprite, 400, 0, 60, "smoothstep", true, 0);
 *
 */
slide( sprite:DisplayableObject,
    endX:number,
    endY:number,
    frames?:number,
    type?:EasingType,
    yoyo?:boolean,
    delayBeforeRepeat?:number ):Tween;

/**
 * Fade a sprite in, over a duration in frames.
 */
fadeIn(sprite:DisplayableObject, frames?:number):Tween;


/**
 * Fade a sprite out, over a duration in frames.
 */
fadeOut(sprite:DisplayableObject, frames?:number):Tween;

/**
 * Fades the sprite in and out at a steady rate over a duration in frames.
 * Set the `minAlpha` to something greater than 0 if you don't want the sprite to fade away completely.
 */
pulse(sprite:DisplayableObject, frames?:number, minAlpha?:number):Tween;

/**
 * smoothly change a sprite's scale.
 * Use it like this:
 *
 * var spriteScale = g.scale(sprite, finalScaleX, finalScaleY, frames);
 *
 */

scale(sprite:DisplayableObject,
    endScaleX:number,
    endScaleY:number,
    frames?:number ):Tween;


/**
 * Make a sprite appear to breathe, by changing its scale in a continuous loop.
 * Use it like this:
 *
 *   var spriteBreathe = g.breathe(sprite, 1.2, 1.2, 60, true, 300);
 *
 */
breathe( sprite:DisplayableObject,
            endScaleX:number,
            endScaleY:number,
            frames?:number,
            yoyo?:boolean,
            delayBeforeRepeat?:number ):Tween;
/**
 * A rapid looping scale effect.
 * Use it like this:
 *
 *      var spriteStrobe = g.strobe(sprite, 1.3, 10, 20, 10);
 *
 */
strobe( sprite:DisplayableObject,
        scaleFactor?:number,
        startMagnitude?:number,
        endMagnitude?:number,
        frames?:number,
        yoyo?:boolean,
        delayBeforeRepeat?:number
      ):Tween;

/**
 * Make a sprite wobble like a plate of jelly.
 * Use it like this:
 *
 *      var spriteWobble = g.wobble(sprite, 1.2, 1.2);
 *
 */
wobble( sprite:DisplayableObject,
        scaleFactorX?:number,
        scaleFactorY?:number,
        frames?:number,
        xStartMagnitude?:number,
        xEndMagnitude?:number,
        yStartMagnitude?:number,
        yEndMagnitude?:number,
        friction?:number,
        yoyo?:boolean,
        delayBeforeRepeat?:number
      ):Tween

/**
 * A utility to remove tweens from the game
 */
removeTween(tweenObject:Tween):void;

/**
 *
 */
followCurve( sprite:DisplayableObject,
                pointsArray:[Coordinate],
                totalFrames:number,
                type?:EasingType,
                yoyo?:boolean,
                delayBeforeRepeat?:number
  ):Tween;

/**
 *
 *
 * @param sprite
 * @param pathArray 2D array of Bezier curves
 * @param totalFrames The duration, in frames
 * @param type The easing type
 * @param loop Should the animation loop?
 * @param yoyo Should the direction reverse?
 * @param delayBeforeContinue Delay, in milliseconds, between sections
 *
 */
walkCurve(
    sprite:DisplayableObject,
    pathArray:Array<[[number]]>,
    totalFrames:number,
    type:EasingType,
    loop:boolean,
    yoyo:boolean,
    delayBeforeContinue:number
  ):Path;

/**
 *
 * @param sprite
 * @param originalPathArray A 2D array of waypoints
 * @param totalFrames The duration, in frames
 * @param type The easing type
 * @param loop Should the animation loop?
 * @param yoyo Should the direction reverse?
 * @param delayBeforeContinue Delay, in milliseconds, between sections
 */
walkPath(
    sprite:DisplayableObject,
    originalPathArray:Array<[number]>,
    totalFrames:number,
    type:EasingType,
    loop:boolean,
    yoyo:boolean,
    delayBeforeContinue:number
  ):Path;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// SPRITE CREATION
///
/// [Y] `shoot`: A function for making sprites shoot bullets.
/// [Y] `grid`: Easily plot a grid of sprites. Returns a container full of sprite `children`.
/// [Y] `progressBar`: A loading progress bar you can use to display while game assets are loading.`
/// [Y] `particleEffect`: A versatile function for creating particles.
/// [Y] `emitter`: A particle emitter for creating a constant stream of particles.
/// [Y] `tilingSprite`: An easy way to create a seamless scrolling background effect.
/// [N] `burst`: DEPRICATED. A particle explosion effect.
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * A function for making sprites shoot bullets.
 */
shoot<T extends DisplayableObject>(
    shooter:DisplayableObject,
    angle:number,
    offsetFromCenter:number,
    bulletSpeed:number,
    bulletArray:DisplayableObject[],
    bulletSprite:()=>DisplayableObject):T;

/**
 * Create the grid of pegs using the `grid` function.
 * `grid` returns a `group` sprite object that contains a sprite for every cell in the grid.
 *  You can define the rows and columns in the grid, whether or not the sprites should be centered inside each cell, or what their offset from the top left corner of each cell should be.
 * Supply a function that returns the sprite that you want to make for each cell.
 * You can supply an optional final function that runs any extra code after each sprite has been created.
 * Here's the format for creating a grid:
 *
 *      gridGroup = grid(
 *          //Set the grid's properties
 *          columns, rows,
 *          cellWidth, cellHeight,
 *          areSpirtesCentered?,
 *          xOffset, yOffset,
 *          //A function that returns a sprite
 *          function() {return g.circle(16, "blue");},
 *          //An optional final function that runs some extra code
 *          function() {console.log("extra!");}
 *      );
 *
*/
grid<A extends DisplayableObject, T extends Group>( columns?:number,
    rows?:number,
    cellWidth?:number,
    cellHeight?:number,
    centerCell?:boolean,
    xOffset?:number,
    yOffset?:number,
    makeSprite?:()=>A,
    extra?:()=>void
  ):T;

/**
 * Use the `progressBar` to display the percentage of assetes being loaded.
 * To use it, first make sure you define a `load` state when you intialize Ga.
 * Here's an example of a Ga instance that's intialized with 5 assets. The last argument, `load`, tells Ga that it should apply the `load` state as soon as Ga starts.
 *
 *      var g = ga(
 *        512, 512, setup,
 *        [
 *          "images/blixyiiUI.png",
 *          "images/blixyiiTileset.png",
 *          "fonts/puzzler.otf",
 *          "sounds/music.wav",
 *          "sounds/bounce.wav"
 *        ],
 *        load
 *      );
 *      g.start();
 *
 * Next, create a `load` function. It will run in a loop while the assets are loading and before the `setup` state is run.
 * Here's how to create and update the progress bar in the load state
 *
 *
 *      function load() {
 *       g.progressBar.create(g.canvas, g.assets);
 *        g.progressBar.update();
 *      }
 *
 * When the assets have finished loading the `setup` state will automatically be run.
 * Remove the progress bar in the `setup` function state like this:
 *
 *
 *      function setup() {
 *        g.progressBar.remove();
 *        //...
 *      }
 *
 * This is just a basic example of a progress bar to help you get started.
 * You can use the same format to create your own custom preloading animation.
 *
 */
progressBar:ProgressBar;


/**
 * Create particles with a versatile function called function called `particleEffect`.
 * It's all you'll need for most 2D action games.
 * Here's an example of how to use it to produce a starburst effect at the pointer's x and y position.
 *
 *
 *      g.particleEffect(
 *        g.pointer.x,                             //The particle’s starting x position
 *        g.pointer.y,                             //The particle’s starting y position
 *        function(){                              //Particle function
 *          return g.sprite("images/star.png");
 *        },
 *        20,                                      //Number of particles
 *        0.1,                                     //Gravity
 *        true,                                    //Random spacing
 *        0, 6.28,                                 //Min/max angle
 *        12, 24,                                  //Min/max size
 *        1, 2,                                    //Min/max speed
 *        0.005, 0.01,                             //Min/max scale speed
 *        0.005, 0.01,                             //Min/max alpha speed
 *        0.05, 0.1                                //Min/max rotation speed
 *      );
 *
 * You can see that most of those arguments describe range between the minimum and maximum values that should be used to change the sprites’ speed, rotation, scale and alpha.
 * You can also assign the number of particles that should be created, and add optional gravity.
 *
 * You can make particles using any sprites by customizing the third argument.
 * Just supply a function that returns the kind of sprite you want to use for each particle:
 *
 *      function(){
 *        return g.sprite("images/star.png");
 *      },
 *
 * If you supply a sprite that has multiple frames, the particleEffect function will automatically choose a random frame for each particle.
 *
 * The minimum and maximum angle values are important for defining the circular spread of particles as they radiate out from the origin point.
 * For a completely circular explosion effect, use a minimum angle of 0, and a maximum angle for 6.28.
 *
 *      0, 6.28
 *
 * (These numbers values are radians; the equivalent in degrees is 0 and 360.)
 * 0 starts at the 3 o’clock position, pointing directly to the right.
 * 3.14 is the 9 o’clock position, and 6.28 takes you around back to 0 again.
 *
 * If you want to constrain the particles to a narrower angle range, just supply the minimum and maximum values that describe that range.
 * Here are values you could use to constrain the angle to a pizza-slice with the crust pointing left.
 *
 *      2.4, 3.6
 *
 * You could use a constrained angle range like this to create a particle stream, like a fountain or rocket engine flames.
 * By carefully choosing the sprite for the particle and finely adjusting each parameter, you can use this all-purpose `particleEffect` function to simulate everything from liquid to fire.
 *
 *
 */
particleEffect (
    x?:number,
    y?:number,
    spriteFunction?:()=>DisplayableObject,
    numberOfParticles?:number,
    gravity?:number,
    randomSpacing?:boolean,
    minAngle?:number,
    maxAngle?:number,
    minSize?:number,
    maxSize?:number,
    minSpeed?:number,
    maxSpeed?:number,
    minScaleSpeed?:number,
    maxScaleSpeed?:number,
    minAlphaSpeed?:number,
    maxAlphaSpeed?:number,
    minRotationSpeed?:number,
    maxRotationSpeed?:number
  ):Particle;


/**
 * Use the `emitter` function to create a constant stream of particles at fixed intervals.
 * The emitter is a simple timer that calls the `particleEffect` function repeatedly at intervals in milliseconds that you define.
 * Use the emitter's `play` and `stop` methods to start and stop the particle stream.
 * Here's how to use it to create particle emitter that emits star sprites a 100ms intervals when the pointer is pressed:
 *
 *       //Create the emitter
 *       var particleStream = g.emitter(
 *         100,                                           //The interval
 *         function(){
 *           return g.particleEffect(                     //The particle function
 *             g.pointer.x,                               //x position
 *             g.pointer.y,                               //y position
 *             function(){                                //Particle sprite
 *               return g.sprite("images/star.png");
 *             },
 *             10,                                        //Number of particles
 *             0.1,                                       //Gravity
 *             false,                                     //Random spacing
 *             3.14, 6.28,                                //Min/max angle
 *             16, 32,                                    //Min/max size
 *             2, 5                                       //Min/max speed
 *           );
 *         }
 *       );
 *
 *       //Play the particle stream when the pointer is pressed
 *       g.pointer.press = function(){
 *         particleStream.play();
 *         console.log(particleStream.playing)
 *       };
 *
 *       //Stop the particle stream when the pointer is released
 *       g.pointer.release = function(){
 *         particleStream.stop();
 *         console.log(particleStream.playing)
 *       };
 *
 */
emitter(interval:number, particleFunction:()=>Particle):ParticleStream;


/**
 * Use a `tilingSprite` to create a seamless scrolling effect.
 * You could use it to create an infinite scrolling background.
 * Scroll the sprite's tile pattern using `tileX` and `tileY` properties.
 *
 * For example, you could create a tiling sprite like this:
 *
 *       box = g.tilingSprite(128, 128, "images/tile.png");
 *
 * Then in the game loop, scroll the x and y background position like this:
 *
 *       box.tileY += 1;
 *       box.tileX += 1;
 *
 * The position of the box won't change, but the position of the image that it contains will.
 *
 */
tilingSprite( width:number, height:number, source:string, x?:number, y?:number ):TilingSprite;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// BOUNDARY COLLISIONS
///
/// [Y] `outsideBounds`: Tells you if a sprite has exceeded the boundary of another sprite or container.
/// [Y] `contain`: Contains a sprite inside another sprite. Optional bounce if the sprite hits the edges.
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
outsideBounds(s:DisplayableObject, bounds:Bounds, onCollision?:(collision:Collision)=>void):Collision;

/**
 *
 */
contain(s:DisplayableObject, bounds:Bounds, bounce?:boolean, onCollision?:(collision:Collision)=> void ):Collision;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// SHAPE COLLISIONS
///
/// [Y] `hitTestPoint`: Returns `true` or `false` if an x/y point is intersecting a rectangle or circle.
/// [Y] `hitTestCircle`: Returns `true` if any two circular sprites overlap.
/// [Y] `hitTestRectangle`: Returns `true` if any two rectangular sprites overlap.
/// [Y] `hitTestCircleRectangle`: Returns `true` if rectangular and circular sprites overlap.
/// [Y] `hitTestCirclePoint`: Returns `true` if a point intersects a circle.
/// [Y] `rectangleCollision`: Prevents two colliding rectangles from overlapping and tells you the collision side
/// [Y] `circleCollision`: Makes a moving circle bounce away from a stationary circle.
/// [Y] `movingCircleCollision`: Makes two moving circles bounce apart.
/// [Y] `multipleCircleCollision`: Bounce apart any two circles that are in the same array.
/// [N] `bounceOffSurface`: A helper method that's use internally by these collision functions.
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** 
 * 
 *   An universal collision method that works for rectangular and circular sprites.
 *   it figures out what kinds of sprites are involved in the collision and
 *   automatically chooses the correct collision method.
 */

hit(a:DisplayableObject|Pointer, 
    b:DisplayableObject|DisplayableObject[], 
    react?:boolean, 
    bounce?:boolean, 
    global?:boolean, 
    extra?:(collision:GA.Collision, where:DisplayableObject) => void):Collision;

/**
 * Use it to find out if a point is touching a circular or rectangular sprite.
 *
 * If the sprite has a `radius` property, the function will interpret the shape as a circle.
 *
 * @param point An object with `x` and `y` properties.
 * @param sprite A sprite object with `x`, `y`, `centerX` and `centerY` properties.
*/
hitTestPoint(point:Coordinate, sprite:DisplayableObject):boolean;

/**
 * Use it to find out if two circular sprites are touching.
 *
 * @param c1 A sprite object with `centerX`, `centerY` and `radius` properties.
 * @param c2 A sprite object with `centerX`, `centerY` and `radius`.
 */
hitTestCircle(c1:Circle, c2:Circle, global?:boolean):boolean;

/**
 * Use it to find out if two rectangular sprites are touching.
 *
 * @param r1 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
 * @param r2 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
 */
hitTestRectangle(r1:DisplayableObject, r2:DisplayableObject, global?:boolean ):boolean;

/**
 * Use it to find out if a circular shape is touching a rectangular shape
 *
 * @param c1 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
 * @param c2 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
 */
hitTestCircleRectangle(c1:Circle, r1:Rectangle, global?:boolean):Hitting|boolean;

/**
 * Use it to find out if a circular shape is touching a point
 *
 * @param c1 A sprite object with `centerX`, `centerY`, and `radius` properties.
 * @param point A point object with `x` and `y` properties.
 *
 */
hitTestCirclePoint(c1:Circle, point:Coordinate,  global?:boolean):boolean;

/**
 * Use it to prevent two rectangular sprites from overlapping.
 * Optionally, make the first retangle bounceoff the second rectangle.
 * @param r1 A sprite object with `x`, `y` `center.x`, `center.y`, `halfWidth` and `halfHeight` properties.
 * @param r2 A sprite object with `x`, `y` `center.x`, `center.y`, `halfWidth` and `halfHeight` properties.
 * @param bounce  true or false to indicate whether or not the first sprite should bounce off the second sprite.
 */
rectangleCollision(r1:Rectangle, r2:Rectangle, bounce?:boolean, global?:boolean):Collision;

/**
 * Use this function to prevent a moving circular sprite from overlapping and optionally bouncing off a non-moving circular sprite.
 * The sprites can contain an optional mass property that should be greater than 1.
 *
 * @param c1 A sprite object with `x`, `y` `centerX`, `centerY` and `radius` properties.
 * @param c2 A sprite object with `x`, `y` `centerX`, `centerY` and `radius` properties.
 * @param bounce `true` or `false` to indicate whether or not the first sprite
 * @param global `true` or `false` to indicate whether or not local or global sprite positions should be used.
 *
 */
circleCollision(c1:Circle, c2:Circle, bounce?:boolean, global?:boolean):boolean;

/**
 * Use it to make two moving circles bounce off each other.
 * The sprites can contain an optional mass property that should be greater than 1.
 *
 * @param c1 A sprite object with `x`, `y` `centerX`, `centerY` and `radius` properties.
 * @param c2 A sprite object with `x`, `y` `centerX`, `centerY` and `radius` properties.
 *
 */
movingCircleCollision(c1:Circle, c2:Circle, global?:boolean):boolean;

/**
 * Checks all the circles in an array for a collision against all the other circles in an array, using `movingCircleCollision`
 */
multipleCircleCollision<T extends Circle>( arrayOfCircles:Array<T>,  global?:boolean):void;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// 2D TILE-BASED COLLISIONS
///
///
/// [Y] `getIndex`: Converts a sprite's x/y pixel coordinates into an array index number.
/// [Y] `getTile`: Converts a sprite's index number into x/y pixel coordinates.
/// [Y] `surroundingCells`: returns an array of 9 index numbers of cells surrounding a center cell.
/// [Y] `getPoints`: returns an object with the x/y positions of all the sprite's corner points.
/// [Y] `hitTestTile`: A versatile collision detection function for tile based games.
/// [Y] `updateMap`: Returns a new map array with the new index positions of sprites.
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * converts a sprite's x and y position to an array index number.
 * @return a single index value that tells you the map array index number that the sprite is in
 */
getIndex(x:number, y:number, tilewidth:number, tileheight:number, mapWidthInTiles:number):number

/**
 * converts a tile's index number into x/y screen coordinates, and capture's the tile's grid index (`gid`) number.
 *
 * It returns an object with `x`, `y`, `centerX`, `centerY`, `width`, `height`, `halfWidth`, `halffHeight` and `gid` properties.
 * (The `gid` number is the value that the tile has in the mapArray)
 * This lets you use the returned object with the 2d geometric collision functions like `hitTestRectangle` or `rectangleCollision`
 * The `world` object requires these properties: `x`, `y`, `tilewidth`, `tileheight` and `widthInTiles`
 */
getTile(index:number, mapArray:[number], world:TiledWorld):TiledSprite

/**
 * returns an array containing 9 index numbers of map array cells around any given index number.
 *  Use it for an efficient broadphase/narrowphase collision test.
 * The 2 arguments are the index number that represents the center cell, and the width of the map array.
 */
surroundingCells(index:number, widthInTiles:number):SurroundingCells;

/**
 * takes a sprite and returns an object that tells you what all its corner points are.
 * If the sprite has a `collisionArea` property that defines a smaller rectangular area inside the sprite, that collision area will be used istead of the sprite's dimensions.
 * Here's How you could define a `collsionArea` on a sprite:
 *
 *      elf.collisionArea = {x: 22, y: 44, width: 20, height: 20};
 *
 */
getPoints(s:DisplayableObject):CornerPoints

/**
 * checks for a collision between a sprite and a tile in any map array that you specify.
 * It returns a `collision` object.
 * `collision.hit` is a Boolean that tells you if a sprite is colliding with the tile that you're checking.
 * `collision.index` tells you the map array's index number of the colliding sprite. You can check for a collision with the tile against "every" corner point on the sprite, "some" corner points, or the sprite's "center" point.
 *
 * @param sprite
 * @param mapArray array
 * @param gidToCheck collisionTileGridIdNumber
 * @param worldObject object has to have these properties: `tileheight`, `tilewidth`, `widthInTiles`
 * @param spritesPointsToCheck
 */
hitTestTile<T extends DisplayableObject>(
        sprite:T,
        mapArray:[number],
        gidToCheck:number,
        world:TiledWorld,
        pointsToCheck?: "center" | "every" | "some"
    ):{ hit:boolean, index:number}


/**
 * takes a map array and adds a sprite's grid index number (`gid`) to it.
 * It finds the sprite's new index position, and retuns the new map array.
 * You can use it to do very efficient collision detection in tile based game worlds.
 *
 * Here's an example of how you could use `updateMap` in your game code like this:
 *
 *       blockLayer.data = g.updateMap(blockLayer.data, blockLayer.children, world);
 *
 *  The `blockLayer.data` array would now contain the new index position numbers of all the
 *  child sprites on that layer.
 *
 * @param mapArray array
 * @param spritesToUpdate singleSpriteOrArrayOfSprites The sprite objects have to have have these properties: `centerX`, `centerY`, `index`, `gid` (The number in the array that represpents the sprite)
 * @param world The `world` object  has to have these properties: `tileheight`, `tilewidth`, `widthInTiles`.

 */
updateMap(
        mapArray:[number],
        spritesToUpdate:DisplayableObject|[DisplayableObject],
        world:TiledWorld
    ):[number];


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// SPRITE CONTROLLERS
///
///
/// [N] `fourKeyController`: Assign keyboard keys to make a sprite move at a fixed speed in 4 directions
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

fourKeyController(s:DisplayableObject, speed:number, up:number, right:number, down:number, left:number):void


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// TILED EDITOR IMPORTER
///
///
/// [N] `makeTiledWorld`: Creates a game world using Tiled Editor's JSON data.
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Ga lets you import JSON files created by the popular Tiled Editor game map and level editor.
 *
 * www.mapeditor.org
 *
 * Two functions called `makeTiledWorld` and `makeIsoTiledWorld` (for isometric maps, coming soon!) use this data to automatically build your game world for you.
 *
 * To prepare your Tiled Editor game world for use in Ga, give any significant thing a `name` property.
 * Anything with a `name` property in Tiled Editor can be accessed in your code by its string name.
 * Tiled Editor layers have a `name` property by default, and you can assign custom `name` properties to tiles and objects. Not everything needs a `name` property, just things that you want to specifically access in the world after its created.
 */
makeTiledWorld(tiledMap:string, tileset:string):TiledWorld;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// FULLSCREEN
///
///
/// [Y] `requestFullscreen`: Used by `enableFullscreen` to launch fullscreen mode.
/// [Y] `exitFullscreen`: used by `enableFullscreen` to exit fullsrcreen mode.
/// [N] `alignFullscreen`: Used by `enableFullscreen` to scale and center the canvas in fullscreen mode.
/// [N] `enableFullscreen`: Enables fullscreen mode when the user clicks or touches the canvas.
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * `requestFullscreen` is used by `enableFullscreen` to launch fullscreen mode.
 */
requestFullScreen():void;

/**
 *  `exitFullscreen` is used by `enableFullscreen` to exit fullscreen mode.
 */
exitFullScreen():void;

/**
 * `alignFullscreen` is called by `enableFullscreen` to center and align the canvas vertically or horizontally inside the users screen.
 *  It also sets `ga.fullscreenScale` that Ga's `update` loop uses to changed the values of `ga.scale` and `ga.pointer.scale` when fullscreen mode is entered or exited.
 */
alignFullscreen():void;

/**
 * Use `enterFullscreen` to make the browser display the game full screen.
 * It automatically centers the game canvas for the best fit.
 * Optionally supply any number of ascii keycodes as arguments to represent the keyboard keys that should exit fullscreen mode.
 */
enableFullscreen( ...exitKeyCodes: number[] ):void;

/**
 *
 */
launchFullscreen(sprite:DisplayableObject):void;

/**
 * This next function checks to see if the game is in full screen mode.
 * If it is, the game's scale is set to `fullscreen.scale`.
 * If not, and the canvas hasn't already been scaled, the scale reverts back to 1.
 */
scaleFullscreen():void;




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// SOUND
///
///
/// [Y] `ga.actx`: The audio context.
/// [N] `makeSound`: a method for loading and controling sound files.
/// [Y] `sound`: a method that returns a sound file object.
/// [N] `soundEffect`: a versatile method for generating sound effects from pure code.
/// [N] `impulseResponse`: A helper method for adding reverb to sounds.
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * An audio context
 */
actx:AudioContext;

/**
 * is the function you want to use to load and play sound files.
 * It creates and returns and WebAudio sound object with lots of useful methods you can use to control the sound.
 *
 * You can use it to load a sound like this:
 *
 *      var anySound = makeSound("sounds/anySound.mp3", loadHandler);
 *
 * The code above will load the sound and then call the `loadHandler` when the sound has finished loading.
 * (However, it's more convenient to load the sound file by pre-loading it in Ga's assets array, so I don't recommend loading sounds like this unless you need more low-level control.)
 *
 * After the sound has been loaded you can access and use it like this:
 *
 *       function loadHandler() {
 *         anySound.loop = true;
 *         anySound.pan = 0.8;
 *         anySound.volume = 0.5;
 *         anySound.play();
 *         anySound.pause();
 *         anySound.playFrom(second);
 *         anySound.restart();
 *         anySound.setReverb(2, 2, false);
 *         anySound.setEcho(0.2, 0.2, 0);
 *         anySound.playbackRate = 0.5;
 *         anySound.fadeOut(timeInSeconds);
 *         anySound.fadeIn(timeInSeconds);
 *         anySound.fade(targetVolume, timeInSeconds);
      }

 */
makeSound(source:string, loadHandler:()=>void):Sound;

/**
 * A convenience method that lets you access loaded sounds by their file names.
 */
sound(asset:string):Sound;

/*
 *   The `soundEffect` function lets you generate your sounds and musical notes from scratch
 *   (Reverb effect requires the `impulseResponse` function that you'll see further ahead in this file)
 * 
 *   To create a custom sound effect, define all the parameters that characterize your sound. Here's how to
 *   create a laser shooting sound:
 * 
 *       soundEffect(
 *         1046.5,           //frequency
 *         0,                //attack
 *         0.3,              //decay
 *         "sawtooth",       //waveform
 *         1,                //Volume
 *         -0.8,             //pan
 *         0,                //wait before playing
 *         1200,             //pitch bend amount
 *         false,            //reverse bend
 *         0,                //random pitch range
 *         25,               //dissonance
 *         [0.2, 0.2, 2000], //echo: [delay, feedback, filter]
 *         undefined         //reverb: [duration, decay, reverse?]
 *       );
 * 
 *   Experiment by changing these parameters to see what kinds of effects you can create, and build
 *   your own library of custom sound effects for games.
 * 
 * @param frequencyValue   The sound's fequency pitch in Hertz
 * @param attack           The time, in seconds, to fade the sound in
 * @param decay            The time, in seconds, to fade the sound out
 * @param type             waveform type: "sine", "triangle", "square", "sawtooth"
 * @param volumeValue      The sound's maximum volume
 * @param panValue         The speaker pan. left: -1, middle: 0, right: 1
 * @param wait             The time, in seconds, to wait before playing the sound
 * @param pitchBendAmount  The number of Hz in which to bend the sound's pitch down
 * @param reverse          is true the pitch will bend up
 * @param randomValue      A range, in Hz, within which to randomize the pitch
 * @param dissonance       A value in Hz. It creates 2 dissonant frequencies above and below the target pitch
 * @param echo             An array: [delayTimeInSeconds, feedbackTimeInSeconds, filterValueInHz]
 * @param reverb           An array: [durationInSeconds, decayRateInSeconds, reverse]
 * 
 */
soundEffect(
    frequencyValue?:number,
    attack?:number,
    decay?:number,
    type?:"sine"|"triangle"|"square"|"sawtooth",
    volumeValue?:number,
    panValue?:number,
    wait?:number,
    pitchBendAmount?:number,
    reverse?:boolean,
    randomValue?:number,
    dissonance?:number,
    echo?:[number,number,number],
    reverb?:[number,number,number]
  ):void;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// UTILITIES 2
///
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Use it to find out if two rectangular sprites are touching.
 *
 * @param r1 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
 * @param r2 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
 */
hitTestRectangle(r1:Rectangle, r2:Rectangle, global?:boolean):boolean;

/**
 * Use it to bounce a circular sprite off a point.
 *
 * @param c1 A sprite object with `centerX`, `centerY`, and `radius` properties.
 * @param point A point object with `x` and `y` properties.
 */
circlePointCollision(c1:Circle, point:Coordinate, bounce?:boolean, global?:boolean):boolean;

/**
 * Use it to bounce a circular shape off a rectangular shape
 *
 * @param c1 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
 * @param r1 A sprite object with `centerX`, `centerY`, `halfWidth` and `halfHeight` properties.
 */
circleRectangleCollision(c1:Circle, r1:Rectangle, bounce?:boolean, global?:boolean):Collision|boolean



}

} // end namespace GA
