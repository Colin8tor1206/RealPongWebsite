var puck;
var player;
var computer;
var difficulty = 1;
var widthWindow = 1200;
var heightWindow = 600;
var screenS = 0; //screen = 0 = start , screen = 1 = game, 2 = win, 3 = loss

function setup(){
  createCanvas(widthWindow, heightWindow);
  frameRate(120);
  player = new Paddle(true);
  computer = new Paddle(false);
  puck = new Puck();
  png = loadImage("greenline.png");
}

function mouseClicked(){
  if(screenS == 0){
    screenS = 1;
  } else if(screenS == 2 || screenS == 3){
    screenS = 0;
  }
}

function getDifficulty(){
  return difficulty;
}

function setScreen(screen){
  screenS = screen;
}

function getScreen(){
  return screenS;
}

function keyPressed(){
  if (keyCode === LEFT_ARROW && difficulty > 0 && screenS == 0) {
    difficulty -= 1;
  } else if (keyCode === RIGHT_ARROW && difficulty < 2 && screenS == 0) {
    difficulty += 1;
    console.log(difficulty);
  }
}

function draw(){
  if(screenS == 0){
    background(50);
    textSize(60);
    fill(0);
    textAlign(CENTER, CENTER);
    text("Computer Science Final \nPong \nBy Colin Li & Luke Fahrney \nClick to Start", width/2, heightWindow - 400);
    switch(difficulty){
      case 0:
        text("Difficulty: Easy", width/2, heightWindow - 50);
        break;
      case 1:
        text("Difficulty: Medium", width/2, heightWindow - 50);
        break;
      case 2:
        text("Difficulty: Hard", width/2, heightWindow - 50);
        break;
      default:
        console.log("difficulty error!")
        break;
    }
    puck.setSpeed();
  } else if (screenS == 1) {
    background(0);
    image(png, 0, 0);
    puck.isTouching(player);
    puck.isTouching(computer);

    player.show();
    computer.show();

    player.move();
    if(Math.cos(puck.dir) >= 0){
      computer.AI(difficulty, puck);
    }

    puck.show();
    puck.isOnEdge();
    puck.move();
    textSize(32);
    text(puck.playerScore, 35, 30);
    text(puck.computerScore, width - 35, 30);
    puck.checkScore();
  } else if (screenS == 2) {
    background(25);
    textSize(60);
    fill(0);
    textAlign(CENTER, CENTER);
    text("You Win!\nClick to play again", width/2, height/2);

  } else if (screenS == 3) {
    background(25);
    textSize(60);
    fill(0);
    textAlign(CENTER, CENTER);
    text("You Lose!\nClick to play again", width/2, height/2);
  }
}
