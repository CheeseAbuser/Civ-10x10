var scaling = 50;
var scalingOffset  = 25;
var checkForHold = true;
var grid;
var gridTableWidth = 10;
var allGridSpaces; 
var seedTable = ["Forest", "Plains", "Desert", "Sea", "Mountain"];
var deck = ["MineCard", "MineCard", "MineCard", "MineCard", "PyramidCard", "PyramidCard", "LumbermillCard", "LumbermillCard", "LumbermillCard", "LumbermillCard"];
var imgPyramid;
var	imgPyramidWhite;
var imgPyramidBlack;
var imgEndTurnButton;
var imgWhiteKing;
var imgBlackKing;
var imgWhiteMine;
var imgBlackMine;
var	imgWhiteLumbermill;
var	imgBlackLumbermill;

var endTurnButtonPressed;
var currentPlayerHasPlacedPickup;
var currentPlayersGold;
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
var currentPlayerHasPlacedPickup;
var kingHasBeenMovedThisTurn;
var oldKingPosX;
var oldKingPosY;
var kingPickedUp;
var pickupIsPickedUp;

var whiteNumberOfMines;
var blackNumberOfMines;

function preload() {
	imgPyramidWhite = loadImage("assets/PyramidWhite.gif"); 
	imgPyramidBlack = loadImage("assets/PyramidBlack.gif");
	imgEndTurnButton = loadImage("assets/End turn button.gif");
	imgWhiteKing = loadImage("assets/WhiteKing.gif");
	imgBlackKing = loadImage("assets/BlackKing.gif");
	imgWhiteMine = loadImage("assets/WhiteMine.gif");
	imgBlackMine = loadImage("assets/BlackMine.gif");
	imgWhiteLumbermill = loadImage("assets/WhiteLumbermill.gif");
	imgBlackLumbermill = loadImage("assets/BlackLumbermill.gif");

}

function setup() {
	kingPickedUp = false;
	pickupIsPickedUp = false;
	currentPlayerHasPlacedPickup = false;
	kingHasBeenMovedThisTurn = false;
	ellipseMode(CORNER);
	whiteGold = 5;
	blackGold = 5;
	currentPlayersGold = whiteGold;
	whiteTurn = true;
	playPause = false;
	pauseTime = 0;
	startEndingTurn = false;

	whiteNumberOfMines = 0;
	blackNumberOfMines = 0;

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

	whiteKingX = Math.floor(random(0,3));
	whiteKingY = Math.floor(random(3,7));
	blackKingX = 9-whiteKingX;
	blackKingY = 9-whiteKingY;
	var seedCounter = 0;
	while(grid[whiteKingX][whiteKingY].terrain == "Sea" || grid[blackKingX][blackKingY].terrain == "Sea") {
		print("NEEDED A NEW SEED!");
		print("whiteKingTerrain:  " + grid[whiteKingX][whiteKingY].terrain);
		print("blackKingTerrain:  " + grid[blackKingX][blackKingY].terrain);
		grid[whiteKingX][whiteKingY].terrain = seedTable[Math.floor(random(seedTable.length))];
		grid[whiteKingX][whiteKingY].adjustColor();
		grid[blackKingX][blackKingY].terrain = seedTable[Math.floor(random(seedTable.length))];
		grid[blackKingX][blackKingY].adjustColor();
		
	}
	//TEST:
	/*
	whiteKingX = 8;
	whiteKingY = 8;
	blackKingX = 9;
	blackKingY = 9;
	*/
	grid[whiteKingX][whiteKingY].whiteKing = true;
	grid[blackKingX][blackKingY].blackKing = true;

	for(var i = 0; i < 5; i++	) {
		pickups[i] = new gridSpacesToPlace(625, 125+i*75, scaling);
	}
	nextPickup = new gridSpacesToPlace(175, 570, scaling); 
}




function draw() {
	var curPosX = Math.floor(mouseX/scaling);
	var curPosY = Math.floor(mouseY/scaling);

	clear();
	strokeWeight(1); //Ändra till 1 för att få en synlig grid
	for(var i = 0; i < allGridSpaces.length; i++) {
		allGridSpaces[i].drawMe();		
	}
	
	//Här nedan följer all text utanför brädet: 
	fill(51);
	if(whiteTurn) {
		textSize(20);	
		text("White's turn. Choose a piece: ", 520, 30);
		textSize(18);
		text("   Resources:            " + whiteGold, 520, 80);

	}	
	if(!whiteTurn) {
		textSize(20);	
		text("Black's turn. Choose a piece: ", 520, 30);
		textSize(18);
		text("   Resources:            " + blackGold, 520, 80);		
	}
	text("Next piece: ", 50, 600);
	fill("Gold");
	ellipseMode(CORNER);
	strokeWeight(1);
	ellipse(650, 60, 30, 30);
	nextPickup.drawMe();

	noFill();
	strokeWeight(3);

	//Rita ut border runt kungen om denna är upplockad:
	if(kingPickedUp) 
		drawBorderAroundKing();

	//Rita ut border runt kungen om en pickup är upplockad:
	if(pickupIsPickedUp) 
		drawBorderAroundKing();	

	if(mouseX < 500  && mouseX > 0 && mouseY > 0 && mouseY < 500 ) {
		if(whiteTurn)
			stroke(255);
		else
			stroke(0);
		//rect(grid[curPosX][curPosY].x, grid[curPosX][curPosY].y, grid[curPosX][curPosY].size, grid[curPosX][curPosY].size);
		//if(!kingPickedUp && !pickupIsPickedUp)
		grid[curPosX][curPosY].drawMeBig();		
	}
	//Border runt brädet:
	//setToDefaultStroke();
	//noFill();
	//strokeWeight(1);
	//rect(0, 0, 500, 500);

	//Rita ut kungen vid muspekaren om denna är upplockad.
	if(kingPickedUp) {
		if(whiteTurn) {
			image(imgWhiteKing, mouseX-scalingOffset, mouseY-scalingOffset);
		}
		else {
			image(imgBlackKing, mouseX-scalingOffset, mouseY-scalingOffset);
		}	
	}



	for(var i = 0; i < pickups.length; i++) {
		strokeWeight(1);
		stroke(0);
		fill(51);
		if(i != 0) 
			pickups[i].drawMyCost();			
		else if(i == 0 && pickups[1].moveDown == false) 
			pickups[i].drawMyCost();				
	}	
	for(var i = 0; i < pickups.length; i++) {
		strokeWeight(1);
		stroke(0);
		noFill();
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
	if(currentPlayerHasPlacedPickup == true)
	{
		if(!mouseIsPressed)
			image(imgEndTurnButton, 600, 600, 100, 50);
		else
			image(imgEndTurnButton, 600, 605, 100, 50);		
	}

	playPopupAnimations();


	if(playPause == true) {
		pauseTimerCountdown();
	}
		setToDefaultStroke();
}

function setToDefaultStroke() {
	strokeWeight(1);
	stroke(0);
}
//function printListOfPickups() {
//	for(var i = 0; i < pickups.length; i++)
//		print(pickups[i]);
//}
