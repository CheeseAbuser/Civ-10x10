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
var nextPickup;

function preload() {
	imgPyramid = loadImage("assets/Pyramid.gif");
		imgPyramidWhite = loadImage("assets/PyramidWhite.gif"); 
		imgPyramidBlack = loadImage("assets/PyramidBlack.gif");

	imgTemp = loadImage("assets/temp.jpg");
}





function setup() {
	whiteTurn = true;
	playPause = false;
	pauseTime = 0;
	myCanvas = createCanvas(800, 800);
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
	whiteBlackTurnText = "White's turn. Choose a piece: ";
	nextPickup = new gridSpacesToPlace(175, 570, scaling); 


}

function draw() {
	clear();
	for(var i = 0; i < allGridSpaces.length; i++) {
		allGridSpaces[i].drawMe();		
	}
	
	//Här nedan följer all text utanför brädet: 
	fill(0);
	textSize(20);
	if(whiteTurn)
		whiteBlackTurnText = "White's turn. Choose a piece: ";
	if(!whiteTurn)
		whiteBlackTurnText = "Black's turn. Choose a piece: ";	
	text(whiteBlackTurnText, 520, 50);
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

	strokeWeight(1);
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


	strokeWeight(0);
	if(playPause == true) {
		pauseTimerCountdown();
	}
		

}




function gridSpace(x, y, s) {
	this.x = x; 			
	this.y = y; 	
	this.size = s;
	this.tableX = x/s;
	this.tableY = y/s;	
	this.terrain = seedTable[Math.floor(random(seedTable.length))];
	this.color = [0,0,0];
	this.building = 0;
	this.team;

	switch(this.terrain){
		case "Forest": 
			this.color = [50,200,0];
			break;
		case "Hill":
			this.color = [75, 255, 75];
			break;
		case "Desert": 
			this.color = [255, 225, 0];
			break;
		case "Sea": 
			this.color = [0,0,255];
			break;
		case "Mountain":
			this.color = [125, 125, 125];
			break;	
	}

	this.adjustSize = function(newSize) {
		this.size = newSize;
	}

	this.changeToNewSpace = function(droppedSpace) {
		this.building = droppedSpace.building;
		this.terrain = droppedSpace.terrain;
		this.color = droppedSpace.color;
		if(whiteTurn == true) 
			this.team = "White";
		else
			this.team = "Black";

	
		//Trigger som händer om någon placerar en pyramid (all runtom blir till öken och alla tidigare byggnader placerade där förstörs):
		if(this.building == "Pyramid") {
			var curPosX = (Math.floor(mouseX/scaling));
			var curPosY = (Math.floor(mouseY/scaling));	

		//Följande loop går igenom alla omkringliggande värden på brädet och gör "Desert" utav dessa:
		for(var i = 0; i < allGridSpaces.length; i++) {
				if(allGridSpaces[i].tableX == curPosX-1 || allGridSpaces[i].tableX == curPosX || allGridSpaces[i].tableX == curPosX+1) {
					if(allGridSpaces[i].tableY == curPosY-1 || allGridSpaces[i].tableY == curPosY+1 || (allGridSpaces[i].tableX != curPosX && allGridSpaces[i].tableY == curPosY)) {
						allGridSpaces[i].color = this.color;
						allGridSpaces[i].terrain = this.terrain;
						allGridSpaces[i].building = 0;	
					}
				}			
			}
		}
	}

	this.drawMe = function () {
		fill(this.color);
		rect(this.x, this.y, this.size, this.size);
		if(this.building != 0)	
			image(drawBuilding(this.building, this.team), this.x, this.y);
	}

	this.drawMeBig = function () {
		fill(this.color);
		rect((this.x-10), (this.y-10), (this.size+20), (this.size+20));
		if(this.building != 0)	
			image(drawBuilding(this.building, this.team), this.x, this.y);
	}

}


