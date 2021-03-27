//Create variables here
var dog, dogImage1, dogImage2, bones;
var database, foodS, foodStock;

function preload() {
  dogImage1 = loadImage("dogImg.png");
  dogImage2 = loadImage("dogImg1.png");
  bones = loadImage("download.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  database = firebase.database(); 
  dog = createSprite(windowWidth/2, windowHeight/2 + 100);
  dog.addImage(dogImage2);
  dog.scale = 0.15;
  // reading the database
  foodStock = database.ref('foodS');
  foodStock.on("value", readStock);
  
  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(bones);
  }
  if(keyWentUp(UP_ARROW) || touches.length > 0) {
    dog.addImage(dogImage1);
    touches = [];
  }

  for(var i = 0; i < foodS; i++) {
    var food = createSprite((i*50)+30, windowHeight - 100);
    food.addImage(bones);
    food.scale = 0.15;
  }
  
  drawSprites();
  //add styles here
  textSize(30);
  fill("black");
  text("Food Remaining: " + foodS, windowWidth/2 - 50, windowHeight/2 - 250);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
    /*textSize(20);
    fill("red");
    text("There is no more food left", 180,200);*/
  }
  else {
    x = x - 1;
  }
  database.ref("/").update({
    foodS: x
  });

}




