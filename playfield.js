var TETRIS = TETRIS || {};


TETRIS.Playfield = (function($, Util, Grid){
  var _canvas;
  var ctx;

  var init = function(){
    _canvas = $('canvas')[0];
    ctx = _canvas.getContext('2d');
  };

  var draw = function(activeShape){
    var grid = Grid.getGrid();
    ctx.clearRect(0,0,200,400);
    ctx.translate(0, -80);

    var rows = Object.keys(grid);
    $.each(rows, function(j, row){
      $.each(grid[row], function(x, block){
        if (block){
          _drawBlock(block.color, x, row);
        }
      });
    });

    $.each(activeShape.coords, function(i, block){
      _drawBlock(activeShape.color, block.x, block.y);
    });

    ctx.translate(0, 80);
  };

  var _drawBlock = function(color, x, y){
    ctx.beginPath();
    ctx.rect(x * 20, y * 20, 20, 20);
    ctx.fillStyle = color;
    ctx.fill();
  };

  return {
    init: init,
    draw: draw,
  };
})($, TETRIS.Util, TETRIS.Grid);