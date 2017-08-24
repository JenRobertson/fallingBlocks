function generateBlocksArray(){
	var blockLayout = new Array(BLOCKS_PER_ROW);//columns

	for (column = 0; column < BLOCKS_PER_ROW; column++) {
		blockLayout[column] = new Array(BLOCKS_PER_COLUMN);

		for (row = 0; row < BLOCKS_PER_COLUMN; row++) {
			var x = BLOCK_WIDTH * column;
			var y = BLOCK_HEIGHT * row;

			blockLayout[column][row] = {
				x,
				y,
				type: null,
				colour: null,
				column: column,
				row: row,
				destinationY: BLOCK_HEIGHT * (BLOCKS_PER_COLUMN - 1)
			}
		}
	}
	blockLayout[0][11].type = 'block';
	blockLayout[0][11].colour = 2;

	blockLayout[5][12].type = 'block';
	blockLayout[5][12].colour = 3;

	blockLayout[5][11].type = 'block';
	blockLayout[5][11].colour = 0;

	blockLayout[5][10].type = 'block';
	blockLayout[5][10].colour = 1;


	blockLayout[0][12].type = 'block';
	blockLayout[0][12].colour = 1;

	blockLayout[1][12].type = 'block';
	blockLayout[1][12].colour = 1;

	// blockLayout[2][12].type = 'block';
	// blockLayout[2][12].colour = 1;

	// blockLayout[3][12].type = 'block';
	// blockLayout[3][12].colour = 1;

	blockLayout[4][12].type = 'block';
	blockLayout[4][12].colour = 1;

	blockLayout[5][12].type = 'block';
	blockLayout[5][12].colour = 1;


	return blockLayout;
}
