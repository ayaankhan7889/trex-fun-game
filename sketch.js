var trex, trex_running,trexcollider;
var edges;
var ground, groundimage, ground_2;
var cloud, image_cloud,cloudgroup;
var obstacle_1,obstacle_2,obstacle_3,obstacle_4,obstacle_5,obstacle_6,obstaclegroup;
var score = 0;
var gamestate = "play"
var gameover;
var restart;
var gameoverimage;
var restartimage;
var jumpsound, collidesound, scoresound;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexcollider = loadAnimation("trex_collided.png")
  
  gameoverimage = loadImage("gameOver-1.png")
  restartimage = loadImage("restart.png")
  
  
  groundimage = loadImage("ground2.png")
  
  image_cloud = loadImage("cloud.png")
  
  obstacle_1 = loadImage("obstacle1.png")
  obstacle_2 = loadImage("obstacle2.png")
  obstacle_3 = loadImage("obstacle3.png")
  obstacle_4 = loadImage("obstacle4.png")
  obstacle_5 = loadImage("obstacle5.png")
  obstacle_6 = loadImage("obstacle6.png") 
  
  jumpsound = loadSound("jump.mp3")
  collidesound = loadSound("die.mp3")
  scoresound = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,200);
  
  
  
  trex = createSprite(50,150,10,20);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collide",trexcollider)
  trex.scale = 0.5;
 // trex.debug = true;
  trex.setCollider("circle",0,0,35);
  
  edges = createEdgeSprites()
  
  ground = createSprite(300,170,600,20);
  ground.addImage(groundimage)
  
  ground_2 = createSprite(300,180,600,10);
  ground_2.visible = false;
  
  cloudgroup = new Group()
  obstaclegroup = new Group()
  
   gameover = createSprite(300,60,20,10);
  gameover.addImage(gameoverimage);
  gameover.scale = 0.7;
  
  
  restart = createSprite(300,110,20,10);
  restart.addImage(restartimage);
  restart.scale = 0.7;
 
}

function draw(){
  background("white");
  
  //console.log(frameCount)
   
  text("score "+score,500,20);
    
  trex.collide(ground_2);
    
  
  
  
  
if(gamestate === "play"){
    monk();

    obstacle();

    if(keyDown("space")&& trex.y>151){
      trex.velocityY = -10;
      jumpsound.play();
    }

    if(ground.x <0){
      ground.x = ground.width/2
   }
    score = score+Math.round(getFrameRate()/60)
    trex.velocityY = trex.velocityY + 0.8;  
    ground.velocityX = -5-Math.round(score / 100);

  gameover.visible = false;
  restart.visible = false;
  
    if(obstaclegroup.isTouching(trex)){
      gamestate = "end"
     collidesound.play();

    }
  if(score % 100 === 0 && score >0){
    scoresound.play();
  }
  
  
  
  
  
}

  else if(gamestate === "end"){
  
    ground.velocityX = 0;
    
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
    trex.velocityY = 0;
    trex.changeAnimation("collide",trexcollider)
    gameover.visible = true ;
    restart.visible = true;
    if(mousePressedOver(restart)|| keyDown("space")){
      reset();
    }
    
    
  }
 
  drawSprites();
}


function monk(){

  if(frameCount%70===0){
    cloud=createSprite(650,50,20,10)
    cloud.velocityX = -3-Math.round(2*score / 100);
    cloud.addImage(image_cloud)
    cloud.y = Math.round(random(20,80))
    
    cloud.depth = trex.depth
    trex.depth = trex.depth+1
    
    cloud.lifetime = 230;
    cloudgroup.add(cloud)
}}

function obstacle(){
  if(frameCount%70===0){ 
    obs=createSprite(650,160,10,30)
    obs.velocityX = -5-Math.round(2*score / 100);
    r = Math.round(random(1,6))
    switch(r){
      case 1:obs.addImage(obstacle_1)
    break
    case 2:obs.addImage(obstacle_2)     
      break
    case 3:obs.addImage(obstacle_3)     
      break
    case 4:obs.addImage(obstacle_4)     
      break
     case 5:obs.addImage(obstacle_5)     
      break
    case 6:obs.addImage(obstacle_6)     
      break
      default:break}
    obs.scale = 0.4;
    obs.lifetime = 200;
    obstaclegroup.add(obs)
}}

function reset(){
  gamestate = "play"
  trex.changeAnimation("running",trex_running);
  score = 0;
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  
}




