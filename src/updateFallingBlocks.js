function updateFallingBlocks(){

  updateFallingBlockValues(fallingBlock[0]);
  updateFallingBlockValues(fallingBlock[1]);

  const oneHasLanded = !fallingBlock[0].isFalling && fallingBlock[1].isFalling || fallingBlock[0].isFalling && !fallingBlock[1].isFalling
  var bothHaveLanded = !fallingBlock[0].isFalling && !fallingBlock[1].isFalling;

  if(oneHasLanded){
    if(fallingBlock[1].side === 'left' || fallingBlock[1].side === 'right'){
      currentBlockFallSpeed = BLOCK_FALL_SPEED_SUPER_FAST;
    }
    else{
      bothHaveLanded = true;
    }
  }


  if(bothHaveLanded){
    if(fallingBlock[1].side === 'up'){
      addFallingBlockToArray(fallingBlock[0]);
      addFallingBlockToArray(fallingBlock[1]);
    }
    else{
      addFallingBlockToArray(fallingBlock[1]);
      addFallingBlockToArray(fallingBlock[0]);
    }
    flipCount = 0;
    currentBlockFallSpeed = BLOCK_FALL_SPEED_SLOW;
    breakBreakers();
    spawnFallingBlocks();
  }
}

function updateFallingBlockValues(block){
  checkSurroundingBlocks(block);
  block.row = calculateRow(block);
  block.destinationY = blockLayout[block.column][getColumnHeight(block.column)].y;
  block.isFalling = block.y < block.destinationY;

  if(block.isFalling){//if its falling
    block.y+= currentBlockFallSpeed;
  }
}

function addFallingBlockToArray(block){
  blockLayout[block.column][getColumnHeight(block.column)] = block;
}


function calculateRow(block){
	if(block.y > 0){
		return Math.ceil(block.y/BLOCK_HEIGHT);
	}
	return 0;
}

function checkSurroundingBlocks(block){
	//left
    if(blockLayout[block.column - 1] && blockLayout[block.column - 1][block.row] && blockLayout[block.column - 1][block.row].type){
    	block.hasBlockToLeft = true;
    }
    else{
    	block.hasBlockToLeft = false;
    }

    //right
    if(blockLayout[block.column + 1] && blockLayout[block.column + 1][block.row] && blockLayout[block.column + 1][block.row].type){
    	block.hasBlockToRight = true;
    }
    else{
    	block.hasBlockToRight = false;
    }
    //down
    if(blockLayout[block.column] && blockLayout[block.column][block.row + 1] && blockLayout[block.column][block.row + 1].type){
		block.hasBlockBelow = true;
    }
    else{
    	block.hasBlockBelow = false;
		}
		//up
		if(blockLayout[block.column] && blockLayout[block.column][block.row - 1] && blockLayout[block.column][block.row - 1].type){
			block.hasBlockAbove = true;
		}
		else{
			block.hasBlockAbove = false;
		}
}

function getColumnHeight(column){
	for (row = 0; row < BLOCKS_PER_COLUMN; row++) {
		if(blockLayout[column][row].type){
			return row - 1;
		}
	}
	return 12;
	//todo: handle a row being full
}
