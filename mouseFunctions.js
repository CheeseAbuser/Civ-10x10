
function mousePressed () {
	if(playPause == false) {
		var currentPlayersGold;
		if(whiteTurn)
			currentPlayersGold = whiteGold;
		else
			currentPlayersGold = blackGold;
		for(var i = 0; i < 5; i++) {
			if(mouseX > 625 && mouseX < 675 && mouseY > 125+i*75 && mouseY < 175+i*75 && pickups[i].cost <= currentPlayersGold) {
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
				if(whiteTurn) {
					whiteGold = whiteGold - pickups[i].cost;
					print("White pays 2 gold");					
				}

				else {
					blackGold = blackGold - pickups[i].cost;
					print("Black pays 2 gold");					
				}

				for(var j = 0; j<=i; j++) {
					pickups[j].moveDown = true;
					pickups[j].moveDownPickupInList(pickups[j].y+75);		
				}
				pickups.splice(i, 1);
				var newPickup = nextPickup;
				nextPickup = new gridSpacesToPlace(175, 570, scaling);
				newPickup.x = 625;
				newPickup.y = 125;
				startEndingTurn = true;
				pickups.unshift(newPickup);
				

			}
		}
		pickups[i].pickedUp = false;
	}

}
