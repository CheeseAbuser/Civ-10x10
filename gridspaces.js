
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
	this.whiteKing = false; 
	this.blackKing = false;
	this.currentBuildingcost = 0;
	this.timer = -1;

	this.adjustColor = function() {
		switch(this.terrain){
			case "Forest": 
				this.color = [50,200,0];
				break;
			case "Plains":
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
	}

	this.adjustColor();
	

	this.adjustSize = function(newSize) {
		this.size = newSize;
	}

	this.changeToNewSpace = function(droppedSpace) {
		if(this.building != 0) {
			switch(this.building){
				case "Mine": 
					if(this.team == "White")
						whiteNumberOfMines--;
					else if(this.team == "Black")
						blackNumberOfMines--;
					break;
			}
			var goldToGetBack = Math.floor(this.currentBuildingcost/2);
			if(whiteTurn && this.team == "Black") {
				blackGold += goldToGetBack;
				print("Black player gets " + goldToGetBack + " for his destroyed " + this.building);
				addPopupAnimation (this.x, this.y, "+" + goldToGetBack, 80, "Gold", "Black");
			}
			else if(!whiteTurn && this.team == "White") {
				whiteGold += goldToGetBack;
				print("White player gets " + goldToGetBack + " for his destroyed " + this.building);
				addPopupAnimation (this.x, this.y, "+" + goldToGetBack, 80, "Gold", "White");				
			}
	}
		this.building = droppedSpace.building;
		this.terrain = droppedSpace.terrain;
		this.color = droppedSpace.color;
		this.currentBuildingcost = droppedSpace.cost;
		if(whiteTurn == true) 
			this.team = "White";
		else
			this.team = "Black";

		if(this.building == "Mine") {
			if(this.team == "White")
				whiteNumberOfMines++;
			else if(this.team == "Black")
				blackNumberOfMines++;
		}
		else if(this.building == "Lumbermill") {
			this.timer = 3;			
		}
		//Trigger som händer om någon placerar en pyramid (all runtom blir till öken och alla tidigare byggnader placerade där förstörs):
		else if(this.building == "Pyramid") {
			var curPosX = (Math.floor(mouseX/scaling));
			var curPosY = (Math.floor(mouseY/scaling));	
			//Följande loop går igenom alla omkringliggande värden på brädet och gör "Desert" utav dessa:
			for(var i = 0; i < allGridSpaces.length; i++) {
				if(allGridSpaces[i].tableX == this.tableX-1 || allGridSpaces[i].tableX == this.tableX || allGridSpaces[i].tableX == this.tableX+1) {
					if(allGridSpaces[i].tableY == this.tableY-1 || allGridSpaces[i].tableY == this.tableY+1 || (allGridSpaces[i].tableX != this.tableX && allGridSpaces[i].tableY == this.tableY)) {
						allGridSpaces[i].color = this.color;
						allGridSpaces[i].terrain = this.terrain;
						if(allGridSpaces[i].building == "Mine") {
							if(allGridSpaces[i].team == "White")
								whiteNumberOfMines--;				
							else if(allGridSpaces[i].team == "Black")
								blackNumberOfMines--;
						}
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
		if(this.whiteKing == true || this.blackKing == true)
			image(drawKing(this.whiteKing, this.blackKing), this.x, this.y);

	}

	this.drawMeBig = function () {
		fill(this.color);
		var xDif = 0;
		var yDif = 0;
		if(this.tableX == 0)		//SÄTT IN UNIKA UPPRITNINGAR FÖR VARJE POSITION LÄNGSMED KANTERNA 
			xDif = 12;
		if(this.tableY == 0)
			yDif = 12;
		if(this.tableX == 9)
			xDif = -12;
		if(this.tableY == 9)
			yDif = -12;
		rect((this.x-10+xDif), (this.y-10+yDif), (this.size+20), (this.size+20));
		if(this.building != 0)
			image(drawBuilding(this.building, this.team), this.x-10+xDif, this.y-10+yDif, this.size+20, this.size+20);				
		if(this.whiteKing == true || this.blackKing == true)
			image(drawKing(this.whiteKing, this.blackKing), this.x-10+xDif, this.y-10+yDif, this.size+20, this.size+20);
	}

	this.startOfTurnTrigger = function () {
		if(this.building == "Pyramid") {
			if(this.team == "White") 
				whiteGold += 1;
			else if(this.team == "Black") 
				blackGold += 1;
			addPopupAnimation(this.x, this.y, "+1", 80, "Gold", this.team);
			print(this.team + " gets +1 gold from Pyramid");
		}
		else if(this.building == "Lumbermill") {
			if(this.team == "White") 
				whiteGold +=3;
			else if(this.team == "Black")
				blackGold +=3;
			print(this.team + " gets +3 gold from Lumbermill");
			addPopupAnimation(this.x, this.y, "+3", 80, "Gold", this.team);
			this.timer -=1;
			if(this.timer == 0) {
				this.timer = -1;
				this.building = 0;
				this.terrain = "Plains";
				this.adjustColor();
				print(this.team + " lumbermill is destroyed and the forest is replaced by plains.");
				addPopupAnimation(this.x-10, this.y-40, "Depleted", 120, "Red", "Text");	
			}
		}
	}
	

	this.checkForKing = function() {
		if(whiteTurn){
			this.whiteKing = true;
		}
		else
			this.blackKing = true;

	}
}




function gridSpacesToPlace(x, y, s) {  //Dessa innehåller enbart information om grafik och byggnader/enheter på tile:en. Det är den andra "class:en som innehåller information om vad olika tiles och byggnader/enheter gör"
	this.x = x; 			
	this.y = y; 			
	this.size = s;
	this.terrain = seedTable[Math.floor(random(seedTable.length))];
	this.card = deck[Math.floor(random(deck.length))];
	this.color = [0,0,0];
	this.building = 0;
	this.team;
	this.cost = 0;
	this.pickedUp = false;
	this.terrainRestriction = 0;
	this.moveDown = false;
	this.moveDownTarget = null;

	switch(this.card){  
		case "LumbermillCard": 
			this.color = [50,200,0];
			this.building = "Lumbermill";
			this.cost = 1;
			this.terrain = "Forest";
			this.terrainRestriction = "Forest";
			break;
		case "PyramidCard": 
			this.color = [240, 220, 0];
			this.building = "Pyramid";
			this.cost = 4;
			this.terrain = "Desert";
			this.terrainRestriction = "Desert";
			break;
		case "MineCard":
			this.color = [125, 125, 125];
			this.building = "Mine";
			this.cost = 3;
			this.terrain = "Mountain";
			this.terrainRestriction = "Mountain";
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
		}
		if(this.building != 0)	
			image(drawBuilding(this.building, "Neutral"), this.x, this.y);
	}

	this.drawMyCost = function () {
		if(!this.pickedUp) {
			if(whiteTurn)
				text(Math.max((this.cost - whiteNumberOfMines), 0) + " gold", this.x + 75, this.y + 30);			
			else
				text(Math.max((this.cost - blackNumberOfMines), 0) + " gold", this.x + 75, this.y + 30);
		} 


	}

	this.moveDownPickupInList = function() {
		if(this.y >= this.moveDownTarget) {
			this.moveDown = false;
			this.moveDownTarget = null;	
		}
		if(this.moveDown == true)
			this.y = this.y + 2; 		//Animationshastigheten för pickup-line:en
	}
}
