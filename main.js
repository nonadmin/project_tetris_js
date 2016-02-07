var TETRIS = TETRIS || {};


TETRIS.Main = (function($, Playfield, BlockModule, Util){
  var _active;
  var _loopID;

  var init = function(){
    Playfield.init();
    _bindKeys();
    _startGame();
  };

  var _bindKeys = function(){
    $('body').on('keyup', function(e){   
      if (e.which === 37 && Playfield.validMove(_active, 'left')){
        _active.moveLeft();
      } else if (e.which === 39 && Playfield.validMove(_active, 'right')){
        _active.moveRight();
      }
    });
  };

  var _startGame = function(){
    _newBlock();
    _loopID = window.setInterval(_playLoop, 200);
  };

  var _newBlock = function(){
    _active = new BlockModule.Block();
  };

  var _playLoop = function(){
    if (_stopBlock()){
      Playfield.deadBlocks.push(_active);
      _newBlock();
    } else {
      _active.moveDown();
    }
    Playfield.draw(_active);
  };

  var _stopBlock = function(){
    var stop = false;
    if ( !(Playfield.validMove(_active, 'down')) ){
      stop = true;
    }
    return stop;
  };

  return {
    init: init
  };
})($, TETRIS.Playfield, TETRIS.BlockModule, TETRIS.Util);


$( document ).ready(function(){
  TETRIS.Main.init();
});