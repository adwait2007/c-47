var bunny,bunnyIMG,bunnyStop,lava,lavaIMG,ground1,groundIMG,ground2;
var crate,crateIMG,crateGroup;
var ground=[];

function preload(){
  bunnyIMG=loadAnimation("bunny_running_1.png","bunny_running_2.png");
  lavaIMG=loadImage("lava image.png");
  groundIMG=loadImage("GroundTile.png");
  crateIMG=loadImage("Crate.png");
  bunnyStop=loadAnimation("bunny_go_1.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  ground1=createSprite(50,height-10,250,height-380);
  ground1.addImage(groundIMG);

  ground2=createSprite(width-200,height-10,200,height-380);
  ground2.addImage(groundIMG);

  lava=createSprite(width/2-75,height-5,245,height-385)
  lava.addImage(lavaIMG);

  bunny=createSprite(100,height-75,10,10);
  bunny.addAnimation("standing",bunnyStop);
  bunny.addAnimation("running",bunnyIMG);
  bunny.debug=true;

  ground=[ground1,ground2];

  crateGroup=new Group();
  
}

function draw() {
  background("lightBlue"); 

  

  if(keyDown("RIGHT_ARROW")&&(bunny.isTouching(ground1)||bunny.isTouching(ground2))){
    bunny.x+=5
  }

  if(keyDown("LEFT_ARROW")&&(bunny.isTouching(ground1)||bunny.isTouching(ground2))){
    bunny.x-=5
  }

  if(keyDown("LEFT_ARROW")||keyDown("RIGHT_ARROW")){
    bunny.changeAnimation("running",bunnyIMG);
  }

  if(keyDown("SPACE")){
    bunny.velocityY=-2;
    bunny.velocityX=2;
  }

  if(crateGroup.isTouching(bunny)){
    bunny.velocityY=0;
   
  }

  if(lava.isTouching(bunny)){
    bunny.velocityY=0;
    bunny.destroy();
  }

  
     

  bunny.velocityY+=0.5;

  bunny.collide(ground);

  spawnCrate();

  drawSprites();
}

function spawnCrate(){
  if(frameCount%120===0){
    var randx=Math.round(random(width/2-400,width/2+400));
    var randy=Math.round(random(height/2-100,height/2+100));

    crate=createSprite(randx,0,50,100);
    crate.velocityY=2;
    crate.debug=true;
    crate.addImage(crateIMG);
    crate.scale=0.15;
    crate.lifetime=300;
    crateGroup.add(crate);
  }
}