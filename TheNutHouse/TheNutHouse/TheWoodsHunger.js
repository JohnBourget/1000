//initial variables
var canvas, stage, titleFeild;

//charactervebles
var wendigo;

//background goodies

var mid, mida, background, backgrounda, backing, backinga, front, fronta, ground, grounda, grounddebris, grounddebrisa;




//gameplay stuffs
//velocities
var xv = 0,
    yv = 0,
    speed = 10,
    jumpPower = -28,
    gravity = 4,
    friction = 0.70;

//booleans to keep track of keyboards
var moving = false,
    jumping = false,
    resting = true,
    leftDown = false,
    rightDown = false;

//use variables to set max/min speeds
var groundLevel = 610,
    leftLimit = 250,
    rightLimit = 550;



function init() {
    console.log("Initializing game...");

    //basic createjs setup
    canvas = document.getElementById("myGameCanvas");
    stage = new createjs.Stage(canvas);
    //load sounds
    //createjs.Sound.registerSound("sounds/.mp3");
    //addbackgrounds
    addBackgrounds();
    //pre-load wendigo
    addWendigo();
    //addForeground();
    addForegrounds();

    //pre-load dat goo ground sheeeeeettt

    //setup the "Ticker" (the game engine)
    createjs.Ticker.fps = 30;
    createjs.Ticker.addEventListener("tick", onTick);

    //set initial event listener
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
}

