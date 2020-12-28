var topPipe,bottomPipe;

function preload(){
  bg=loadImage("images/bg.png");
  birdImg=loadImage("images/bird.png");
  pipeUp=loadImage("images/pipeNorth.png");
  pipeDown=loadImage("images/pipeSouth.png");
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

  console.log(displayHeight);

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

  drawSprites();
}
function spawnObstacles(){
  if(frameCount%60==0){
  var topPipe=createSprite(displayWidth-20,0,300,100);
  var topRand=random(100,200);
  topPipe.y=topRand;
 // console.log(topPipe.height);
  //  topPipe.height=400;
  topPipe.velocityX=-2;
  
  topPipe.addImage(pipeUp);
    
  var bottomPipe=createSprite(displayWidth-20,displayHeight-20,300,100);
  bottomPipe.addImage(pipeDown);
  //var bottomRand=Math.round(random)
bottomPipe.velocityX=-2;
}

}