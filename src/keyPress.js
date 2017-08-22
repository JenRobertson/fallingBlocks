document.onkeydown = function(e) {
	    switch (e.keyCode) {
	        case 37:
				left();
	        	break;
	       	case 38:
				up();
	        	break;
	        case 39:
				right();
	            break;
	        case 32:
				currentBlockFallSpeed = BLOCK_FALL_SPEED_FAST;
	            break;
	    }
	};

document.onkeyup = function(e) {
    switch (e.keyCode) {
        case 32:
            //SPACE
            currentBlockFallSpeed = BLOCK_FALL_SPEED_SLOW;
            break;
       }
};

function left(){
	var isNotAtEdge = fallingBlock[0].column > 0 && fallingBlock[1].column > 0;
	var isNotBlocked = !fallingBlock[0].hasBlockToLeft && !fallingBlock[1].hasBlockToLeft;

	if(isNotAtEdge && isNotBlocked){
		moveLeft(fallingBlock[0]);
		moveLeft(fallingBlock[1]);
	}
}

function right(){
	var isNotAtEdge = fallingBlock[0].column < BLOCKS_PER_ROW -1 && fallingBlock[1].column < BLOCKS_PER_ROW -1;
	var isNotBlocked = !fallingBlock[0].hasBlockToRight && !fallingBlock[1].hasBlockToRight;

	if(isNotAtEdge && isNotBlocked){
		moveRight(fallingBlock[0]);
		moveRight(fallingBlock[1]);
	}
}

//bottom remains still
var flipCount = 0;

function up(){
	console.log(flipCount);
	const isOnRightEdge = fallingBlock[0].column === BLOCKS_PER_ROW - 1;
	const isOnLeftEdge = fallingBlock[0].column === 0;

	if(flipCount === 0){
		if(fallingBlock[0].hasBlockToLeft) return;
		if(isOnLeftEdge) return;
		flipToLeft();
		console.log('here')
		flipCount++;
	}
	else if(flipCount === 1){
		if(fallingBlock[0].hasBlockBelow) return;
		flipToDown();
		flipCount++;
	}
	else if(flipCount === 2){
		if(fallingBlock[0].hasBlockToRight) return;
		if(isOnRightEdge) return;
		flipToRight();
		flipCount++;
	}
	else if(flipCount === 3){
		flipToUp();
		flipCount++;
	}

	if(flipCount > 3){
		flipCount = 0;
	}
}
