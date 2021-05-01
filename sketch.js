var horse,horseImage,horseFallenImage;
var backgroundImage,BG;
var gameState="PLAY";
var Rock,RockImage;
var Hurdle,HurdleImage;
var Diamond,DiamondImage;
var Treasure,TreasureImage;
var Bird,BirdImage;
var food,foodImage;
var score=0
var Energy=500
var number
var number1
var number2
var edge
var life=3
var gameOver,reset,resetImage,gameOverImage;
var tryAgainSound,gameOverSound,after100pointsSound;

function preload(){
  horseImage=loadAnimation("horse 5.png","horse6.png");
  horseFallenImage=loadAnimation("horseFallenImage.png")
  backgroundImage=loadImage("track images.png");
  RockImage=loadImage("rock.png");
  HurdleImage=loadImage("hurdle.png");
  DiamondImage=loadImage("diamond.png");
  TreasureImage=loadImage("treasure.png");
  BirdImage=loadImage("bird.png");
  foodImage=loadImage("horseFood.png")
  gameOverImage=loadImage("gameOverImage.png")
  resetImage=loadImage("reset.png")
  tryAgainSound=loadSound("tryAgain.mp3");
  gameOverSound=loadSound("gameOver sound.mp3");
  after100pointsSound=loadSound("after100points.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  edge=createEdgeSprites()
  BG=createSprite(windowWidth/2,windowHeight/2)
  BG.addImage(backgroundImage)
  BG.scale=6.5;
  
  horse=createSprite(100,windowHeight/2)
  horse.addAnimation("horse",horseImage)
  horse.addAnimation("fallen",horseFallenImage)
  //horse.debug=true;
  horse.setCollider("rectangle",0,0,300,200)
  horse.scale=0.5;

  gameOver=createSprite(windowWidth/2-30,windowHeight/2-100,10,10)
  gameOver.addImage(gameOverImage)
  gameOver.scale=0.3

  reset=createSprite(windowWidth/2,windowHeight/2,10,10)
  reset.addImage(resetImage)
  reset.scale=0.4;

  

  rockGroup=createGroup()
  hurdleGroup=createGroup()
  diamondGroup=createGroup()
  treasureGroup=createGroup()
  birdGroup=createGroup()
  foodGroup=createGroup()
}

function draw(){
  background("grey")
  
  if(gameState==="PLAY"){
    BG.velocity.x=-2

    
   
    
    
   
    
    if(BG.x<0){
      BG.x=windowWidth/2;
    }
    if(keyDown("UP_ARROW")){
      horse.y=horse.y-10;
    }
  
    if(keyDown("DOWN_ARROW")){
      horse.y=horse.y+10;
    }

    if(horse.isTouching(hurdleGroup)||horse.isTouching(rockGroup)||horse.isTouching(birdGroup)||Energy<0){
      gameState="RESTART"
      life=life-1;
      
    }
    
   
    

    if(life===0){
      gameState="END"
      
    }

    if(horse.isTouching(diamondGroup)){
      score=score+20;
      diamondGroup.destroyEach()
    }

    if(horse.isTouching(treasureGroup)){
      score=score+10;
      treasureGroup.destroyEach()
    }

    if(horse.isTouching(foodGroup)){
      Energy=Energy+40;
      foodGroup.destroyEach()
    }
    if(frameCount%100===0){
      Energy=Energy-20;
    }
    number=Math.round(random(1,2))
    if(number===1){
      creatediamond();

    }else{
      createhurdle();
    }

    number1=Math.round(random(3,4))
    if(number1===3){

      createtreasure();
    }else{
      createrock();
    }

    number2=Math.round(random(5,6))
    if(number2===5){
      createFood();

    }
    else{
      createbird();
    }

    gameOver.visible=false;
    reset.visible=false;
  }
  if(gameState==="RESTART"){
   
    horse.changeAnimation("fallen",horseFallenImage)
    //horse.addAnimation("horse",horseImage)    
      reset.visible=true;
      BG.velocityX=0
      hurdleGroup.setVelocityXEach(0);
      rockGroup.setVelocityXEach(0);
      diamondGroup.setVelocityXEach(0);
      treasureGroup.setVelocityXEach(0);
      birdGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0)
      if(mousePressedOver(reset)||touches.lenght>0
      ){
      
        touches=[]
        gameState="PLAY"
        horse.changeAnimation("horse",horseImage)
        hurdleGroup.destroyEach()
        rockGroup.destroyEach()
        foodGroup.destroyEach()
        birdGroup.destroyEach()
        diamondGroup.destroyEach()
        treasureGroup.destroyEach()
        
      }
  }

    if(gameState==="END"){
      BG.velocityX=0;
      horse.changeAnimation("fallen",horseFallenImage)
      //horse.changeAnimation(horseFallenImage);
      hurdleGroup.setVelocityXEach(0);
      rockGroup.setVelocityXEach(0);
      diamondGroup.setVelocityXEach(0);
      treasureGroup.setVelocityXEach(0);
      birdGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0)
      gameOver.visible=true;
      reset.visible=true;
      hurdleGroup.destroyEach()
      rockGroup.destroyEach()
      foodGroup.destroyEach()
      birdGroup.destroyEach()
      diamondGroup.destroyEach()
      treasureGroup.destroyEach()
     
      
      
      gameOverSound.play()
      if(mousePressedOver(reset)||touches.lenght>0
      ){
        touches=[]
        Energy=500;
        score=0;
        life=3
        horse.changeAnimation("horse",horseImage)
        gameState="PLAY"
        
      }

    }
    horse.collide(edge)

  drawSprites()
  textSize(25)
  fill("white")
  text("SCORE : "+score,50,50)

  textSize(25)
  fill("white")
  text("Energy : "+Energy,350,50)

  textSize(25)
  fill("white")
  text("LIFE : "+life,230,50)

}

