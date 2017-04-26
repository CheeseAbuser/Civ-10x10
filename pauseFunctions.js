
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

		if(startEndingTurn == true)
		{
			startEndingTurn = false;
			startNextTurn();	
		}

		print("PAUSE ENDING!")
		print("pauseTime: " + pauseTime);
		print("playPause: " + playPause);		
	}
}

function startNextTurn ()
{
	whiteTurn = !whiteTurn;
	for(var i = 0; i < allGridSpaces.length; i++) {
		if(allGridSpaces[i].team == "White" && whiteTurn == true)
			allGridSpaces[i].startOfTurnTrigger();
		else if(allGridSpaces[i].team == "Black" && whiteTurn == false)
			allGridSpaces[i].startOfTurnTrigger();

	}
}