function moveLeft(block){
		block.x-=BLOCK_WIDTH;
		block.column--;
}

function moveRight(block){
	var isNotAtEdge = block.column < BLOCKS_PER_ROW -1;
	if(isNotAtEdge && !block.hasBlockToRight){
		block.x+=BLOCK_WIDTH;
		block.column++;
	}
}

function flipToLeft(){
	fallingBlock[1].y=fallingBlock[0].y;
	fallingBlock[1].x=fallingBlock[0].x - BLOCK_WIDTH;
	fallingBlock[1].column = fallingBlock[0].column - 1;
	fallingBlock[1].side = 'left';
}

function flipToDown(){
	fallingBlock[1].y=fallingBlock[0].y + BLOCK_WIDTH + 8;
	fallingBlock[1].x=fallingBlock[0].x;
	fallingBlock[1].column = fallingBlock[0].column;
	fallingBlock[1].side = 'down';
}

function flipToRight(){
	fallingBlock[1].y=fallingBlock[0].y;
	fallingBlock[1].x=fallingBlock[0].x + BLOCK_WIDTH;
	fallingBlock[1].column = fallingBlock[0].column + 1;
	fallingBlock[1].side = 'right';
}

function flipToUp(){
	fallingBlock[1].y=fallingBlock[0].y - BLOCK_WIDTH;
	fallingBlock[1].x=fallingBlock[0].x;
	fallingBlock[1].column = fallingBlock[0].column;
	fallingBlock[1].side = 'up';
}