
declare namespace GA {

type Coordinate = { x:number, y:number };

type Bounds = { x:number, y:number, width:number, height:number };

/**
 *
 */
interface KeyHandler {

    readonly code:number;
    readonly isDown:boolean;
    readonly isUp:boolean;
    press:() => void;
    release:() => void;
}

/**
 *
 */
interface DisplayableObject  {
    x:number;
    y:number;

    //Velocity.
    vx:number;
    vy:number;

    scaleX:number;
    scaleY:number;
    
    pivotX:number;
    pivotY:number;

    width:number;
    height:number;

    visible:boolean;
    interactive:boolean;
    rotation:number;
    alpha:number;
    parent:DisplayableObject;

    layer:number;

    draggable:boolean;
    
    readonly gx:number;
    readonly gy:number;
    readonly halfWidth:number;
    readonly halfHeight:number;
    readonly position:Coordinate;
    readonly centerX:number;
    readonly centerY:number;
    readonly localBounds:Bounds;
    readonly globalBounds:Bounds;

    setPosition( x:number, y:number):void;

    putCenter(o:DisplayableObject, xOffset?:number, yOffset?:number):void;

    putTop(o:DisplayableObject, xOffset?:number, yOffset?:number):void;

    putRight(o:DisplayableObject, xOffset?:number, yOffset?:number):void;

    putBottom(o:DisplayableObject, xOffset?:number, yOffset?:number):void;

    putLeft(o:DisplayableObject, xOffset?:number, yOffset?:number):void;

    /**
     * figures out if the pointer is touching a sprite.
     */
    hitTestSprite(sprite:DisplayableObject):boolean;

    // Children

    children:DisplayableObject[];

    addChild<T extends DisplayableObject>(sprite:T):void;
    removeChild<T extends DisplayableObject>(sprite:T):void;

    add<T extends DisplayableObject>(...sprites: T[]):void;
    remove<T extends DisplayableObject>(...sprites: T[]):void;

    readonly empty:boolean;

    // Sahdow
    shadow:boolean;
    shadowColor:string; // = "rgba(100, 100, 100, 0.5)";
    shadowOffsetX:number;
    shadowOffsetY:number;
    shadowBlur:number;

    // Collison Area
    collisionArea?:Bounds

    // Allow extension
    //[key: string]: any

}

/**
 * Generic Group
 */
type Group = DisplayableObject;


interface InteractiveFeature  {
  interactive:boolean;

  /**
   * The `press` and `release` methods. They're `undefined`
   * for now, but they'll be defined in the game program.
   */
  press:()=>void;
  release:()=>void;
  over:()=>void;
  out:()=>void;
  tap:()=>void;

  /**
   * The `state` property tells you button's
   * current state. Set its initial state to "up".
   */
  state: "up"|"down"|"over";

  /**
   * The `action` property tells you whether its being pressed or
   * released.
   */
  action:()=>void;

  /**
   * `pressed` is a Boolean that helps track whether or not
   * the button has been pressed down.
   */
  pressed:boolean;

  /**
   * `enabled` is a Boolean which, if false, deactivates the button.
   */
  enabled:boolean;

  /**
   * `hoverOver` is a Boolean which checkes whether the pointer
   * has hovered over the button.
  */
  hoverOver:boolean;

}

/**
 *
 */
interface Sprite extends InteractiveFeature,DisplayableObject {

    circular:boolean;
    radius:number;
    diameter:number;

    fps:number;

    loop:boolean;
    playing:boolean;

    show(frameNumber:number):void;
    playSequence(sequenceArray:Array<number>):void;
    play():void;
    stop():void;


}


interface Line extends DisplayableObject {
    ax:number;
    ay:number;
    bx:number;
    by:number;
    lineWidth:number;

    strokeStyle:string;

    /**
     * The `lineJoin` style.
     * Options are "round", "mitre" and "bevel".
     */
    lineJoin:"round" | "mitre" | "bevel";

}

interface Text extends DisplayableObject {
    content:string;
}

interface Rectangle extends Sprite {
    mask:boolean;

    fillStyle:string;
    strokeStyle:string;
    /**
     * sprite to set the point around which the sprite should rotate.
     * 0.5 is the default center point. Assign any percentage between
     * 0.01 and 0.99 to shift the center of rotation.
     *
     */
    //rotate:number;
}

interface Circle extends Sprite {

    mask:boolean;

    fillStyle:string;
    strokeStyle:string;
    diameter:number;
    radius:number;
}

interface Stage extends Sprite {
    
    swapChildren( child1:DisplayableObject, child2:DisplayableObject):void
}

/**
 *
 */
interface Assets extends Array<any> {
    whenLoaded:()=>void;
    loadHandler:()=>void;

    load(sources:Array<string>):void;
}

interface Pointer {
    readonly x:number;
    readonly y:number;
    readonly centerX:number;
    readonly centerY:number;
    readonly position:Coordinate;

