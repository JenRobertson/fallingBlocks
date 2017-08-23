function breakBlocks(){
  for (column = 0; column < BLOCKS_PER_ROW; column++) {
		for (row = 0; row < BLOCKS_PER_COLUMN; row++) {
      block = blockLayout[column][row];

      if(!block.type) continue;

      const colour = block.color;

      const blockAbove = blockLayout[column][row - 1];
      const blockBelow = blockLayout[column][row + 1];
      const blockLeft = blockLayout[column + 1] && blockLayout[column + 1][row];
      const blockRight = blockLayout[column - 1] && blockLayout[column - 1][row];

      const colourAbove = blockAbove && blockAbove.color;
      const colourBelow = blockBelow && blockBelow.color;
      const colourLeft = blockLeft && blockLeft.color;
      const colourRight = blockRight && blockRight.color;

      if (block.type === 'breaker'){
        if(colourAbove === colour || colourBelow === colour || colourLeft === colour || colourRight === colour){
          block.broken = true;
        }

      }

    }
  }
}
