var runner;

var racetrack, raceTI;

var iground, igroundi;

var obstaclesImg1, obstaclesImg2;

var obstaclesGroup;

var opponent1;

var opponent2;

var ri, rii, riii;

var invi, invi2, invi3;

var distance = 0;

var gameState = 0;

var PLAY = 0;

var END = 1;

var WIN = 2

var rand = 0;

var jump;

var crash;

var win;

var lose;

var gameMBack;

var trophy, trophyImg;

var stadium, stadiumImg;

function preload(){
    ri = loadAnimation("run1.png", "run2.png", "run3.png", "run4.png", "run5.png", "run6.png", "run7.png", "run8.png");
    rii = loadAnimation("run11.png", "run12.png", "run13.png", "run14.png", "run15.png", "run16.png", "run17.png", "run18.png");
    riii = loadAnimation("r1.png", "r2.png", "r3.png", "r4.png", "r5.png", "r6.png", "r7.png", "r8.png");
    raceTI = loadImage("race_track.png");
    obstaclesImg1 = loadImage("obstacle1.png");
    obstaclesImg2 = loadImage("obstacle2.png");
    igroundi = loadImage("race_track 1.png");
    jump = loadSound("jumpSund.mp3");
    crash = loadAnimation("crash1.png");
    win = loadSound("win.wav");
    lose = loadSound("gameOver.wav");
    gameMBack = loadSound("jumpMusic.ogg");
    trophyImg = loadImage("trophy.png");
    stadiumImg = loadImage("stadium.jpg");
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    invi3 = createSprite(width / 2, height / 2 + 300, width, 10);

    invi2 = createSprite(width / 2, height / 2 + 200, width, 10);

    invi = createSprite(width / 2, height / 2 + 100, width, 10);
    
    stadium = createSprite(width / 2, height / 2);
    stadium.addImage("crowd", stadiumImg);
    stadium.scale = 2;

    iground = createSprite(width / 2, height / 2);
    iground.addImage("rti", igroundi);
    iground.scale = 3;

    racetrack = createSprite(width / 2, height / 2);
    racetrack.addAnimation("rt", raceTI);
    racetrack.scale = 3;

    runner = createSprite(300, height / 2);
    runner.addAnimation("run", ri);
    runner.addAnimation("boom", crash);
    runner.scale = 0.5;
    //runner.debug = true;
    runner.setCollider("rectangle", 0, 0, 100, 500);

    opponent1 = createSprite(300, (height / 2) + 100);
    opponent1.addAnimation("run2", rii);
    opponent1.scale = 0.5;
    //opponent1.debug = true;
    opponent1.setCollider("rectangle", 0, 0, 1000, 500);
    opponent1.depth = 100;
    obstaclesGroup = new Group();
    opponent1.velocityX = -0.1;

    opponent2 = createSprite(300, (height / 2) + 100);
    opponent2.addAnimation("run3", riii);
    opponent2.scale = 0.5;
    //opponent2.debug = true;
    opponent2.setCollider("rectangle", 0, 0, 1000, 500);
    opponent2.depth = 100;
    opponent2.velocityX = -0.2;

    distance = 0;

    trophy = createSprite(width + 100, height / 2);
    trophy.addImage("prize", trophyImg);
    trophy.setCollider("rectangle", 0, 0, 100, height);
    trophy.scale = 0.09;

  if(gameState === PLAY){
    gameMBack.play();

  }


}

