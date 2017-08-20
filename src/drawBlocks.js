function drawBlock(block){
	ctx.beginPath();

	switch (block.type) {
        case 1:
            ctx.fillStyle='#FF0000';
            break;
       	case 2:
            ctx.fillStyle='#ffff00';
            break;
        case 3:
            ctx.fillStyle='#00cc00';
            break;
        case 4:
            ctx.fillStyle='#0099ff';
            break;
    }
	ctx.fillRect(BOARD_MARGIN_LEFT + block.x,BOARD_MARGIN_TOP + block.y ,BLOCK_WIDTH,BLOCK_HEIGHT);
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