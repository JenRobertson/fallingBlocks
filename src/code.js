const BLOCKS_PER_ROW = 6;
const BLOCKS_PER_COLUMN = 13;
const BLOCK_WIDTH = 52;
const BLOCK_HEIGHT = 60;

const BOARD_WIDTH = BLOCKS_PER_ROW * BLOCK_WIDTH;
const BOARD_HEIGHT = BLOCKS_PER_COLUMN * BLOCK_HEIGHT;
const BOARD_MARGIN_TOP = 5;
const BOARD_MARGIN_LEFT = 100;
const BOARD_MARGIN_BOTTOM = 50;
const BOARD_MARGIN_RIGHT = 100;
const BOARD_COLOR = '#a996e4';

const BLOCK_FALL_SPEED_SLOW = 1;
const BLOCK_FALL_SPEED_FAST = 5;
var currentBlockFallSpeed = BLOCK_FALL_SPEED_SLOW;

var blockLayout;
var fallingBlock;

window.onload = function () {
	c = document.getElementById("myCanvas");

	c.width = BOARD_WIDTH + BOARD_MARGIN_LEFT + BOARD_MARGIN_RIGHT;
	c.height = BOARD_HEIGHT + BOARD_MARGIN_TOP + BOARD_MARGIN_BOTTOM;

	ctx = c.getContext("2d");

	blockLayout = generateBlocksArray();
	console.log(blockLayout);


	fallingBlock = {
		x: 0,
		y: 0,
		type: 1,
		column: 0,
		row: 0,
		destinationY: BLOCK_HEIGHT * (BLOCKS_PER_COLUMN - 1)
	}

	document.onkeydown = function(e) {
	    switch (e.keyCode) {
	        case 37:
	            //left
	            var isNotAtEdge = fallingBlock.column > 0;

	            if(isNotAtEdge && !fallingBlock.hasBlockToLeft){
	            	fallingBlock.x-=BLOCK_WIDTH;
	            	fallingBlock.column--;
	        	}
	            break;
	        case 39:
	            //right
	            var isNotAtEdge = fallingBlock.column < BLOCKS_PER_ROW -1;

	            if(isNotAtEdge && !fallingBlock.hasBlockToRight){
	            	fallingBlock.x+=BLOCK_WIDTH;
	            	fallingBlock.column++;
	            }
	            break;
	        case 32:
	            //SPACE
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


	window.requestAnimationFrame(frame);
}

function frame(){
	ctx.clearRect(0, 0, c.width, c.height);

	drawBoardArea();

	updateFallingBlock();
	drawBlock(fallingBlock);
	drawBlocks();

	window.requestAnimationFrame(frame);
}

function drawBoardArea(){
	ctx.fillStyle=BOARD_COLOR;
	ctx.fillRect(BOARD_MARGIN_LEFT,BOARD_MARGIN_TOP,BOARD_WIDTH,BOARD_HEIGHT);
	ctx.rect(BOARD_MARGIN_LEFT,BOARD_MARGIN_TOP,BOARD_WIDTH,BOARD_HEIGHT);
	ctx.stroke();
	ctx.fillStyle='#000000';
}



function updateFallingBlock(){
	checkIfHasBlocksToLeftOrRight();
	fallingBlock.row = Math.ceil(fallingBlock.y/BLOCK_HEIGHT);
	fallingBlock.destinationY = getAvailableSpace(fallingBlock.column).y;

	if(fallingBlock.y < fallingBlock.destinationY){//if its falling
		fallingBlock.y+= currentBlockFallSpeed;
	}
	else{//its at destination
		
	}
}

function checkIfHasBlocksToLeftOrRight(){
    if(blockLayout[fallingBlock.column - 1] && blockLayout[fallingBlock.column - 1][fallingBlock.row].type){
    	fallingBlock.hasBlockToLeft = true;
    }
    else{
    	fallingBlock.hasBlockToLeft = false;
    }

    if(blockLayout[fallingBlock.column + 1] && blockLayout[fallingBlock.column + 1][fallingBlock.row].type){
    	fallingBlock.hasBlockToRight = true;
    }
    else{
    	fallingBlock.hasBlockToRight = false;
    }
}

function getAvailableSpace(column){
	for (row = 0; row < BLOCKS_PER_COLUMN; row++) {
		if(blockLayout[column][row].type){
			return blockLayout[column][row - 1];
		}
	}	
	return {y: BOARD_HEIGHT - BLOCK_HEIGHT};
	//todo: handle a row being full
}

