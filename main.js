var TETRIS = TETRIS || {};


TETRIS.Main = (function($, Playfield, ShapeModule, Util){
  var _active;
  var _loopID;

  var init = function(){
    Playfield.init();
    _bindKeys();
    _startGame();
  };

  var _bindKeys = function(){
    $('body').on('keyup', function(e){   
      if (e.which === 37 && Playfield.validMove(_active.blocks, 'left')){
        _active.allLeft();
      } else if (e.which === 39 && Playfield.validMove(_active.blocks, 'right')){
        _active.allRight();
      }
    });
  };

  var _startGame = function(){
    _newShape();
    _loopID = window.setInterval(_playLoop, 200);
  };

  var _newShape = function(){
    _active = new ShapeModule.Shape();
    //_active = new BlockModule.Block();
  };

  var _playLoop = function(){
    if (_stopBlock()){
      Playfield.addDeadBlocks(_active.blocks);
      _newShape();
    } else {
      _active.allDown();
    }

    Playfield.clearLines();
    Playfield.draw(_active);
  };

  var _stopBlock = function(){
    var stop = false;
    if ( !(Playfield.validMove(_active.blocks, 'down')) ){
      stop = true;
    }
    return stop;
  };

  return {
    init: init
  };
})($, TETRIS.Playfield, TETRIS.ShapeModule, TETRIS.Util);


$( document ).ready(function(){
  TETRIS.Main.init();
});