function drawBlock(block){
	ctx.beginPath();

	let type;
	if (block.type === 'block') type = 0;
	if (block.type === 'breaker') type = 1;

	//sprite must be 4 x 2 with breakers at bottom
    ctx.drawImage(BLOCK_SPRITE, (block.colour * BLOCK_WIDTH), (type * BLOCK_HEIGHT), BLOCK_WIDTH, BLOCK_HEIGHT, BOARD_MARGIN_LEFT + block.x,BOARD_MARGIN_TOP + block.y, BLOCK_WIDTH, BLOCK_HEIGHT);
   	
   	if(block.type === 'block' && !block.combined){
   		ctx.strokeStyle = '#000';
		ctx.lineWidth = 0.5; 
		ctx.strokeRect(BOARD_MARGIN_LEFT + block.x,BOARD_MARGIN_TOP + block.y ,BLOCK_WIDTH,BLOCK_HEIGHT);
   	}
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
	//draw b
	ctx.drawImage(BG,0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	ctx.globalAlpha = 0.7;

	ctx.fillStyle=BOARD_COLOUR;
	ctx.fillRect(BOARD_MARGIN_LEFT,BOARD_MARGIN_TOP,BOARD_WIDTH,BOARD_HEIGHT);//play area

	ctx.globalAlpha =1;


	ctx.rect(BOARD_MARGIN_LEFT,BOARD_MARGIN_TOP,BOARD_WIDTH,BOARD_HEIGHT);
	ctx.stroke();
}
