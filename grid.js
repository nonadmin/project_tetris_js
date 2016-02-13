var TETRIS = TETRIS || {};


TETRIS.Grid = (function($){
  var grid;

  var getGrid = function(){
    return grid;
  };

  var blankGrid = function(){
    grid = {};
    for(var i=0; i<24; i++){
      grid[i] = Array.apply(null, Array(10));
    }
    return grid;
  };

  var _validMove = function(x,y){
    if (x >= 0 && x <= 9 && y >= 0 && y <= 23) {
      if (grid[y][x] === undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  var tryMove = function(shapeCoords, proposedMove){
    var isValid = [];

    $.each(shapeCoords, function(i, blockCoords){

      var tryCoords = {x: blockCoords.x, y: blockCoords.y};

      if ( proposedMove === 'left' ){
        isValid.push( _validMove(tryCoords.x - 1, tryCoords.y) );
      } else if( proposedMove === 'right' ){
        isValid.push( _validMove(tryCoords.x + 1, tryCoords.y) );
      } else if ( proposedMove === 'down' ){
        isValid.push( _validMove(tryCoords.x, tryCoords.y + 1) );
      }      
    });

    //console.log("valid: " + valid);
    return isValid.every(function(move){ return move; });
  };

  var clearLines = function(){
    var rows = Object.keys(grid);
    var fullRows = [];

    $.each(rows, function(i, row){
      if ( grid[row].every(function(slot){ return slot; }) ){
        fullRows.push(row);
      }
    });

    $.each(fullRows, function(i, fullRow){
      _shiftGrid(fullRow);
    });
  };

  var _shiftGrid = function(startRow){
    startRow = parseInt(startRow, 10);
    for(var i=startRow; i>0; i--){
      grid[i] = grid[i-1];
      delete grid[-1];
    }
  };

  return {
    clearLines: clearLines,
    blankGrid: blankGrid,
    tryMove: tryMove,
    getGrid: getGrid
  };

})($);

// var grid = ['a', 'a']