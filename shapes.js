var TETRIS = TETRIS || {}


TETRIS.BlockModule = (function(util){
  var _color = "#f00";

  function Block(posX, posY){
    this.size = 20;
    this.posX = posX || 100;
    this.posY = posY || -this.size;
    this.color = _color;
  }

  Block.prototype.moveDown = function(){
    this.posY += this.size;
  };

  Block.prototype.moveLeft = function(){
    this.posX -= this.size;
  };

  Block.prototype.moveRight = function(){
    this.posX += this.size;
  };

  Block.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.rect(this.posX, this.posY, this.size, this.size);
    ctx.fillStyle = this.color;
    ctx.fill();
    // ctx.lineWidth = 1;
    // ctx.strokeStyle = 'black';
    // ctx.stroke();
  };

  return {
    Block: Block
  };


})(TETRIS.Util);


TETRIS.ShapeModule = (function($, Util, BlockModule){
  var _start = {posX: 100, posY: -80};

  var _recipes = {1: [ {posX: _start.posX + 20, posY: _start.posY},
                       {posX: _start.posX + 20, posY: _start.posY - 20},
                       {posX: _start.posX + 40, posY: _start.posY - 20} ],
                  2: [ {posX: _start.posX, posY: _start.posY - 20},
                       {posX: _start.posX, posY: _start.posY - 40},
                       {posX: _start.posX + 20, posY: _start.posY - 40} ],
                  3: [ {posX: _start.posX - 20, posY: _start.posY},
                       {posX: _start.posX - 20, posY: _start.posY - 20},
                       {posX: _start.posX - 40, posY: _start.posY - 20} ],   
                  4: [ {posX: _start.posX, posY: _start.posY - 20},
                       {posX: _start.posX + 20, posY: _start.posY - 20},
                       {posX: _start.posX + 20, posY: _start.posY} ],
                  5: [ {posX: _start.posX, posY: _start.posY - 20},
                       {posX: _start.posX, posY: _start.posY - 40},
                       {posX: _start.posX, posY: _start.posY - 60} ]};    

  function Shape(){
    blocks = [];
    blocks.push(new BlockModule.Block(_start.posX, _start.posY));

    $.each(_recipes[Util.rand(1,5)], function(i, block){
      blocks.push(new BlockModule.Block(block.posX, block.posY));
    });

    this.blocks = blocks;
  }

  Shape.prototype.allDown = function(){
    $.each(blocks, function(i, block){
      block.moveDown();
    });
  };

  Shape.prototype.allLeft = function(){
    $.each(blocks, function(i, block){
      block.moveLeft();
    });
  };

  Shape.prototype.allRight = function(){
    $.each(blocks, function(i, block){
      block.moveRight();
    });
  };


  Shape.prototype.draw = function(ctx){
    $.each(blocks, function(i, block){
      block.draw(ctx);
    });
  };

  return {
    Shape: Shape
  };

})($, TETRIS.Util, TETRIS.BlockModule);