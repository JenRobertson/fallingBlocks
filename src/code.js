//to do
//- make doubles work TICK
//- add a delay to breaking TICK
//- add breaking animation
//- blocks flip if they are trapped in a one column
//- deal with column being full
//- smashing animation
//- graphics
//- make group of blocks blob together
//- scoring system

const BLOCKS_PER_ROW = 6;
const BLOCKS_PER_COLUMN = 13;
const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 60;

const BOARD_WIDTH = BLOCKS_PER_ROW * BLOCK_WIDTH;
const BOARD_HEIGHT = BLOCKS_PER_COLUMN * BLOCK_HEIGHT;
const BOARD_MARGIN_TOP = 50;
const BOARD_MARGIN_LEFT = 100;
const BOARD_MARGIN_BOTTOM = 5;
const BOARD_MARGIN_RIGHT = 100;
const BOARD_COLOUR = '#FFFFFF';

const CANVAS_WIDTH = BOARD_WIDTH + BOARD_MARGIN_LEFT + BOARD_MARGIN_RIGHT;
const CANVAS_HEIGHT = BOARD_HEIGHT + BOARD_MARGIN_TOP + BOARD_MARGIN_BOTTOM;

const BLOCK_FALL_SPEED_SLOW = 2;
const BLOCK_FALL_SPEED_FAST = 15;
const BLOCK_FALL_SPEED_SUPER_FAST = 25;

const BREAKING_DELAY = 20;//higher is more rare
const BREAKER_RARITY = 4;//higher is more rare


const BLOCK_SPRITE = document.getElementById("blockSprite");
const BG = document.getElementById("bg");
const OVERLAY = document.getElementById("overlay");

var fallingBlock = [];
var nextFallingBlock = [];

var blockLayout;
var currentBlockFallSpeed = BLOCK_FALL_SPEED_SLOW;
var nothingBroke = true;
var animationDone = false;

window.onload = function () {
	c = document.getElementById("myCanvas");

	c.width = CANVAS_WIDTH;
	c.height = CANVAS_HEIGHT;
	
	ctx = c.getContext("2d");

	spawnNextFallingBlocks();
	spawnFallingBlocks();
	blockLayout = generateBlocksArray();
	console.log(blockLayout);
	window.requestAnimationFrame(frame);
}

function frame(){
	// ctx.clearRect(0, 0, c.width, c.height);

	ctx.clearRect(0,0,10000,500000);

	drawBoardArea();

	updateFallingBlocks();
	animateBlocks();

	if(animationDone){
		breakBreakers();
		breakEverything();
	}

	drawBlock(fallingBlock[0]);
	drawBlock(fallingBlock[1]);
	drawBlock(nextFallingBlock[0]);
	drawBlock(nextFallingBlock[1]);


	// ctx.clearRect(0,0,CANVAS_WIDTH,BOARD_MARGIN_TOP);
	
	drawBlocks();

	if(nothingBroke){
		removeBrokenBlocks();
	}

	//
	combineBlocks();
	// getBoxSize();

	window.requestAnimationFrame(frame);
}


function spawnNextFallingBlocks(){
	nextFallingBlock[0] = {
		colour: Math.floor((Math.random() * 4) + 0),
		type: getRandomBlockType(),
		x: -BOARD_MARGIN_LEFT + 20,
		y: 10 + BLOCK_HEIGHT
	}
	nextFallingBlock[1] = {
		colour: Math.floor((Math.random() * 4) + 0),
		type: getRandomBlockType(),
		x: -BOARD_MARGIN_LEFT + 20,
		y: 10 
	}
}

function spawnFallingBlocks(){
	//middle block
	fallingBlock[0] = {
		x: BLOCK_WIDTH * 3,
		y: -BLOCK_HEIGHT,
		type: nextFallingBlock[0].type,
		colour: nextFallingBlock[0].colour,
		column: 3,
		row: -2,
		destinationY: BLOCK_HEIGHT * (BLOCKS_PER_COLUMN - 1),
		breakingDelay: 0

	}
	//flippy block
	fallingBlock[1] = {
		side: 'top',
		x: BLOCK_WIDTH * 3,
		y: -(BLOCK_HEIGHT * 2),
		type: nextFallingBlock[1].type,
		colour: nextFallingBlock[1].colour,
		column: 3,
		row: -1,
		destinationY: BLOCK_HEIGHT * (BLOCKS_PER_COLUMN - 2),
		side: 'up',
		breakingDelay: 0
	}
	spawnNextFallingBlocks();
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