function draw(){

    background(0, 160, 0);

    if(gameState === PLAY){

    opponent1.visible = true;
    opponent2.visible = true;

    opponent1.depth = opponent1.depth + 1000;

    opponent2.depth = opponent2.depth + 1000;

      distance = distance + Math.round(getFrameRate()/60);
      racetrack.velocityX = -(6 + 3*distance/100);
      if (racetrack.x < -900){
        racetrack.x = width;
      }
      if(keyWentDown("space") && runner.collide(invi)){
        runner.velocityY = -20;   
        jump.play();  

      }

      runner.collide(invi);

      runner.velocityY = runner.velocityY + 0.8;

      if(obstaclesGroup.isTouching(opponent1) && opponent1.collide(invi2)){
        opponent1.velocityY = -20;
        jump.play();

    }

    opponent1.collide(invi2);

    opponent1.velocityY = opponent1.velocityY + 0.8;

    if(obstaclesGroup.isTouching(opponent2) && opponent2.collide(invi3)){
      opponent2.velocityY = -20;
      jump.play();

  }

    opponent2.collide(invi3);

    opponent2.velocityY = opponent2.velocityY + 0.8;

    spawnObstacles();

    spawnObstacles2();

    spawnObstacles3();

    if(obstaclesGroup.isTouching(runner)){
      gameState = END;

    }

    if(distance === 2000 || distance > 2000){
      trophy.velocityX = racetrack.velocityX;
      obstaclesGroup.destroyEach();
      if(keyDown("space")){
        runner.velocityY = +10;
      }

    }

    if(trophy.collide(runner)){
        gameState = WIN;

    }

  }

  else if(gameState === END){
      racetrack.velocityX = 0;
      runner.velocityY = 0;
      opponent1.velocityY = 0;
      opponent2.velocityY = 0;

      obstaclesGroup.setVelocityXEach(0);

      obstaclesGroup.setLifetimeEach(-1);

      runner.changeAnimation("boom", crash);

      gameMBack.stop();
      lose.play();

  }

  else if(gameState === WIN){
    racetrack.velocityX = 0;
    runner.velocityY = 0;
    opponent1.velocityY = 0;
    opponent2.velocityY = 0; 
    runner.visible = false;

    gameMBack.stop();
    win.play(false);
  }

  if(gameState === END && keyDown("r")){
    reset();
  }

  if(gameState === WIN && keyDown("n")){
    reset1();
  }

    drawSprites();

  if(gameState === END){
    textSize(50);
    fill(255);
    text("YOU CRASHED", (width / 2)-80, (height / 2)-170);
    text("PRESS R TO RESTART", (width / 2) - 100, (height / 2)-100);  

    }

  if(gameState === WIN){
    textSize(50);
    fill(255);
    text("YAY YOU WON", (width / 2)-80, (height / 2)-170);
    text("PRESS N TO PROCEED TO THE NEXT LEVEL", (width / 2) - 500, (height / 2)-100);
  }

    textSize(50);
    fill("white");
    text("Distance: "+ distance,(width / 2) + 100, (height / 2)-300);

    opponent1.visible = false;
    opponent2.visible = false;

}

function spawnObstacles(){
    if(frameCount % 300 === 0 && frameCount !== 0){
    var obstacles = createSprite(width, height/2);
    rand = Math.round(random(1, 2))
    //obstacles.y = Math.round(random(height / 2, height-50));
    switch(rand){
      case 1: obstacles.addImage("obs2", obstaclesImg2);
              obstacles.scale = 0.4;
              obstacles.setCollider("rectangle", 100, 0, 100, 400);

              break;
      case 2: obstacles.addImage("obs1", obstaclesImg1);
              obstacles.scale = 0.5;
              obstacles.setCollider("rectangle", 100, 0, 100, 400);
              
              break;
        default: break;
    }
    obstacles.velocityX = racetrack.velocityX;
    obstacles.lifetime = width / (obstacles.velocityX);
    //obstacles.debug = true;
    obstaclesGroup.add(obstacles);
    }
}

function spawnObstacles2(){
  if(frameCount % 300 === 0 && frameCount !== 0){
  var obstacles1 = createSprite(width, (height/2) + 150);
  //obstacles.y = Math.round(random(height / 2, height-50));
  switch(rand){
      case 1: obstacles1.addImage("obs2", obstaclesImg2);
              obstacles1.scale = 0.4;
              obstacles1.setCollider("rectangle", 100, 0, 100, 400);

              break;
      case 2: obstacles1.addImage("obs1", obstaclesImg1);
              obstacles1.scale = 0.5;
              obstacles1.setCollider("rectangle", 100, 0, 100, 400);
              
              break;
      default: break;
  }
  obstacles1.velocityX = racetrack.velocityX;
  obstacles1.lifetime = width / (obstacles1.velocityX);
  //obstacles1.debug = true;
  obstaclesGroup.add(obstacles1);
  }
}

function spawnObstacles3(){
  if(frameCount % 300 === 0 && frameCount !== 0){
  var obstacles2 = createSprite(width, (height/2) + 300);
  //obstacles.y = Math.round(random(height / 2, height-50));
  switch(rand){
      case 1: obstacles2.addImage("obs2", obstaclesImg2);
              obstacles2.scale = 0.4;
              obstacles2.setCollider("rectangle", 100, 0, 100, 400);

              break;
      case 2: obstacles2.addImage("obs1", obstaclesImg1);
              obstacles2.scale = 0.5;
              obstacles2.setCollider("rectangle", 100, 0, 100, 400);
              
              break;
      default: break;
  }
  obstacles2.velocityX = racetrack.velocityX;
  obstacles2.lifetime = width / (obstacles2.velocityX);
  //obstacles2.debug = true;
  obstaclesGroup.add(obstacles2);
  }
}

function reset(){
  gameState = PLAY;

  lose.stop();
  gameMBack.play();

  obstaclesGroup.destroyEach();

  runner.changeAnimation("run", ri);

  distance = 0;

  runner.visible = true;
  opponent1.visible = true;
  opponent2.visible = true;

  opponent1.x = 300;

  opponent2.x = 300;
  


}
function reset1(){
  gameState = PLAY;

  win.stop();
  gameMBack.play();

  obstaclesGroup.destroyEach();

  runner.changeAnimation("run", ri);

  distance = 0;

  opponent1.visible = true;
  opponent2.visible = true;

  runner.visible = true;

  trophy.x = width + 100;

  opponent1.x = 300;

  opponent2.x = 300;
}