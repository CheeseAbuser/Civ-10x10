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