function gridSpacesToPlace(x, y, s) {  //Dessa innehåller enbart information om grafik och byggnader/enheter på tile:en. Det är den andra "class:en som innehåller information om vad olika tiles och byggnader/enheter gör"
	this.x = x; 			
	this.y = y; 			
	this.size = s;
	this.terrain = seedTable[Math.floor(random(seedTable.length))];
	this.color = [0,0,0];
	this.building = 0;
	this.team;

	this.pickedUp = false;
	
	this.moveDown = false;
	this.moveDownTarget = null;

	switch(this.terrain){
		case "Forest": 
			this.color = [50,200,0];
			break;
		case "Hill":
			this.color = [75, 255, 75];
			break;
		case "Desert": 
			this.color = [255, 225, 0];
			this.building = "Pyramid";
			break;
		case "Sea": 
			this.color = [0,0,255];
			break;
		case "Mountain":
			this.color = [125, 125, 125];
			break;	
	}

	this.updatePositionAccordingToMouse = function(){
		if(this.pickedUp == true) {
			this.x = mouseX-this.size/2;
			this.y = mouseY-this.size/2;			
		}
	}

	this.drawMe = function () {
		fill(this.color);
		rect(this.x, this.y, this.size, this.size);
		if(this.building != 0)	
			image(drawBuilding(this.building, "Neutral"), this.x, this.y);
	}


	this.moveDownPickupInList = function(target) {
		if(this.moveDownTarget == null)
			this.moveDownTarget = target;
		if(this.y >= this.moveDownTarget) {
			this.moveDown = false;
			this.moveDownTarget = null;	
		}
		if(this.moveDown == true)
			this.y = this.y + 2; 		//Animationshastigheten för pickup-line:en
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

function mousePressed () {
	if(playPause == false) {
		for(var i = 0; i < 5; i++) {
			if(mouseX > 625 && mouseX < 675 && mouseY > 125+i*75 && mouseY < 175+i*75) {
				pickups[i].pickedUp = true;
				print("Mouse coordinates: (" + mouseX + " , " + mouseY + ")");
			}		
		}	
	}
}

function mouseReleased() {
	var curPosX = (Math.floor(mouseX/scaling));
	var curPosY = (Math.floor(mouseY/scaling));

	for(var i = 0; i<5; i++) {
		if(pickups[i].pickedUp == true) {
			if(mouseX > 500  || mouseX < 0 || mouseY > 500 || mouseY < 0) {
				print("Dropped outside of board!");
				pickups[i].x = pickupAreas[i][0];
				pickups[i].y = pickupAreas[i][1];
			}
			else {
				pauseTimerStart(35);
				grid[curPosX][curPosY].changeToNewSpace(pickups[i]);

				for(var j = 0; j<=i; j++) {
					pickups[j].moveDown = true;
					pickups[j].moveDownPickupInList(pickups[j].y+75);		
				}
				pickups.splice(i, 1);
				var newPickup = nextPickup;
				nextPickup = new gridSpacesToPlace(175, 570, scaling);
				newPickup.x = 625;
				newPickup.y = 125;

				pickups.unshift(newPickup);
				

			}
		}
		pickups[i].pickedUp = false;
	}

}

function printListOfPickups() {
	for(var i = 0; i < pickups.length; i++)
		print(pickups[i]);
}

function checkPositionForCornersAndEdges(curPosX, curPosY) {
	if(curPosX == 0 && curPosY == 0) {
		return "Top Left";
	}
	else if(curPosX == 0 && curPosY == gridTableWidth-1) {
		return "Bottom Left";
	}
	else if(curPosX == gridTableWidth-1 && curPosY == 0) {
		return "Top Right";
	}
	else if(curPosX == gridTableWidth-1 && curPosY == gridTableWidth-1) {
		return "Bottom Right";
	}
	else if(curPosX == 0)
		return "Left Edge";
	else if(curPosX == gridTableWidth-1)
		return "Right Edge";
	else if(curPosY == 0)
		return "Top Edge";
	else if(curPosY == gridTableWidth-1)
		return "Bottom Edge";
	else
		return "Center";
}

function checkPositionForEdges(curPosX, curPosY) {
	if(curPosX == 0)
		return "Left Edge";
	else if(curPosX == gridTableWidth-1)
		return "Right Edge";
	else if(curPosY == 0)
		return "Top Edge";
	else if(curPosY == gridTableWidth-1)
		return "Bottom Edge";
	else
		return "Center";
}


function pauseTimerStart(frames) {
		playPause = true;
		pauseTime = frames;
		print("PAUSE STARTING!")
		print("pauseTime: " + pauseTime);
		print("playPause: " + playPause);
}

function pauseTimerCountdown() {
	if(pauseTime > 0)
		pauseTime = pauseTime - 1;
	else {
		playPause = false;
		whiteTurn = !whiteTurn;
		print("PAUSE ENDING!")
		print("pauseTime: " + pauseTime);
		print("playPause: " + playPause);		
	}
}

