var TETRIS = TETRIS || {}


TETRIS.ShapeModule = (function($, Util, BlockModule, Grid){
  var _colors = ["#F44336", "#9C27B0", "#2196F3", "#4CAF50", "#FFEB3B", "#FF9800"]

  var _start = {x: 4, y: 2};

  var _recipes = {1: [ {x: _start.x + 1, y: _start.y},
                       {x: _start.x + 1, y: _start.y - 1},
                       {x: _start.x + 2, y: _start.y - 1} ],
                  2: [ {x: _start.x, y: _start.y - 1},
                       {x: _start.x, y: _start.y - 2},
                       {x: _start.x + 1, y: _start.y - 2} ],
                  3: [ {x: _start.x - 1, y: _start.y},
                       {x: _start.x - 1, y: _start.y - 1},
                       {x: _start.x - 2, y: _start.y - 1} ],   
                  4: [ {x: _start.x, y: _start.y - 1},
                       {x: _start.x + 1, y: _start.y - 1},
                       {x: _start.x + 1, y: _start.y} ],
                  5: [ {x: _start.x, y: _start.y - 1},
                       {x: _start.x, y: _start.y - 2},
                       {x: _start.x, y: _start.y - 3} ]};    

  function Shape(){
    var coords = [{x: _start.x, y: _start.y}];

    $.each(_recipes[Util.rand(1,5)], function(i, block){
      coords.push({x: block.x, y: block.y});
    });

    this.color = _colors[Util.rand(0,3)];
    this.coords = coords;
  }

  Shape.prototype.saveToGrid = function(){
    var grid = Grid.getGrid();
    var block = {color: this.color};

    $.each(this.coords, function(i, blockCoords){
      grid[blockCoords.y][blockCoords.x] = block;
    });
  };

  Shape.prototype.moveDown = function(){
    $.each(this.coords, function(i, blockCoords){     
      blockCoords.y += 1;
    });
  };

  Shape.prototype.moveLeft = function(){
    $.each(this.coords, function(i, blockCoords){
      blockCoords.x -= 1;
    });
  };

  Shape.prototype.moveRight = function(){
    $.each(this.coords, function(i, blockCoords){
      blockCoords.x += 1;
    });
  };

  Shape.prototype.rotate = function(){
    var pivot = this.coords[2]; // rotate around third block in coords

    $.each(this.coords, function(i, blockCoords){
      newCoords = Util.rotate(pivot.x, pivot.y, blockCoords.x, blockCoords.y);
      blockCoords.x = newCoords.x;
      blockCoords.y = newCoords.y;
    });
  };

  return {
    Shape: Shape
  };

})($, TETRIS.Util, TETRIS.BlockModule, TETRIS.Grid);