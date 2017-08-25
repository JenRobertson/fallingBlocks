function drawBlock(block){
	ctx.beginPath();

	// ctx.fillRect(BOARD_MARGIN_LEFT + block.x,BOARD_MARGIN_TOP + block.y ,BLOCK_WIDTH,BLOCK_HEIGHT);
	let image;
	if (block.broken === true) return;
	if (block.type === 'block') image = BLOCK_IMAGES[block.colour];
	if (block.type === 'breaker') image = BREAKER_IMAGES[block.colour];

    ctx.drawImage(image, BOARD_MARGIN_LEFT + block.x,BOARD_MARGIN_TOP + block.y ,BLOCK_WIDTH,BLOCK_HEIGHT);
    //ctx.fillText(block.column + ' ' + block.row, BOARD_MARGIN_LEFT + block.x,BOARD_MARGIN_TOP + block.y + 20,BLOCK_WIDTH,BLOCK_HEIGHT);
}

function drawBlocks(){
	for (column = 0; column < BLOCKS_PER_ROW; column++) {
		for (row = 0; row < BLOCKS_PER_COLUMN; row++) {

			var block = blockLayout[column][row];

			if(block.type){
				drawBlock(blockLayout[column][row]);
			}
		}
	}
}

function drawBoardArea(){
	ctx.fillStyle=BOARD_COLOUR;
	ctx.fillRect(BOARD_MARGIN_LEFT,BOARD_MARGIN_TOP,BOARD_WIDTH,BOARD_HEIGHT);
	ctx.rect(BOARD_MARGIN_LEFT,BOARD_MARGIN_TOP,BOARD_WIDTH,BOARD_HEIGHT);
	ctx.stroke();
	ctx.fillStyle='#000000';
}
