


var storedPopupAnimations = [];

function addPopupAnimation (x, y, tex, dur, col, teamColor) {
	storedPopupAnimations.push([x, y, tex, dur, col, teamColor]);
}


var popupAnimationSize = 30;

function playPopupAnimations () {
	if(storedPopupAnimations.length > 0) {
		for(var i = 0; i < storedPopupAnimations.length; i++) {
			if(storedPopupAnimations[i][3] > 0) {
				storedPopupAnimations[i][3] -= 1;
				if(storedPopupAnimations[i][5] != "Text") {
					fill(storedPopupAnimations[i][4]);
					ellipse(storedPopupAnimations[i][0]-5, storedPopupAnimations[i][1]-30 + storedPopupAnimations[i][3]/4, popupAnimationSize, popupAnimationSize);	
					fill(0);
					text(storedPopupAnimations[i][2], storedPopupAnimations[i][0]+-4, storedPopupAnimations[i][1]-7 + storedPopupAnimations[i][3]/4);	
					fill(storedPopupAnimations[i][5]);
					rect(storedPopupAnimations[i][0]+25, storedPopupAnimations[i][1]-30 + storedPopupAnimations[i][3]/4, popupAnimationSize, popupAnimationSize)					
				}
				else if(storedPopupAnimations[i][5] == "Text") {
					fill(51);
					rect(storedPopupAnimations[i][0]-10, storedPopupAnimations[i][1]-30 + storedPopupAnimations[i][3]/4, popupAnimationSize*3, popupAnimationSize)					
					fill(storedPopupAnimations[i][4]);
					text(storedPopupAnimations[i][2], storedPopupAnimations[i][0]+-4, storedPopupAnimations[i][1]-7 + storedPopupAnimations[i][3]/4);	
				}
					
			
			}
			else 
				storedPopupAnimations.splice(i, 1);
		}
	}
} 
