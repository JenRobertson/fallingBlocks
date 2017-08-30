function combineBlocks(){
	for (c = 0; c < BLOCKS_PER_ROW; c++) {
		for (r = 0; r < BLOCKS_PER_COLUMN; r++) {
     		var block = blockLayout[c][r];

			const right = blockLayout[c + 1] && blockLayout[c + 1][r] && blockLayout[c + 1][r].colour;
			const down = blockLayout[c][r + 1] && blockLayout[c][r + 1].colour;
			const downRight =  blockLayout[c + 1] && blockLayout[c + 1][r + 1] && blockLayout[c + 1][r + 1].colour;

			if(block.combined != true && block.colour != null && block.colour === right && block.colour === down && block.colour === downRight){
				console.log('I am the corner of a square');
				block.combined = true;
				blockLayout[c + 1][r].combined = true;
				blockLayout[c][r + 1].combined = true;
				blockLayout[c + 1][r + 1].combined = true;
			}
    	}
  	}
}

//if 