function createrock(){
  if(frameCount%200===0){
    Rock=createSprite(windowWidth,Math.round(random(50,windowHeight-50)))
    Rock.addImage(RockImage)
    //Rock.debug=true;
    Rock.setCollider("circle",0,0,40)
    Rock.velocityX=-(3+score/100);
    Rock.scale=0.4;
    rockGroup.add(Rock);
  }

 
}

function createhurdle(){
  if(frameCount%150===0){
    Hurdle=createSprite(windowWidth,Math.round(random(50,windowHeight-50)))
    Hurdle.addImage(HurdleImage)
    //Hurdle.debug=true;
    Hurdle.setCollider("rectangle",0,0,300,300)
    Hurdle.velocityX=-(2+score/100);
    Hurdle.scale=0.4;
    hurdleGroup.add(Hurdle);
  }
}

function creatediamond(){
  if(frameCount%150===0){
    Diamond=createSprite(windowWidth,Math.round(random(50,windowHeight-50)))
    Diamond.addImage(DiamondImage)
    //Diamond.debug=true;
    Diamond.setCollider("circle",0,0,100)
    Diamond.velocityX=-(2+score/100);
    Diamond.scale=0.2;
    diamondGroup.add(Diamond);
  }
}

function createtreasure(){
  if(frameCount%200===0){
    Treasure=createSprite(windowWidth,Math.round(random(50,windowHeight-50)))
    Treasure.addImage(TreasureImage)
    //Treasure.debug=true;
    Treasure.setCollider("rectangle",0,0,300,200)
    Treasure.velocityX=-(2+score/100);
    Treasure.scale=0.2;
    treasureGroup.add(Treasure);
  }
}

function createbird(){
  if(frameCount%250===0){
    Bird=createSprite(windowWidth,Math.round(random(50,windowHeight-50)))
    Bird.addImage(BirdImage)
    //Bird.debug=true;
    Bird.setCollider("circle",0,-10,70)
    Bird.velocityX=-(2+score/100)
    Bird.scale=0.3;
    birdGroup.add(Bird);
}
}

function createFood(){
  if(frameCount%250===0){
    food=createSprite(windowWidth,Math.round(random(50,windowHeight-50)))
    food.addImage(foodImage)
    //food.debug=true;
    food.setCollider("circle",0,0,100)
    food.velocityX=-(2+score/100);
    food.scale=0.2;
    foodGroup.add(food)
}
}

