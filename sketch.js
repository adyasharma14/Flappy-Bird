var topPipe,bottomPipe;
var topPipeGroup,bottomPipeGroup;
var PLAY = 0;
var END = 1
var gameState = PLAY;
var food,foodGroup;
var back;
var score=0;

function preload(){
  bg=loadImage("images/bg.png");
  birdImg=loadImage("images/bird.png");
  pipeUp=loadImage("images/pipeNorth.png");
  pipeDown=loadImage("images/pipeSouth.png");
  resetImg=loadImage("images/restart.png");
  gameOverImg=loadImage("images/gameOver.png");
  wingSound=loadSound("images/wing.mp3");
  endSound=loadSound("images/hit.mp3");
  foodImg=loadImage("images/food.png");
}

function setup() {
  createCanvas(displayWidth-50,displayHeight-90);
 // background(bg);

  

  back=createSprite(0,0,displayWidth*5,displayHeight);
  back.addImage(bg);
  back.scale=8
 // background.x=background.width*3
 back.velocityX=-4;

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
 foodGroup=new Group();


}



function draw() {
  //background(bg); 
  
 //bg.velocityX=-3;
 if(gameState===PLAY){
  back.velocityX=-4
  if(keyDown("space")){
    bird.velocityY=-10;
    wingSound.play();
  }
  bird.velocityY=bird.velocityY+1;

  if(back.x<0){
   back.x=back.width/2
  }
  spawnObstacles();

  if(foodGroup.isTouching(bird)){
    for(var k=0;k<foodGroup.length;k++){
      if(foodGroup[k].isTouching(bird)){
    score=score+5;
    foodGroup[k].destroy();
  }
}
}
  

  if(topPipeGroup.isTouching(bird)|| bottomPipeGroup.isTouching(bird)||bird.isTouching(ground)){
    //console.log("gameOver");
    gameState=END;
    endSound.play();
  }
}

if(gameState===END){
  topPipeGroup.setVelocityXEach(0);
  bottomPipeGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0)
  gameOver.visible=true;
  restart.visible=true;
  topPipeGroup.setLifetimeEach(-1);
  bottomPipeGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
  bird.velocityY=0;
  if(mousePressedOver(restart)) {
    reset();
    touches = [];  
  }
}
scoring();
  drawSprites();

  text("Score "+score,displayWidth-100,100)
}
function spawnObstacles(){
  if(frameCount%120===0){
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

if(Math.round(random(1,6))%2===0){
var food=createSprite(displayWidth-100,randomHeight+random(20,170));
food.addImage(foodImg);
food.scale=0.2;
food.velocityX=topPipe.velocityX;
foodGroup.add(food);}

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
   foodGroup.destroyEach();
  
   bird.x=displayWidth/2-100;
   bird.y=displayHeight/2;
}
function scoring(){
 for(var i=0;i<topPipeGroup.length;i++){
   if(bird.x-topPipeGroup[i].x<=6&&bird.x-topPipeGroup[i].x>4){
     score=score+1;
   }

 }
}
