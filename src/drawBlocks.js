function drawBlock(block){
	ctx.beginPath();

	// ctx.fillRect(BOARD_MARGIN_LEFT + block.x,BOARD_MARGIN_TOP + block.y ,BLOCK_WIDTH,BLOCK_HEIGHT);
    ctx.drawImage(BLOCK_IMAGES[block.type - 1], BOARD_MARGIN_LEFT + block.x,BOARD_MARGIN_TOP + block.y ,BLOCK_WIDTH,BLOCK_HEIGHT);
}

function drawBlocks(){
	for (column = 0; column < BLOCKS_PER_ROW; column++) {
		for (row = 0; row < BLOCKS_PER_COLUMN; row++) {

			var block = blockLayout[column][row];
			if(block.type){
                block.x = BLOCK_WIDTH * column;
                block.y = BLOCK_HEIGHT * row;
				drawBlock(block);
			}

		}
	}
}
