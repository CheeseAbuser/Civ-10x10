
function pauseTimerStart(frames) {
		playPause = true;
		pauseTime = frames;
		//print("PAUSE STARTING!")
		//print("pauseTime: " + pauseTime);
		//print("playPause: " + playPause);
}

function pauseTimerCountdown() {
	if(pauseTime > 0)
		pauseTime = pauseTime - 1;
	else {
		playPause = false;

		//print("PAUSE ENDING!")
		//print("pauseTime: " + pauseTime);
		//print("playPause: " + playPause);
		
	}
}

function startNextTurn ()
{
	kingHasBeenMovedThisTurn = false;
	currentPlayerHasPlacedPickup = false;
	whiteTurn = !whiteTurn;
	for(var i = 0; i < allGridSpaces.length; i++) {
		if(allGridSpaces[i].team == "White" && whiteTurn == true)
			allGridSpaces[i].startOfTurnTrigger();
		else if(allGridSpaces[i].team == "Black" && whiteTurn == false)
			allGridSpaces[i].startOfTurnTrigger();

	}
	if(whiteTurn)
		currentPlayersGold = whiteGold;
	else
		currentPlayersGold = blackGold;

	pauseTimerStart(35);
	for(var j = 0; j < pickupIndexThatWasPlaced; j++) {
		pickups[j].moveDown = true;		
	}
		var newPickup = nextPickup;
		nextPickup = new gridSpacesToPlace(175, 570, scaling);
		newPickup.x = 625;	
		newPickup.y = 125;
		pickups.unshift(newPickup);
}