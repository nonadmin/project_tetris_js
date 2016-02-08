var TETRIS = TETRIS || {};


TETRIS.Logic = (function($, Util){
  var deadBlocks = {};

  var addDeadBlocks = function(shape){
    $.each(shape, function(i, block){
      // associative array of deadblocks
      if ( !(deadBlocks.hasOwnProperty(block.posY)) ){
        deadBlocks[block.posY] = [];
      }
      deadBlocks[block.posY].push(block);
    });
  };

  var _collision = function(block, proposedMove){
    var testBlock;

    if (proposedMove === 'left'){
      testBlock = {posX: block.posX - 20, posY: block.posY, size: block.size};
    } else if (proposedMove === 'right'){
      testBlock = {posX: block.posX + 20, posY: block.posY, size: block.size};
    } else if (proposedMove === 'down'){
      testBlock = {posX: block.posX, posY: block.posY + 20, size: block.size};
    }

    var collision = Util.touch(testBlock, deadBlocks);
    return collision;
  }; 

  var validMove = function(shape, proposedMove){
    var isValid = true;

    $.each(shape, function(i, block){
      if ( proposedMove === 'left' &&
           block.posX <= 0 ||
           _collision(block, proposedMove) ){
        isValid = false;
      } else if( proposedMove === 'right' &&
                 block.posX >= 180 ||
                 _collision(block, proposedMove) ){
        isValid = false;
      } else if ( proposedMove === 'down' &&
                  block.posY >= 380 ||
                  _collision(block, proposedMove) ){
        isValid = false;
      }
    });

    return isValid;
  };

  var _shiftBlocks = function(rowsToClear){
    var shiftAmount = 20 * rowsToClear.length;
    var clearBelow = Math.max(...rowsToClear);
    var rows = Object.keys(deadBlocks);

    //iterate backwards through deadBlock rows, shifting down
    for(var i=rows.length-1; i>=0; i--){
      var row = rows[i];
      if (row < clearBelow){
        var newRow = parseInt(row, 10) + shiftAmount;
        deadBlocks[newRow] = deadBlocks[row];
        console.log('shifting to ' + newRow);
        delete deadBlocks[row];

        $.each(deadBlocks[newRow], function(j, block){
          block.posY = newRow;
        });
      }
    }
  };

  var clearLines = function(){
    var rows = Object.keys(deadBlocks);
    var rowsToClear = [];

    $.each(rows, function(i, row){
      if(deadBlocks[row].length === 10){
        rowsToClear.push(row);
      }
    });

    if(rowsToClear.length){
      $.each(rowsToClear, function(j, fullRow){
        console.log('clearing ' + fullRow);
        delete deadBlocks[fullRow];
      });

      _shiftBlocks(rowsToClear);
    }
  };

  return {
    deadBlocks: deadBlocks,
    validMove: validMove,
    addDeadBlocks: addDeadBlocks,
    clearLines: clearLines
  };
})($, TETRIS.Util);