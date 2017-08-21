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

function up(){
	
}