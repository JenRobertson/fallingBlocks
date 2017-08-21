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
const BLOCK_FALL_SPEED_FAST = 10;

const BREAKER_RARITY = 4;//higher is more rare

const BLOCK_IMAGES = [
	document.getElementById("block1"),
	document.getElementById("block2"),
	document.getElementById("block3"),
	document.getElementById("block4")
];
const BREAKER_IMAGES = [
	document.getElementById("breaker1"),
	document.getElementById("breaker2"),
	document.getElementById("breaker3"),
	document.getElementById("breaker4")
];

var fallingBlock = [];
var blockLayout;
var currentBlockFallSpeed = BLOCK_FALL_SPEED_SLOW;

window.onload = function () {
	c = document.getElementById("myCanvas");

	c.width = BOARD_WIDTH + BOARD_MARGIN_LEFT + BOARD_MARGIN_RIGHT;
	c.height = BOARD_HEIGHT + BOARD_MARGIN_TOP + BOARD_MARGIN_BOTTOM;

	ctx = c.getContext("2d");

	spawnFallingBlocks();
	blockLayout = generateBlocksArray();
	window.requestAnimationFrame(frame);
}

function frame(){
	ctx.clearRect(0, 0, c.width, c.height);

	drawBoardArea();
	updateFallingBlocks();
	drawBlock(fallingBlock[0]);
	drawBlock(fallingBlock[1]);

	drawBlocks();

	window.requestAnimationFrame(frame);
}

function spawnFallingBlocks(){
	//middle block
	fallingBlock[0] = {
		x: BLOCK_WIDTH * 3,
		y: -BLOCK_HEIGHT,
		type: getRandomBlockType(),
		color: Math.floor((Math.random() * 4) + 0),//colour
		column: 3,
		row: -2,
		destinationY: BLOCK_HEIGHT * (BLOCKS_PER_COLUMN - 1)
	}
	//flippy block
	fallingBlock[1] = {
		side: 'top',
		x: BLOCK_WIDTH * 3,
		y: -(BLOCK_HEIGHT * 2),
		type: getRandomBlockType(),
		color: Math.floor((Math.random() * 4) + 0),//colour
		column: 3,
		row: -1,
		destinationY: BLOCK_HEIGHT * (BLOCKS_PER_COLUMN - 2)
	}
}

function getRandomBlockType(){
	const random = Math.floor((Math.random() * BREAKER_RARITY) + 0);
	//8 types
	//breakers are.. 4 times less likely
	if(random < 1){
		return 'breaker';
	}
		return 'block';
}

function drawBoardArea(){
	ctx.fillStyle=BOARD_COLOR;
	ctx.fillRect(BOARD_MARGIN_LEFT,BOARD_MARGIN_TOP,BOARD_WIDTH,BOARD_HEIGHT);
	ctx.rect(BOARD_MARGIN_LEFT,BOARD_MARGIN_TOP,BOARD_WIDTH,BOARD_HEIGHT);
	ctx.stroke();
	ctx.fillStyle='#000000';
}

function calculateRow(block){
	if(block.y > 0){
		return Math.ceil(block.y/BLOCK_HEIGHT);
	}
	return 0;
}

function updateFallingBlocks(){
	//1
	checkIfHasBlocksToLeftOrRight(fallingBlock[0]);
	fallingBlock[0].row = calculateRow(fallingBlock[0]);

	fallingBlock[0].destinationY = getAvailableSpace(fallingBlock[0].column).y;

	if(fallingBlock[0].y < fallingBlock[0].destinationY){//if its falling
		fallingBlock[0].y+= currentBlockFallSpeed;
	}
	else{//its at destination
		blockLayout[fallingBlock[0].column][getAvailableRow(fallingBlock[0].column)] = fallingBlock[0];
	}
	//2
	checkIfHasBlocksToLeftOrRight(fallingBlock[1]);
	fallingBlock[1].row = calculateRow(fallingBlock[1]);

	fallingBlock[1].destinationY = getAvailableSpace(fallingBlock[1].column).y;

	if(fallingBlock[1].y < fallingBlock[1].destinationY){//if its falling
		fallingBlock[1].y+= currentBlockFallSpeed;
	}
	else{//its at destination
		blockLayout[fallingBlock[1].column][getAvailableRow(fallingBlock[1].column)] = fallingBlock[1];
		spawnFallingBlocks();//DONT COPY THIS TO THE OTHER ONE FOR GODS SAKE
	}

}

function checkIfHasBlocksToLeftOrRight(block){
    if(blockLayout[block.column - 1] && blockLayout[block.column - 1][block.row] && blockLayout[block.column - 1][block.row].type){
    	block.hasBlockToLeft = true;
    }
    else{
    	block.hasBlockToLeft = false;
    }

    if(blockLayout[block.column + 1] && blockLayout[block.column + 1][block.row] && blockLayout[block.column + 1][block.row].type){
    	block.hasBlockToRight = true;
    }
    else{
    	block.hasBlockToRight = false;
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

function getAvailableRow(column){
	for (row = 0; row < BLOCKS_PER_COLUMN; row++) {
		if(blockLayout[column][row].type){
			return row - 1;
		}
	}
	return 12;
	//todo: handle a row being full
}
