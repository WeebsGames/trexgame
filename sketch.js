var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var restart; 
var restartimg;
var gameOver;
var gameOverimg;

var PLAY=1;
var END=0;
var gamestate=PLAY;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  gameOverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  gameOver=createSprite(300,100,1,1);
  gameOver.addImage(gameOverimg);
  gameOver.depth=cloudsGroup.depth-10;
  restart=createSprite(300,150,1,1);
  restart.addImage(restartimg);
  restart.depth=obstaclesGroup.depth-10;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  score = 0;
}

function draw() {
  background(180);
  if(gamestate==PLAY){
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,50);
  ground.velocityX = -4;
  if(keyDown("space")&&trex.isTouching(ground)) {
    trex.velocityY = -10;
  }
  spawnClouds();
  spawnObstacles();
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    restart.visible=false;
    gameOver.visible=false;
  if(obstaclesGroup.isTouching(trex)){
     gamestate=END;
     }
    
    
  
  }else if(gamestate==END){
  
    ground.velocityX=0;
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    trex.addImage("trex_collided.png",trex_collided);
    restart.visible=true;
    gameOver.visible=true;
    
    if(keyDown("r")||mousePressedOver(restart)){
      cloudsGroup.destroyEach();
      obstaclesGroup.destroyEach();
      
      score=0;
      gamestate=PLAY;
       }
    
  }
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}