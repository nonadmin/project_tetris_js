var TETRIS = TETRIS || {};


TETRIS.Playfield = (function(Util){
  var deadBlocks = [];
  var _canvas;
  var ctx;

  var init = function(){
    _canvas = $('canvas')[0];
    ctx = _canvas.getContext('2d');
  };

  var draw = function(active){
    ctx.clearRect(0,0,200,400);

    active.draw(ctx);

    $.each(deadBlocks, function(i, block){
      block.draw(ctx);
    });
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
    console.log(collision)
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

  return {
    init: init,
    draw: draw,
    ctx: ctx,
    deadBlocks: deadBlocks,
    validMove: validMove,
  };
})(TETRIS.Util);