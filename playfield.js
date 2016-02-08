var TETRIS = TETRIS || {};


TETRIS.Playfield = (function(Util){
  var deadBlocks = {};
  var _canvas;
  var ctx;

  var init = function(){
    _canvas = $('canvas')[0];
    ctx = _canvas.getContext('2d');
  };

  var draw = function(active){
    ctx.clearRect(0,0,200,400);

    active.draw(ctx);

    var rows = Object.keys(deadBlocks);
    $.each(rows, function(j, row){
      $.each(deadBlocks[row], function(i, block){
        block.draw(ctx);
      });
    });
  };

  var addDeadBlock = function(block){
    // associative array of deadblocks
    if ( !(deadBlocks.hasOwnProperty(block.posY)) ){
      deadBlocks[block.posY] = [];
    }
    deadBlocks[block.posY].push(block);
  };

  var collision = function(block, proposedMove){
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

  var validMove = function(block, proposedMove){
    var valid = false;
    if ( proposedMove === 'left' &&
         block.posX >= 20 &&
         !(collision(block, proposedMove))){
      valid = true;
    } else if( proposedMove === 'right' &&
               block.posX <= _canvas.width - 40 &&
               !(collision(block, proposedMove)) ){
      valid = true;
    } else if ( proposedMove === 'down' &&
                block.posY <= _canvas.height - 40 &&
                !(collision(block, proposedMove)) ){
      valid = true;
    }
    return valid;
  };


  var _shiftBlocks = function(mult){
    var shiftAmount = 20 * mult;
    var rows = Object.keys(deadBlocks);

    for(var i=rows.length-1; i>=0; i--){
      var row = rows[i];
      var newRow = parseInt(row, 10) + shiftAmount;
      deadBlocks[newRow] = deadBlocks[row];
      console.log('shifting to ' + newRow)
      delete deadBlocks[row];

      $.each(deadBlocks[newRow], function(j, block){
        block.posY = newRow;
      });
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

      _shiftBlocks(rowsToClear.length);
    }
  };

  return {
    init: init,
    draw: draw,
    ctx: ctx,
    deadBlocks: deadBlocks,
    validMove: validMove,
    addDeadBlock: addDeadBlock,
    clearLines: clearLines
  };
})(TETRIS.Util);