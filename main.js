var TETRIS = TETRIS || {};


TETRIS.Main = (function($, Grid, Playfield, ShapeModule, Util){
  var _activeShape;
  var _loopID;

  var init = function(){
    Playfield.init();
    _bindKeys();
    _startGame();
  };

  var _bindKeys = function(){
    $('body').on('keyup', function(e){   
      if (e.which === 37 && Grid.tryMove(_activeShape.coords, 'left')){
        _activeShape.moveLeft();
      } else if (e.which === 39 && Grid.tryMove(_activeShape.coords, 'right')){
        _activeShape.moveRight();
      } else if (e.which === 32 && Grid.tryMove(_activeShape.coords, 'rotate')){
        _activeShape.rotate();
      }
    });
  };

  var _startGame = function(){
    Grid.blankGrid();
    _newShape();
    _loopID = window.setInterval(_playLoop, 200);
  };

  var _newShape = function(){
    _activeShape = new ShapeModule.Shape();
  };

  var _playLoop = function(){
    if (_stopShape()){

      if (_gameOver()){
        clearInterval(_loopID);
        _startGame();
        return false;
      }

      _activeShape.saveToGrid();
      _newShape();
    } else {
      _activeShape.moveDown();
    }

    Grid.clearLines();
    Playfield.draw(_activeShape);
  };

  var _stopShape = function(){
    var stop = false;
    if ( !(Grid.tryMove(_activeShape.coords, 'down')) ){
      stop = true;
    }
    //console.log(stop);
    return stop;
  };

  var _gameOver = function(){
    topRow = Grid.getGrid()[2];
    if( topRow.some(function(slot){ return slot; }) ){
      return true;
    }
  };

  return {
    init: init
  };
})($, TETRIS.Grid, TETRIS.Playfield, TETRIS.ShapeModule, TETRIS.Util);


$( document ).ready(function(){
  TETRIS.Main.init();
});