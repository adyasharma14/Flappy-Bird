var topPipe,bottomPipe;
var topPipeGroup,bottomPipeGroup;
var PLAY = 0;
var END = 1
var gameState = PLAY;

function preload(){
  bg=loadImage("images/bg.png");
  birdImg=loadImage("images/bird.png");
  pipeUp=loadImage("images/pipeNorth.png");
  pipeDown=loadImage("images/pipeSouth.png");
  resetImg=loadImage("images/restart.png");
  gameOverImg=loadImage("images/gameOver.png");
  wingSound=loadSound("images/wing.mp3");
  endSound=loadSound("images/hit.mp3");
}

function setup() {
  createCanvas(displayWidth-50,displayHeight-90);
  background(bg);

  

  //background=createSprite(displayWidth*2,displayHeight);
 // background.addImage(bg);
 // background.scale=4
 // background.x=background.width*3
 // background.velocityX=-4;

  bird=createSprite(displayWidth/2-100,displayHeight/2);
  bird.addImage(birdImg);

  restart=createSprite(displayWidth/2,displayHeight/2+45);
  restart.addImage("restart",resetImg);
  restart.visible=false;
  restart.scale=0.4
  gameOver=createSprite(displayWidth/2-250,displayHeight/2);
  gameOver.addImage("gameover",gameOverImg);
  gameOver.visible=false;

  ground=createSprite(displayWidth/2,displayHeight-100,10000,10);
  ground.visible=false;
  

 // console.log(displayHeight);
 topPipeGroup=new Group();
 bottomPipeGroup=new Group();



}



function draw() {
  background(bg); 
  
 //bg.velocityX=-3;
 if(gameState===PLAY){

  if(keyDown("space")){
    bird.velocityY=-10;
    wingSound.play();
  }
  bird.velocityY=bird.velocityY+1;

  if(background.x<0){
   background.x=background.width/2
  }
  spawnObstacles();
  

  if(topPipeGroup.isTouching(bird)|| bottomPipeGroup.isTouching(bird)||bird.isTouching(ground)){
    //console.log("gameOver");
    gameState=END;
    endSound.play();
  }
}

if(gameState===END){
  topPipeGroup.setVelocityXEach(0);
  bottomPipeGroup.setVelocityXEach(0);
  gameOver.visible=true;
  restart.visible=true;
  topPipeGroup.setLifetimeEach(-1);
  bottomPipeGroup.setLifetimeEach(-1);
  bird.velocityY=0;
  if(mousePressedOver(restart)) {
    reset();
  }
}

  drawSprites();
}
function spawnObstacles(){
  if(frameCount%200==0){
    var randomHeight=random(80,350);
   topPipe=createSprite(displayWidth-100,randomHeight-190);
  
 // topPip.y=topRand;
 // console.log(topPipe.height);
  //  topPipe.height=400;
  topPipe.velocityX=-2;
  
  topPipe.addImage(pipeUp);
    
  bottomPipe=createSprite(displayWidth-100,displayHeight-180+(randomHeight-190));
  bottomPipe.addImage(pipeDown);
  //var bottomRand=Math.round(random)
bottomPipe.velocityX=-2;

topPipe.lifetime=displayWidth/2;
bottomPipe.lifetime=displayWidth/2;

topPipeGroup.add(topPipe);
bottomPipeGroup.add(bottomPipe);
}

}
function reset(){
  gameState=PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
   topPipeGroup.destroyEach();
   bottomPipeGroup.destroyEach();
  
   bird.x=displayWidth/2-100;
   bird.y=displayHeight/2;
}
