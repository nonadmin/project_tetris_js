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

  function Block(){
    console.log("new");
    this.size = 20;
    this.posX = 100;
    this.posY = -this.size;
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