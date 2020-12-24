var dog,happyDog;
var database;
var foodS,foodStock;
var dogSprite;
function preload(){
     dog=loadImage("dogImg.png");
     happyDog=loadImage("dogImg1.png");
}

function setup() {
     database = firebase.database();
     createCanvas(800,800);
     dogSprite=createSprite(250,250,50,50);
     dogSprite.addImage(dog);
     dogSprite.scale=0.2;
    foodStock=database.ref('Food');
     foodStock.on("value",readStock);
     textSize(20);
}

// function to display UI
function draw() {
     background(46,139,87);
    
     if(keyWentDown(UP_ARROW)){
       writeStock(foodS);
       dogSprite.addImage(happyDog);
     }
   
     drawSprites();
     fill(255,255,254);
     stroke("black");
     text("Food remaining : "+foodS,170,200);
     textSize(13);
     text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
   }
   //Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}