function drawBuilding(building, team) {
	if(building == "Pyramid") {
		if(team == "White")
			return imgPyramidWhite;
		else if(team == "Black")
			return imgPyramidBlack;	
		else if(team == "Neutral")
			return imgPyramidBlack;	
	}
	else if(building == "Mine") {
		if(team == "White")
			return imgWhiteMine;
		else if(team == "Black")
			return imgBlackMine;
		else if(team == "Neutral")
			return imgBlackMine;
	}
	else if(building == "Lumbermill") {
		if(team == "White")
			return imgWhiteLumbermill;
		else if(team == "Black")
			return imgBlackLumbermill;
		else if(team == "Neutral")
			return imgBlackLumbermill;
	}
}

function drawKing(isWhiteKing, isBlackKing) {
		if(isWhiteKing == true) 
			return imgWhiteKing;
		if(isBlackKing == true)
			return imgBlackKing;	
}

function drawBorderAroundKing() {
	strokeWeight(3); 					
	noFill();
	if(whiteTurn) {
		stroke(255);
		if(whiteKingX == 0) {
			if(whiteKingY == 0)
				rect(whiteKingX*scaling+2, whiteKingY*scaling+2, scaling*2-4, scaling*2-4);	 
			else if(whiteKingY == 9)
				rect(whiteKingX*scaling-scaling+2, whiteKingY*scaling+2, scaling*2-4, scaling*2-4);	 
			else
				rect(whiteKingX*scaling+2, whiteKingY*scaling-scaling+2, scaling*2-4, scaling*3-4);	 
		}
		else if(whiteKingX == 9) {
			if(whiteKingY == 0)
				rect(whiteKingX*scaling-scaling+2, whiteKingY*scaling+2, scaling*2-4, scaling*2-4);	 
			else if(whiteKingY == 9)
				rect(whiteKingX*scaling-scaling+2, whiteKingY*scaling-scaling+2, scaling*2-4, scaling*2-4);	 
			else
				rect(whiteKingX*scaling-scaling+2, whiteKingY*scaling-scaling+2, scaling*2-4, scaling*3-4);	 
		}
		else {
			if(whiteKingY == 0)
				rect(whiteKingX*scaling-scaling+2, whiteKingY*scaling+2, scaling*3-4, scaling*2-4);	 
			else if(whiteKingY == 9)
				rect(whiteKingX*scaling-scaling+2, whiteKingY*scaling-scaling+2, scaling*3-4, scaling*2-4);	 
			else
				rect(whiteKingX*scaling-scaling+2, whiteKingY*scaling-scaling+2, scaling*3-4, scaling*3-4);	 
		}			
		
	}
	else {
		if(blackKingX == 0) {
			if(blackKingY == 0)
				rect(blackKingX*scaling+2, blackKingY*scaling+2, scaling*2-4, scaling*2-4);	 
			else if(blackKingY == 9)
				rect(blackKingX*scaling-scaling+2, blackKingY*scaling+2, scaling*2-4, scaling*2-4);	 
			else
				rect(blackKingX*scaling+2, blackKingY*scaling-scaling+2, scaling*2-4, scaling*3-4);	 
		}
		else if(blackKingX == 9) {
			if(blackKingY == 0)
				rect(blackKingX*scaling-scaling+2, blackKingY*scaling+2, scaling*2-4, scaling*2-4);	 
			else if(blackKingY == 9)
				rect(blackKingX*scaling-scaling+2, blackKingY*scaling-scaling+2, scaling*2-4, scaling*2-4);	 
			else
				rect(blackKingX*scaling-scaling+2, blackKingY*scaling-scaling+2, scaling*2-4, scaling*3-4);	 
		}
		else {
			if(blackKingY == 0)
				rect(blackKingX*scaling-scaling+2, blackKingY*scaling+2, scaling*3-4, scaling*2-4);	 
			else if(blackKingY == 9)
				rect(blackKingX*scaling-scaling+2, blackKingY*scaling-scaling+2, scaling*3-4, scaling*2-4);	 
			else
				rect(blackKingX*scaling-scaling+2, blackKingY*scaling-scaling+2, scaling*3-4, scaling*3-4);	 
		}			
	}	
}
