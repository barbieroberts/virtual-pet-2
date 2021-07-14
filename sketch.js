//Creating variables here
var dog;
var saddogImage;
var happydogImage;
var foodObj;
var foodS,foodStock;
var fedtime,lastfed,feed,addfood;

function preload()
{
//loading images here
  saddogImage = loadImage("images/dogsit.png");
  happydogImage = loadImage("images/dogstand.png");
}

function setup() 
{
  database = firebase.database();
  createCanvas(500, 500);
  
  foodObj= newFood();

  foodStock = database.ref("food");
  foodStock.on("value",readStock);

  dog = createSprite(280,300);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  feed = createSprite("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food")


}

function draw() 
{  
  background("lightBlue")
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastfed = data.val()
  })
  
  fill(255,255,254);
  textSize(15);
  if(lastfed >=22){
    text("Last feed:"+lastfed%12+"PM",350,30)
  }
  else if(lastfed == 0){
    text("Last feed 12AM:",350,30)
  }
  else{
    text("Last feed:"+lastfed%12+"AM",350,30)

  }
  drawSprites();
}

