function setNewYandX(){
  for (column = 0; column < BLOCKS_PER_ROW; column++) {
		for (row = 0; row < BLOCKS_PER_COLUMN; row++) {
      blockLayout[column][row].x = BLOCK_WIDTH * column;
			blockLayout[column][row].newY = BLOCK_HEIGHT * row;
    }
  }
}

function animateBlocks(){
  setNewYandX();
  var somethingAnimated = false;
  for (column = 0; column < BLOCKS_PER_ROW; column++) {
		for (row = 0; row < BLOCKS_PER_COLUMN; row++) {
      var block = blockLayout[column][row];

      if(block.broken){
        block.breakingDelay++;
      }

      if (block.y < block.newY){
        block.y += BLOCK_FALL_SPEED_SUPER_FAST;
        somethingAnimated = true;

      }
      if (block.y > block.newY){
        block.y = block.newY;
      }
    }
    animationDone = !somethingAnimated;
  }
}
