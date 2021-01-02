var topPipe,bottomPipe;
var topPipeGroup,bottomPipeGroup;

function preload(){
  bg=loadImage("images/bg.png");
  birdImg=loadImage("images/bird.png");
  pipeUp=loadImage("images/pipeNorth.png");
  pipeDown=loadImage("images/pipeSouth.png");
  resetImg=loadImage("images/restart.png");
  gameOverImg=loadImage("images/gameOver.png");
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

  restart=createSprite(displayWidth/2,displayHeight/2);
  restart.addImage("restart",resetImg);
  restart.visible=false;
  gameOver=createSprite(displayWidth/2-250,displayHeight/2);
  gameOver.addImage("gameover",gameOverImg);
  gameOver.visible=false;
  

 // console.log(displayHeight);
 topPipeGroup=new Group();
 bottomPipeGroup=new Group();



}



function draw() {
  background(bg); 
  
 //bg.velocityX=-3;

  if(keyDown("space")){
    bird.velocityY=-5;
  }
  bird.velocityY=bird.velocityY+2;

  if(background.x<0){
   background.x=background.width/2
  }
  spawnObstacles();
  

  if(topPipeGroup.isTouching(bird)|| bottomPipeGroup.isTouching(bird)){
    //console.log("gameOver");
    reset();
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
  topPipeGroup.setVelocityXEach(0);
  bottomPipeGroup.setVelocityXEach(0);
  gameOver.visible=true;
  restart.visible=true;
  topPipeGroup.setLifetimeEach(-1);
  bottomPipeGroup.setLifetimeEach(-1);
  bird.velocityY=0;
}