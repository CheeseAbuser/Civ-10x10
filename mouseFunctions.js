function mouseClicked() {
	if(mouseX > 600 && mouseX < 700 && mouseY > 600 && mouseY < 650) {
		//startEndingTurn = true;
		if(currentPlayerHasPlacedPickup == true) {
			startNextTurn();			
		}
	}
}



function mousePressed () {
	var currentPlayersReducedCost = 0;
	if(whiteTurn)
		currentPlayersReducedCost = whiteNumberOfMines;
	else
		currentPlayersReducedCost = blackNumberOfMines;		
	if(currentPlayerHasPlacedPickup == false && playPause == false) {
		if(mouseX > 625 && mouseX < 675) {
			for(var i = 0; i < 5; i++) {
				if(mouseY > 125+i*75 && mouseY < 175+i*75 && (pickups[i].cost - currentPlayersReducedCost) <= currentPlayersGold) {
					print("Test");
					pickups[i].pickedUp = true;
					pickupIsPickedUp = true;
				}		
			}				
		}
		else if(mouseX > 0 && mouseX < 500) {  
			if(kingHasBeenMovedThisTurn == false && currentPlayerHasPlacedPickup == false) {	//Om kungen inte har flyttats denna turn och om en byggnad ännu inte är placerad:
				var curPosX = (Math.floor(mouseX/scaling));
				var curPosY = (Math.floor(mouseY/scaling));	
				oldKingPosX = curPosX;
				oldKingPosY = curPosY;
				if(whiteTurn) {
					if(grid[curPosX][curPosY].whiteKing == true) {
						grid[curPosX][curPosY].whiteKing = false;
						kingPickedUp = true;
						grid[curPosX][curPosY].whiteKing == false;
					}				
				}
				else {
					if(grid[curPosX][curPosY].blackKing == true) {
						grid[curPosX][curPosY].blackKing = false;
						kingPickedUp = true;
						grid[curPosX][curPosY].whiteKing == false;
					}				
				}				
			}
		}
	}	
//	print("Mouse coordinates: (" + mouseX + " , " + mouseY + ")");
}

var pickupIndexThatWasPlaced = -1;