function addForegrounds() {
    //add ground
    console.log("The Woods Grow..")


    grounddebrisa = new createjs.Bitmap("images/GroundDebris.png");
    grounddebrisa.x = 0;
    grounddebrisa.y = -100;

    grounddebris = new createjs.Bitmap("images/GroundDebris.png");
    grounddebris.x = 0;
    grounddebris.y = -100;

    mid = new createjs.Bitmap("images/Mid.png");
    mid.x = 0;
    mid.y = -100;

    mida = new createjs.Bitmap("images/Mid.png");
    mida.x = 0;
    mida.y = -100;

    front = new createjs.Bitmap("images/Front.png");
    front.x = 0;
    front.y = 0;

    fronta = new createjs.Bitmap("images/Front.png");
    fronta.x = 0;
    fronta.y = 0;

    stage.addChild(grounddebrisa);
    stage.addChild(mid);
    stage.addChild(front);
    stage.addChild(grounddebris);
    stage.addChild(mida);
    stage.addChild(fronta);

    grounddebris.image.onload = function () {
        console.log("grounddebris loaded, getting width...");
        console.log("foreground width:" + grounddebris.image.width);
        //assign value to width with var
        grounddebrisWidth = grounddebris.image.width;
    }
    
    ground.image.onload = function () {
        console.log("grounddebris loaded, getting width...");
        console.log("ground width:" + ground.image.width);
        //assign value to width with var
        groundWidth = ground.image.width;
    }
    
    mid.image.onload = function () {
        console.log("mid loaded, getting width...");
        console.log("mid width:" + ground.image.width);
        //assign value to width with var
        midWidth = mid.image.width;
    }
    
    front.image.onload = function () {
        console.log("front loaded, getting width...");
        console.log("front width:" + front.image.width);
        //assign value to width with var
        frontWidth = front.image.width;
    }
    
    background.image.onload = function () {
        console.log("background loaded, getting width...");
        console.log("background width:" + background.image.width);
        //assign value to width with var
        backgroundWidth = background.image.width;
    }
    
    //1front/2mid/3grounddebris/4ground/5background
}
//setup functions and add wendigo
function addWendigo() {

    console.log("The Woods grow Quiet...");
    //load spritesheet
    //create new instance of character sprite sheet
    wendigo = new Wendigo3();
    wendigo.restWithHandTweek();
    //wendigo.runLoop();
    //wendigo.startRunning();
    //set an animation not to loop
    //Wendigo3._SpriteSheet.getAnimation("leap").next = false;
    wendigo.x = 250;
    wendigo.y = groundLevel;
    wendigo.scaleX = 0.5;
    wendigo.scaleY = 0.5;

    //add the beast
    stage.addChild(wendigo);


}
//addbackground
function addBackgrounds() {

    background = new createjs.Bitmap("images/BackGround.png");
    background.x = 0;
    background.y = 0;

    backgrounda = new createjs.Bitmap("images/BackGround.png");
    backgrounda.x = 0;
    backgrounda.y = 0;

    grounda = new createjs.Bitmap("images/Ground.png");
    grounda.x = 0;
    grounda.y = 540;

    ground = new createjs.Bitmap("images/Ground.png");
    ground.x = 0;
    ground.y = 540;

    stage.addChild(grounda);
    stage.addChild(background);
    stage.addChild(ground);
    stage.addChild(backgrounda);

}
//Game Engine
function onTick() {
    stage.update();

    //add physics parameters
    wendigo.x += xv;
    wendigo.y += yv;

    //apply grvaity
    yv += gravity

    //check ground and wall limits
    if (wendigo.x > rightLimit) {
        // the trick here is to just set back the limit
        wendigo.x = rightLimit;
    }
    if (wendigo.x < leftLimit) {
        // the trick here is to just set back the limit
        wendigo.x = leftLimit;
    }
    if (wendigo.y > groundLevel) {
        wendigo.y = groundLevel
        //update boooleans
        jumping = false
    }
    //Boolean conditions
    // ! measn "is not" so the below means if left down is true, and right down is not"
    //moving right
    if (leftDown && !rightDown) {
        //move left
        xv = -speed;
        wendigo.scaleX = -0.5;
        if (!moving && !jumping) {
            wendigo.startRunning();
            //dont forget to update booleans
            moving = true;
            resting = false;
        }
        //moving left
    } else if (rightDown && !leftDown) {
        xv = speed;
        wendigo.scaleX = 0.5;
        if (!moving && !jumping) {
            wendigo.startRunning();
            //play animation
            //dont forget to update booleans
            moving = true;
            resting = false;
        }
        //resting
    } else if (rightDown && leftDown || !rightDown && !leftDown) {

        xv *= friction;

        moving = false;
        if (!resting) {
            wendigo.restWithHandTweek();

            //update boolean
            resting = true
        }
    }
    // all background movements
    background.x -= xv * 0.90;
    ground.x -= xv;
    grounddebris.x -= xv * 1.01;
    front.x -= xv * 1.10
    mid.x -= xv * 1.05

//endless background code
    grounddebrisa.x = grounddebris.x + grounddebrisWidth - 2

if (grounddebrisa.x <= 0) {
        grounddebris.x = 0;
    }
    
    grounda.x = ground.x + groundWidth - 2

if (grounda.x <= 0) {
        ground.x = 0;
    }
    
    mida.x = mid.x + midWidth - 2

if (mida.x <= 0) {
        mid.x = 0;
    }
    
    fronta.x = front.x + frontWidth - 2

if (fronta.x <= 0) {
        front.x = 0;
    }
    
    backgrounda.x = background.x + backgroundWidth - 2

if (backgrounda.x <= 0) {
        background.x = 0;
    }

}

//event handler functions
function onKeyDown(eventObj) {
    console.log("key Down! keycode: " + eventObj.keyCode)

    //update booleans
    if (eventObj.keyCode == 65 || eventObj.keyCode == 37) {
        leftDown = true;
    } else if (eventObj.keyCode == 68 || eventObj.keyCode == 39) {
        rightDown = true;
    } else if (eventObj.keyCode == 87 || eventObj.keyCode == 38) {
        //if not already jumping
        if (!jumping) {
            //wendigo.leap();
            yv = jumpPower;
            resting = false;
            moving = false;
            jumping = true;
        }
    }

}

function onKeyUp(eventObj) {
    console.log("key Up! keycode: " + eventObj.keyCode)

    //update Booleans
    if (eventObj.keyCode == 65 || eventObj.keyCode == 37) {
        leftDown = false;
    } else if (eventObj.keyCode == 68 || eventObj.keyCode == 39) {
        rightDown = false
    } else if (eventObj.keyCode == 87 || eventObj.keyCode == 38) {
        upDown = false
    }
}
