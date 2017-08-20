const BLOCKS_PER_ROW = 6;
const BLOCKS_PER_COLUMN = 13;
const BLOCK_WIDTH = 52;
const BLOCK_HEIGHT = 60;

const BOARD_WIDTH = BLOCKS_PER_ROW * BLOCK_WIDTH;
const BOARD_HEIGHT = BLOCKS_PER_COLUMN * BLOCK_HEIGHT;
const BOARD_MARGIN_TOP = 100;
const BOARD_MARGIN_LEFT = 100;
const BOARD_MARGIN_BOTTOM = 100;
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

	fallingBlock = {
		x: 0,
		y: 0,
		type: 1
	}

	document.onkeydown = function(e) {
	    switch (e.keyCode) {
	        case 37:
	            //left
	            if(fallingBlock.x >= BLOCK_WIDTH){

	            	fallingBlock.x-=BLOCK_WIDTH;
	        	}
	            break;
	        case 39:
	            //right
	            if(fallingBlock.x < BOARD_WIDTH - BLOCK_WIDTH){
	            	fallingBlock.x+=BLOCK_WIDTH;
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
	
	fallingBlock.y+= currentBlockFallSpeed;
	drawBlock(fallingBlock);

	window.requestAnimationFrame(frame);
}


const block= {
	x: 5
}

function drawBoardArea(){
	ctx.fillStyle=BOARD_COLOR;
	ctx.fillRect(BOARD_MARGIN_LEFT,BOARD_MARGIN_TOP,BOARD_WIDTH,BOARD_HEIGHT);
	ctx.rect(BOARD_MARGIN_LEFT,BOARD_MARGIN_TOP,BOARD_WIDTH,BOARD_HEIGHT);
	ctx.stroke();
	ctx.fillStyle='#000000';
}

function drawBlock(block){
	ctx.beginPath();
	ctx.fillStyle='#FF0000';
	ctx.fillRect(BOARD_MARGIN_TOP + block.x,BOARD_MARGIN_TOP + block.y ,BLOCK_WIDTH,BLOCK_HEIGHT);
	// ctx.rect(BOARD_MARGIN_TOP + block.x,BOARD_MARGIN_TOP + block.y ,BLOCK_WIDTH,BLOCK_HEIGHT);
	// ctx.stroke();
	// ctx.fillStyle='#000000';
}