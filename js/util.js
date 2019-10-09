'use strict';

(function () {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 70;
  var ENTER_KEYCODE = 13;

  window.util = {
    IMG_WIDTH: IMG_WIDTH,
    IMG_HEIGHT: IMG_HEIGHT,
    ENTER_KEYCODE: ENTER_KEYCODE
  };

  window.getRandomArray = function (arr) {
    var randomArr = [];
    var max = Math.floor(Math.random() * arr.length);
    for (var i = 0; i <= max; i++) {
      randomArr.push(arr[i]);
    }
    return randomArr;
  };

  window.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
})();
