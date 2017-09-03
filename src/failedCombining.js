function combineBlocks(){
	// for (c = 0; c < BLOCKS_PER_ROW; c++) {
	// 	for (r = 0; r < BLOCKS_PER_COLUMN; r++) {
 //     		var block = blockLayout[c][r];

	// 		const right = blockLayout[c + 1] && blockLayout[c + 1][r] && blockLayout[c + 1][r].colour;
	// 		const down = blockLayout[c][r + 1] && blockLayout[c][r + 1].colour;
	// 		const downRight =  blockLayout[c + 1] && blockLayout[c + 1][r + 1] && blockLayout[c + 1][r + 1].colour;

	// 		if(block.combined != true && block.colour != null && block.colour === right && block.colour === down && block.colour === downRight){
	// 			// console.log('I am the corner of a square');
	// 			block.combined = true;
	// 			blockLayout[c + 1][r].combined = true;
	// 			blockLayout[c][r + 1].combined = true;
	// 			blockLayout[c + 1][r + 1].combined = true;
	// 		}
 //    	}
 //  	}
}

//if 

//if the block is combined

function getBoxSize(){
	for (c = 0; c < BLOCKS_PER_ROW; c++) {
		for (r = 0; r < BLOCKS_PER_COLUMN; r++) {
     		var block = blockLayout[c][r];
     		// console.log(block)

     		if(!block.colour) continue;
     		if(isPartOfAnotherSquare(block, c, r)) continue;
     		if(isCornerOfSquare(block, c, r)){
     			block.colour = 0;
	     		const boxStartX = block.x;
	     		const boxStartY = block.y;

	     		//now get the end coordinate!

	     		const bottomRightOfBox = getBottomRightOfBox(block, c, r);
	     		boxWidth = bottomRightOfBox.boxWidth;
	     		boxHeight = bottomRightOfBox.boxHeight;

	     		//draw
	     		ctx.lineWidth=10;
	     		ctx.rect(BOARD_MARGIN_LEFT + boxStartX, BOARD_MARGIN_TOP + boxStartY,BLOCK_WIDTH * boxWidth, BLOCK_HEIGHT * boxHeight);
				ctx.stroke();
				ctx.lineWidth=0.1;
			}
    	}
  	}
}



function getBottomRightOfBox(startBlock, column, row){
	let c = column;
	let r = row;
	let right = blockLayout[c + 1] && blockLayout[c + 1][r] && blockLayout[c + 1][r].colour;
	let down = blockLayout[c][r + 1] && blockLayout[c][r + 1].colour;
	let boxWidth = 1;
	let boxHeight = 1;

	while(startBlock.colour === right){
		boxWidth++;
		c++;
		right = blockLayout[c + 1] && blockLayout[c + 1][r] && blockLayout[c + 1][r].colour;
	}
// console.log(c)

	// while(startBlock.colour === down){
	// 	boxHeight++;
	// 	c++;
	// 	down = blockLayout[c][r + 1] && blockLayout[c][r + 1].colour;
	// }

	for (moo = column; moo < c; moo++) {
		//for each column that we found
		//see how far down it goes
		for (roo = row; roo < 14; roo++) {//for each block in column
// console.log('poo')
	// console.log(blockLayout[moo][roo].colour,startBlock.colour)
			if(!blockLayout[moo][roo] || blockLayout[moo][roo].colour != startBlock.colour  ){//we have found the end
				if(moo === column){//its the first row
					const maxHeight = roo - row;
					boxHeight = roo - row;
				}

				// const thisHeight = roo-row;
				// if(thisHeight != boxHeight){
				// 	//remove this row
				// }

				// //set the height to be this ones height.
				// boxHeight = thisHeight;
				
			}
			// else{//if its the right colour

			// }

			// console.log(moo, roo)
		
		}

	}





	return {boxWidth, boxHeight}
}

function isPartOfAnotherSquare(block, c, r){
	const left = blockLayout[c - 1] && blockLayout[c - 1][r] && blockLayout[c - 1][r].colour;
	const top = blockLayout[c][r - 1] && blockLayout[c][r - 1].colour;
	const topLeft =  blockLayout[c - 1] && blockLayout[c - 1][r - 1] && blockLayout[c - 1][r - 1].colour;

	if(block.colour === left && block.colour === top && block.colour === topLeft){
		return true;
	}
	return false;
}

function isCornerOfSquare(block, c, r){
	// console.log('in')
	const right = blockLayout[c + 1] && blockLayout[c + 1][r] && blockLayout[c + 1][r].colour;
	const down = blockLayout[c][r + 1] && blockLayout[c][r + 1].colour;
	const downRight = blockLayout[c + 1] && blockLayout[c + 1][r + 1] && blockLayout[c + 1][r + 1].colour;

	// console.log(block.colour === right)
	// console.log(block.colour === down)
	// console.log(c)
	// console.log(r)

	if(block.colour === right && block.colour === down && block.colour === downRight){
		// console.log('qwharfs')
		return true;
	}
	return false;
}