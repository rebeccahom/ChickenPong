//Keep track of the horizontal movement of the paddle
var paddleX = 300;

//Keep track of the ball's position
var ellipseX = 400;
var ellipseY = 300;

//Keep track of the direction of the ball
var xDir;
var yDir;

var chicken;
var imgX;
var imgY;

var points = 0;
var misses = 0;

var boing;
var chirp;
var falling;

function preload(){
	chicken = loadImage("chicken.png"); //Load in the chicken image
	boing = loadSound("boing.mp3");
	chirp = loadSound("chirp.mp3");
	falling = loadSound("falling.mp3");
}

function setup(){
	//Generate a random speed for the ball
	xDir = random(-5,-2);
	yDir = random(-5,-2);
	imgX = random(50, 720);
	imgY = random(50, 400);

	//Set up the canvas
	createCanvas(800,600);
	background(128);
}

function draw(){
/*------Setting up the environment-------*/
	//Refresh the background
	background(128);
	fill(0);
	//Set up the borders
	rect(0, 0, width, 20); //top
	rect(0, 0, 20, height); //left
	rect(width-20, 0, 20, height); //right
/*-----------------------------------------*/



/*--------Paddle Functions-----------------*/	
	//Draw the paddle
	rect(paddleX, 580, 200, 20);

	//Restrict the paddle from leaving the screen
	if (paddleX <= 20){
		paddleX = 20;
	}
	else if (paddleX >= 580){
		paddleX = 580;
	}

	//Change the direction based on key press
	if (keyIsDown(65)){ //A key
		paddleX -= 10;
	}
	else if (keyIsDown(68)){ //D key
		paddleX += 10;
	}
/*----------------------------------------*/



/*--------------Ball Functions------------*/
	//If the ball reaches the left or right boundary, then reverse its X direction & speed it up
	if (ellipseX <= 20 || ellipseX >= 765){
		xDir *= -1;
		xDir += random(-5, 5);
		boing.play();
	}
	//If the ball reaches the top boundary, reverse its Y direction & speed it up
	if (ellipseY <= 35){
		yDir *= -1;
		yDir += random(-5, 5);
		boing.play();
	}
	
	//If the ball collides with the paddle, reverse its Y direction
	if (ellipseY >= 565 && 	(ellipseX >= paddleX && ellipseX <= paddleX + 200)){
		randomSpeed = random(-4, 4);
		//If the ball is moving to the right and hit the left side of the paddle, make it move to the left
		if (xDir >= 0 && ellipseX <= paddleX + 99){
			xDir *= -1;
			yDir *= -1;
			boing.play();
		}

		//If the ball is moving to the left and hits the right side of the paddle, make it move to the right
		else if (xDir <= 0 && ellipseX >= paddleX + 100){
			xDir *= -1;
			yDir *= -1;
			boing.play();
		}

		//If the ball is already travelling in the same direction, only change its Y direction
		else{
			yDir *= -1;
			boing.play();
		}
	}

	//If the ball reaches the bottom but is out of the range of the paddle, reset the ball and pick a new speed
	if (ellipseY >= 565 && (ellipseX <= paddleX || ellipseX >= paddleX + 200)){
		ellipseX = 400;
		ellipseY = 300;
		xDir = random(-5, -2);
		yDir = random(-5, -2);
		misses += 1;
		falling.play();
	}

	//Draw the ball
	ellipse(ellipseX, ellipseY, 35, 35);
	ellipseX += constrain(xDir, -5, 5);
	ellipseY += constrain(yDir, -5, 5);
/*----------------------------------------*/

//Show the points on the screen
	text("Points: " + points, 40, 40);
	text("Misses: " + misses, 40, 55);

/*----------Objective Functions-----------*/
	imageMode(CENTER);
	image(chicken, imgX, imgY, 70, 70); //Draw the chicken

	//If the ball comes near the chicken, pick a new position for the chicken
	if (dist(ellipseX, ellipseY, imgX, imgY) < 35){
		imgX = random(10, 720);
		imgY = random(15, 400);
		points += 1;
		chirp.play();
	}
/*----------------------------------------*/
}