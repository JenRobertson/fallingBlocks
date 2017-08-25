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
const BOARD_COLOUR = '#a996e4';

const BLOCK_FALL_SPEED_SLOW = 2;
const BLOCK_FALL_SPEED_FAST = 15;
const BLOCK_FALL_SPEED_SUPER_FAST = 25;

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
var nothingBroke = true;

window.onload = function () {
	c = document.getElementById("myCanvas");

	c.width = BOARD_WIDTH + BOARD_MARGIN_LEFT + BOARD_MARGIN_RIGHT;
	c.height = BOARD_HEIGHT + BOARD_MARGIN_TOP + BOARD_MARGIN_BOTTOM;

	ctx = c.getContext("2d");

	spawnFallingBlocks();
	blockLayout = generateBlocksArray();
	console.log(blockLayout);
	window.requestAnimationFrame(frame);
}

function frame(){
	ctx.clearRect(0, 0, c.width, c.height);

	drawBoardArea();
	updateFallingBlocks();
	animateBlocks();
	breakEverything();
	drawBlock(fallingBlock[0]);
	drawBlock(fallingBlock[1]);
	drawBlocks();

	if(nothingBroke){
		removeBrokenBlocks();
	}

	window.requestAnimationFrame(frame);
}

function spawnFallingBlocks(){
	//middle block
	fallingBlock[0] = {
		x: BLOCK_WIDTH * 3,
		y: -BLOCK_HEIGHT,
		type: getRandomBlockType(),
		colour: Math.floor((Math.random() * 4) + 0),//colour
		column: 3,
		row: -2,
		destinationY: BLOCK_HEIGHT * (BLOCKS_PER_COLUMN - 1),

	}
	//flippy block
	fallingBlock[1] = {
		side: 'top',
		x: BLOCK_WIDTH * 3,
		y: -(BLOCK_HEIGHT * 2),
		type: getRandomBlockType(),
		colour: Math.floor((Math.random() * 4) + 0),//colour
		column: 3,
		row: -1,
		destinationY: BLOCK_HEIGHT * (BLOCKS_PER_COLUMN - 2),
		side: 'up'
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
