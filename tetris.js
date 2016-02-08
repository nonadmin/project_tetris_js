var TETRIS = TETRIS || {}


TETRIS.Util = (function(){
  var rand = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  var touch = function(obj, collection){
    var isTouching = false;
    var rows = Object.keys(collection);

    $.each(rows, function(j, row){

      $.each(collection[row], function(i, compareObj){
          if (obj.posX < compareObj.posX + compareObj.size &&
              obj.posX + obj.size > compareObj.posX &&
              obj.posY < compareObj.posY + compareObj.size &&
              obj.posY + obj.size > compareObj.posY) {
            isTouching = true;
            return false;
          }

      });    
    });

    return isTouching;
  };

  return {
    rand: rand,
    touch: touch
  };
})();

//200x400, 20 block size


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


TETRIS.ShapeModule = (function($, BlockModule){
  var _start = {posX: 100, posY: -80};
  var _recipes = {1: [ {posX: _start.posX + 20, posY: _start.posY},
                       {posX: _start.posX + 20, posY: _start.posY - 20},
                       {posX: _start.posX + 40, posY: _start.posY - 20}  ]
                   };

  function Shape(){
    blocks = [];
    blocks.push(new BlockModule.Block(_start.posX, _start.posY));

    $.each(_recipes[1], function(i, block){
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

})($, TETRIS.BlockModule);