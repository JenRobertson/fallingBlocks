let blockAbove, blockBelow, blockLeft, blockRight, colourAbove, colourBelow, colourLeft, colourRight;

function examineNeighbours(column, row){
  blockAbove = blockLayout[column][row - 1];
  blockBelow = blockLayout[column][row + 1];
  blockLeft = blockLayout[column - 1] && blockLayout[column - 1][row];
  blockRight = blockLayout[column + 1] && blockLayout[column + 1][row];

  colourAbove = blockAbove && blockAbove.colour;
  colourBelow = blockBelow && blockBelow.colour;
  colourLeft = blockLeft && blockLeft.colour;
  colourRight = blockRight && blockRight.colour;
}

function breakBreakers(){
  for (column = 0; column < BLOCKS_PER_ROW; column++) {
		for (row = 0; row < BLOCKS_PER_COLUMN; row++) {
      if(!blockLayout[column][row].type) continue;

      const block = blockLayout[column][row];
      const colour = block.colour;
      examineNeighbours(column, row);

      if (block.type === 'breaker'){
        if(colourAbove === colour || colourBelow === colour || colourLeft === colour || colourRight === colour){
          block.broken = true;
        }
      }
    }
  }
}

function breakEverything(){
  nothingBroke = true;
  for (column = 0; column < BLOCKS_PER_ROW; column++) {
		for (row = 0; row < BLOCKS_PER_COLUMN; row++) {

      if(!blockLayout[column][row].type) continue;
      if(blockLayout[column][row].broken) continue;

      const block = blockLayout[column][row];
      const colour = block.colour;
      examineNeighbours(column, row);

      if(colourAbove === colour && blockAbove.broken || colourBelow === colour && blockBelow.broken || colourLeft === colour && blockLeft.broken || colourRight === colour && blockRight.broken){
        block.broken = true;
        nothingBroke = false;
      }
    }
  }
}

function removeBrokenBlocks(){
  for (column = 0; column < BLOCKS_PER_ROW; column++) {
		for (row = 0; row < BLOCKS_PER_COLUMN; row++) {
      if(blockLayout[column][row].broken){
        blockLayout[column].splice(row, 1);
        blockLayout[column].unshift({
          x:0,
          y:0,
          type: null,
          colour: null,
          column: column,
          row: row,
        });
      }
    }
  }

}