function mouseReleased() {
	var curPosX = (Math.floor(mouseX/scaling));
	var curPosY = (Math.floor(mouseY/scaling));
	//KINGS:
	if(kingPickedUp == true)
	{
		kingPickedUp = false;
		if(mouseX > 500  || mouseX < 0 || mouseY > 500 || mouseY < 0 ) {	 //Kollar om musen är utanför brädet när kungen släpps, eller om kungen släpps på vatten.
			if(whiteTurn)
				grid[oldKingPosX][oldKingPosY].whiteKing = true;
			else
				grid[oldKingPosX][oldKingPosY].blackKing = true;
			print("King dropped outside of board. Returning to previous position.");
		}
		else if(curPosX < oldKingPosX-1 || curPosX > oldKingPosX+1 || curPosY < oldKingPosY-1 || curPosY > oldKingPosY+1) {
			if(whiteTurn)
				grid[oldKingPosX][oldKingPosY].whiteKing = true;
			else
				grid[oldKingPosX][oldKingPosY].blackKing = true;
			print("King can only be moved at most one area per turn. Returning to previous position.");				
		}
		else if( grid[curPosX][curPosY].terrain == "Sea" )
		{
			if(whiteTurn)
				grid[oldKingPosX][oldKingPosY].whiteKing = true;
			else
				grid[oldKingPosX][oldKingPosY].blackKing = true;
			print("King dropped on Sea terrain. Returning to previous position.");			
		}
		else if((whiteTurn && grid[curPosX][curPosY].blackKing == true) || (!whiteTurn && grid[curPosX][curPosY].whiteKing == true)) {
			if(whiteTurn)
				grid[oldKingPosX][oldKingPosY].whiteKing = true;
			else
				grid[oldKingPosX][oldKingPosY].blackKing = true;
			print("A king cannot be moved to a space occupied by the opposing King. Returning to previous position.");						
		}
		else {
			if(curPosX == oldKingPosX && curPosY == oldKingPosY) {
				if(whiteTurn)
					grid[oldKingPosX][oldKingPosY].whiteKing = true;
				else
					grid[oldKingPosX][oldKingPosY].blackKing = true;
				print("Player has chosen to not move his or her King this turn.");				
			}
			pauseTimerStart(5);
			kingHasBeenMovedThisTurn = true;
			if(whiteTurn) {
				grid[curPosX][curPosY].whiteKing = true;
				whiteKingX = curPosX;
				whiteKingY = curPosY;
			}
			else {
				grid[curPosX][curPosY].blackKing = true;
				blackKingX = curPosX;
				blackKingY = curPosY;
			}
		}
	}

	//PICKUPS: 
	pickupIsPickedUp = false;
	for(var i = 0; i<pickups.length; i++) {
		if(pickups[i].pickedUp == true) {
			if(mouseX > 500  || mouseX < 0 || mouseY > 500 || mouseY < 0) {
				print("Dropped outside of board!");
				pickups[i].x = pickupAreas[i][0];
				pickups[i].y = pickupAreas[i][1];
				pickups[i].pickedUp = false;
			}
			else if(whiteTurn && (curPosX < whiteKingX-1 || curPosX > whiteKingX+1 || curPosY < whiteKingY-1 || curPosY > whiteKingY+1))
			{
				print("Not placed adjacent to current players king!");
				pickups[i].x = pickupAreas[i][0];
				pickups[i].y = pickupAreas[i][1];
				pickups[i].pickedUp = false;
			}
			else if(!whiteTurn && (curPosX < blackKingX-1 || curPosX > blackKingX+1 || curPosY < blackKingY-1 || curPosY > blackKingY+1))
			{
				print("Not placed adjacent to current players king!");
				pickups[i].x = pickupAreas[i][0];
				pickups[i].y = pickupAreas[i][1];
				pickups[i].pickedUp = false;
			}
			else if((whiteTurn && grid[curPosX][curPosY].blackKing == true) || (!whiteTurn && grid[curPosX][curPosY].whiteKing == true)) {
				print("Can't place buildings or units on the opponents King!");
				pickups[i].x = pickupAreas[i][0];
				pickups[i].y = pickupAreas[i][1];
				pickups[i].pickedUp = false;
			}
			else if(pickups[i].terrainRestriction != 0 && grid[curPosX][curPosY].terrain != pickups[i].terrainRestriction) {
				print("This building needs to be placed on " +  pickups[i].terrainRestriction);
				pickups[i].x = pickupAreas[i][0];
				pickups[i].y = pickupAreas[i][1];
				pickups[i].pickedUp = false;					
			}
			else {
				if(!kingHasBeenMovedThisTurn)
					print("Player has chosen to not move his or her King this turn.");				
				pauseTimerStart(5);
				payCost(pickups[i].cost);				
				grid[curPosX][curPosY].changeToNewSpace(pickups[i]);
				currentPlayerHasPlacedPickup = true;
				for(var j = 0; j <= i; j++) {
					pickups[j].moveDownTarget = pickups[j].y+75;
				}   
				pickupIndexThatWasPlaced = i;
				pickups.splice(i, 1);
						//Vi behöver här inte 		pickups[i].pickedUp = false; eftersom att 		pickups[i] ej längre existerar.   
			}
		}
	}
}

function payCost(baseCost) {
	if(whiteTurn) {
		totalCost = baseCost-whiteNumberOfMines;		
		if(totalCost < 0)
			totalCost = 0;
		whiteGold = whiteGold - totalCost;
		print("White pays " + totalCost + " gold");					
	}
	else {
		totalCost = baseCost-blackNumberOfMines;
		if(totalCost < 0)
			totalCost = 0;
		blackGold = blackGold - totalCost;
		print("Black pays " + totalCost + " gold");					
	}
}