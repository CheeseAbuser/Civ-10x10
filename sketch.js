var scaling = 50;
var checkForHold = true;
var grid;
var gridTableWidth = 10;
var allGridSpaces; 
var seedTable = ["Forest", "Hill", "Desert", "Sea", "Mountain"];
var currentHeldPiece;
var imgPyramid;
var	imgPyramidWhite;
var imgPyramidBlack;
var imgTemp;
var myGridToPlace;
var area1 = [625, 125];
var area2 = [625, 200];
var area3 = [625, 275];
var area4 = [625, 350];
var area5 = [625, 425];
var pickupAreas = [area1, area2, area3, area4, area5];
var pickups = [];
var myGridToPlace;
var playPause;
var pauseTime;
var whiteTurn;
var whiteBlackTurnText;
var whiteBlackTurnMarker;
var whiteBlackGoldText;
var nextPickup;
var whiteGold;
var blackGold;
var startEndingTurn;


function preload() {
	imgPyramid = loadImage("assets/Pyramid.gif");
	imgPyramidWhite = loadImage("assets/PyramidWhite.gif"); 
	imgPyramidBlack = loadImage("assets/PyramidBlack.gif");
	imgTemp = loadImage("assets/temp.jpg");
}

function setup() {
	ellipseMode(CORNER);
	whiteGold = 5;
	blackGold = 5;
	whiteTurn = true;
	playPause = false;
	pauseTime = 0;
	startEndingTurn = false;
	myCanvas = createCanvas(1000, 800);
	myCanvas.position(100, 100);
	strokeWeight(0);
	grid = [];
	allGridSpaces = [];
	var gridSpaceCounter = 0;
	for(var i = 0; i<gridTableWidth; i++) {
		grid[i] = [];
		for(var j = 0; j<gridTableWidth; j++) {
			grid[i][j] = new gridSpace(i*scaling, j*scaling, scaling);
			allGridSpaces[gridSpaceCounter] = grid[i][j];
			gridSpaceCounter = gridSpaceCounter + 1;
		}
	}

	for(var i = 0; i < 5; i++) {
		pickups[i] = new gridSpacesToPlace(625, 125+i*75, scaling);
	}
	nextPickup = new gridSpacesToPlace(175, 570, scaling); 
}




function draw() {
	clear();
	strokeWeight(0); //Ändra till 1 för att få en synlig grid
	for(var i = 0; i < allGridSpaces.length; i++) {
		allGridSpaces[i].drawMe();		
	}
	
	//Här nedan följer all text utanför brädet: 
	fill(0);
	if(whiteTurn) {
		textSize(20);	
		text("White's turn. Choose a piece: ", 520, 30);
		textSize(16);
		text("Resources: " + whiteGold + " gold", 520, 80);

	}	
	if(!whiteTurn) {
		textSize(20);	
		text("Black's turn. Choose a piece: ", 520, 30);
		textSize(16);
		text("Resources: " + blackGold + " gold", 520, 80);		
	}
	text("Next piece: ", 50, 600);

	nextPickup.drawMe();

	noFill();
	strokeWeight(3);
	if(mouseX < 500  && mouseX > 0 && mouseY > 0 && mouseY < 500 ) {
		var curPosX = Math.floor(mouseX/scaling);
		var curPosY = Math.floor(mouseY/scaling);	
		if(whiteTurn)
			stroke(255);
		else
			stroke(0);

		rect(grid[curPosX][curPosY].x, grid[curPosX][curPosY].y, grid[curPosX][curPosY].size, grid[curPosX][curPosY].size);
		grid[curPosX][curPosY].drawMeBig();		
	}

	strokeWeight(0);
	stroke(0);
	noFill();

	for(var i = 0; i < 5; i++) {
		if(pickups[i].pickedUp == true)
			pickups[i].updatePositionAccordingToMouse();
		if(pickups[i].moveDown == true)
			pickups[i].moveDownPickupInList();
		if(i != 0)
			pickups[i].drawMe();
		else if(i == 0 && pickups[1].moveDown == false)
			pickups[0].drawMe();
	}
	noFill();
	strokeWeight(1);
		rect(0, 0, width-1, height-1);

/*
	//Pickup-areas:
	rect(610, 110, 80, 80);
	rect(610, 185, 80, 80);
	rect(610, 260, 80, 80);
	rect(610, 335, 80, 80);
	rect(610, 410, 80, 80);
*/

	playPopupAnimations();

	strokeWeight(0);
	if(playPause == true) {
		pauseTimerCountdown();
	}
}

function drawBuilding(building, team) {
	if(building == "Pyramid") {
		if(team == "White")
			return imgPyramidWhite;
		if(team == "Black")
			return imgPyramidBlack;	
		if(team == "Neutral")
			return imgPyramidBlack;	
	}
}


function printListOfPickups() {
	for(var i = 0; i < pickups.length; i++)
		print(pickups[i]);
}


