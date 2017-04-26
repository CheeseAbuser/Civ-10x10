
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
			this.color = [240, 220, 0];
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

	this.startOfTurnTrigger = function () {
		if(this.building == "Pyramid") {
			if(this.team == "White") {
				whiteGold += 2;
				addPopupAnimation(this.x, this.y, "+2", 80, "Gold");

			}
			else if(this.team == "Black") {
				blackGold += 2;
				addPopupAnimation(this.x, this.y, "+2", 80, "Gold");
			}
		}
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
	this.cost = 0;
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
			this.color = [240, 220, 0];
			this.building = "Pyramid";
			this.cost = 2;
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
		if(!this.pickedUp) {
			stroke(0);
			fill(0);
			strokeWeight(0);
			textSize(20);
			text(this.cost + " gold", this.x + 75, this.y + 30);
		}
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


var storedPopupAnimations = [];

function addPopupAnimation (x, y, tex, dur, col) {
	storedPopupAnimations.push([x, y, tex, dur, col]);
}


var popupAnimationSize = 30;

function playPopupAnimations () {
	if(storedPopupAnimations.length > 0) {
		for(var i = 0; i < storedPopupAnimations.length; i++) {
			if(storedPopupAnimations[i][3] > 0) {
				storedPopupAnimations[i][3] -= 1;
				fill(storedPopupAnimations[i][4]);
				ellipse(storedPopupAnimations[i][0]+10, storedPopupAnimations[i][1]-30 + storedPopupAnimations[i][3]/4, popupAnimationSize, popupAnimationSize);	
				fill(0);
				text(storedPopupAnimations[i][2], storedPopupAnimations[i][0]+11, storedPopupAnimations[i][1]-7 + storedPopupAnimations[i][3]/4);	
			}
			else 
				storedPopupAnimations.splice(i, 1);
		}
	}
} 
