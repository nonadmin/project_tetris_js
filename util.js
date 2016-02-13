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
          if (obj.posX < compareObj.posX + compareObj.width &&
              obj.posX + obj.width > compareObj.posX &&
              obj.posY < compareObj.posY + compareObj.height &&
              obj.posY + obj.height > compareObj.posY) {
            isTouching = true;
            return false;
          }

      });    
    });

    return isTouching;
  };

  var rotate = function(pivotX, pivotY, x, y){
    var cos = Math.cos( 90 * Math.PI/180 );
    var sin = Math.sin( 90 * Math.PI/180 );
    var x2 = x - pivotX;
    var y2 = y - pivotY;
    
    return {
      x: x2*cos - y2*sin + pivotX,
      y: x2*sin + y2*cos + pivotY
    };
  };

  return {
    rotate: rotate,
    rand: rand,
    touch: touch
  };
})();