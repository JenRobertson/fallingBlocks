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
				destinationY: BLOCK_HEIGHT * (BLOCKS_PER_COLUMN - 1),
				breakingDelay: 0
			}
		}
	}
	return blockLayout;
}