var TETRIS = TETRIS || {};


TETRIS.Logic = (function($, Util){
  var deadBlocks = {};

  var getDeadBlocks = function(){
    return deadBlocks;
  };

  var clearDeadBlocks = function(){
    deadBlocks = {};
  };

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
    var testBlock = {width: 20, height: 20};
    var gutter = {0: {posX: 0, posY: -120, width: 200, height: 520 }};

    if (proposedMove === 'left'){
      testBlock.posX = block.posX - 20;
      testBlock.posY = block.posY;
    } else if (proposedMove === 'right'){
      testBlock.posX = block.posX + 20;
      testBlock.posY = block.posY;
    } else if (proposedMove === 'down'){
      testBlock.posX = block.posX;
      testBlock.posY = block.posY + 20;
    }

    var outOfGutter = !(Util.touch(testBlock, [gutter]));
    var collision = Util.touch(testBlock, deadBlocks);
    return (collision || outOfGutter);
  }; 

  var validMove = function(shape, proposedMove){
    var isValid = true;

    $.each(shape, function(i, block){
      if ( proposedMove === 'left' &&
           _collision(block, proposedMove) ){
        isValid = false;
      } else if( proposedMove === 'right' &&
                 _collision(block, proposedMove) ){
        isValid = false;
      } else if ( proposedMove === 'down' &&
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
    getDeadBlocks: getDeadBlocks,
    clearDeadBlocks: clearDeadBlocks,
    validMove: validMove,
    addDeadBlocks: addDeadBlocks,
    clearLines: clearLines
  };
})($, TETRIS.Util);