    isDown:boolean;
    isUp:boolean;
    tapped:boolean;

    press:()=>void;
    release:()=>void;
    tap:()=>void;


}

interface Frame extends Bounds {
  image:string;
}

interface Frames extends Bounds {
    image:string;
    data:Array<[number,number]>;
    width:number;
    height:number;
}
  
/**
 *
 */
interface Engine {

    ( heightPx:number, widthPx:number, initialState:Function, assets?:Array<string>, load?:Function ):Engine;
    /**
     *
     */
    new( heightPx:number, widthPx:number, initialState:Function, assets?:Array<string>, load?:Function ):Engine;

    /**
     *
     */
    assets:Assets;

    /**
     *
     */
    canvas:HTMLCanvasElement;

    /**
     *  Custom key handler
     */
    keyboard( keyCode:number):KeyHandler;

    /**
     *  Default key handlers
     */
    key: {
        leftArrow:KeyHandler;
        upArrow:KeyHandler;
        rightArrow:KeyHandler;
        downArrow :KeyHandler;
        space:KeyHandler;
    };

    /*
     * The game's screen's scale.
     *
     */
    //scale:number;

    /**
     *
     */
    stage:Stage;

    /**
     * The frame rate will default to 60 fps is you don't set it
     */
    fps:number;

    /**
     * Optionally change the background color
     */
    backgroundColor:string;

    /**
     * An array that stores functions which should be run inside Ga's core `update` game loop.
     * Just push any function you write into this array, and ga will run it in a continuous loop.
     */
    updateFunctions:[ ()=> void ];

    /**
     *
     */
    pointer:Pointer;

    /**
     * Optionally hide the mouse pointer
     */
    hidePointer():void;

    /**
     *
     */
    showPointer():void;

    /**
     * set the game state
     */
    state:Function;

    /**
     *
     */
    start():void;

    /**
     *
     */
    pause():void;

    /**
     *
     */
    resume():void;

    /**
     * remove any sprite, or an argument list of sprites, from its parent.
     *
     */
    remove<T extends DisplayableObject>(spritesToRemove:T|T[]):void;

    /**
     * The `frame` method returns and object that defines
     * in the position and size of a sub-image in a tileset. Use it if you
     * want to create a sprite from a sub-image inside an Image object.
     * arguments: sourceString, xPostionOfSubImage, yPositionOfSubImage,
     * widthOfSubImage, heightOfSubImage.
     */
    frame(source:string, x:number, y:number, width:number, height:number):Frame;

    /** 
    * The `frames` function returns and object that defines
    * the position and size of many sub-images in a single tileset image.
    * arguments: sourceString, 2DArrayOfXandYPositions, widthOfSubImage,
    * heightOfSubImage.
    */
    frames(source:string, arrayOfPositions:Array<[number,number]>, width:number, height:number):Frames;

    /**
     * 
     * If you have a complex animation in a single image, you can use the
     * `filmstrip` method to automatically create an array of x,y
     * coordinates for each animation frame.
     * 
     * @param imageName 
     * @param frameWidth
     * @param frameHeight
     * @param spacing should be included if there's any default spacing (padding) around tileset images.
     */
    filmstrip(imageName:string, frameWidth:number, frameHeight:number, spacing?:number):Frames;
    
    /**
     *
     */
    rectangle<T extends Rectangle>( widthPx:number, heightPx:number, fillColor?:string, strokeColor?:string, lineWidth?:number, x?:number, y?:number ):T;

    /**
     *
     */
    circle<T extends Circle>( diameter:number, fillstyle?:string, stroketyle?:string, lineWidth?:number, x?:number, y?:number ):T;

    /**
     * `line` creates and returns a line with a start and end points.
     * arguments: lineColor, lineWidth, startX, startY, endX, endY.
     *
     */
    line<T extends Line>(strokeStyle?:string, lineWidth?:number, x?:number, y?:number, endX?:number, endY?:number):T;

    /**
     *
     * The font family name will be the same as the font's file name
     */
    text(content:string, font:string, fillstype:string, x?:number, y?:number):Text;

    /**
     *
     */
    group<T extends Group>(...sprites: DisplayableObject[]):T;

    /**
     *
     * creates and returns a sprite using:
     *  a JavaScript Image object,
     *  a tileset `frame`,
     *  a `filmstrip`,
     *  or a frame from a texture atlas (in standard Texture Packer format).
     *
     * @param source.
     */
    sprite<T extends Sprite>(source:Array<string>|string|Frame|Frames):T ;

    /**
     * An interactive button with `up` `over` and `down` states. Optional `press` and `release` actions.
     */
    button(source:Array<string>|string|Frame|Frames):Sprite ;

}

} // end namespace GA

declare var ga:GA.Engine;
