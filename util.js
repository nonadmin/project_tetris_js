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

  return {
    rand: rand,
    touch: touch
  };
})();