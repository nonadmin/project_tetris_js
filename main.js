var TETRIS = TETRIS || {};


TETRIS.Main = (function($, Logic, Playfield, ShapeModule, Util){
  var _activeShape;
  var _loopID;

  var init = function(){
    Playfield.init();
    _bindKeys();
    _startGame();
  };

  var _bindKeys = function(){
    $('body').on('keyup', function(e){   
      if (e.which === 37 && Logic.validMove(_activeShape.blocks, 'left')){
        _activeShape.allLeft();
      } else if (e.which === 39 && Logic.validMove(_activeShape.blocks, 'right')){
        _activeShape.allRight();
      }
    });
  };

  var _startGame = function(){
    _newShape();
    _loopID = window.setInterval(_playLoop, 200);
  };

  var _newShape = function(){
    _activeShape = new ShapeModule.Shape();
  };

  var _playLoop = function(){
    if (_stopBlock()){
      Logic.addDeadBlocks(_activeShape.blocks);
      _newShape();
    } else {
      _activeShape.allDown();
    }

    Logic.clearLines();
    Playfield.draw(_activeShape, Logic.deadBlocks);
  };

  var _stopBlock = function(){
    var stop = false;
    if ( !(Logic.validMove(_activeShape.blocks, 'down')) ){
      stop = true;
    }
    return stop;
  };

  return {
    init: init
  };
})($, TETRIS.Logic, TETRIS.Playfield, TETRIS.ShapeModule, TETRIS.Util);


$( document ).ready(function(){
  TETRIS.Main.init();
});