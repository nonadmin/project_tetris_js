var TETRIS = TETRIS || {};


TETRIS.Playfield = (function($, Util){
  var _canvas;
  var ctx;

  var init = function(){
    _canvas = $('canvas')[0];
    ctx = _canvas.getContext('2d');
  };

  var draw = function(activeShape, deadBlocks){
    ctx.clearRect(0,0,200,400);

    activeShape.draw(ctx);
    
    var rows = Object.keys(deadBlocks);
    $.each(rows, function(j, row){
      $.each(deadBlocks[row], function(i, block){
        block.draw(ctx);
      });
    });
  };

  return {
    init: init,
    draw: draw,
    ctx: ctx
  };
})($, TETRIS.Util);