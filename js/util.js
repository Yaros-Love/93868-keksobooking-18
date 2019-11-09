'use strict';

(function () {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 70;
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var errorHandler = function (err) {
    var main = document.querySelector('main');

    var errorTemplate = document.querySelector('#error');
    var errorElement = errorTemplate.content.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    errorMessage.innerHTML = err + ', упс!';

    main.prepend(errorElement);

    var onCloseErrorClick = function () {
      var error = main.querySelector('.error');
      error.remove();

      errorButton.removeEventListener('click', onCloseErrorClick);
      main.removeEventListener('click', onCloseErrorClick);
      document.removeEventListener('keydown', onCloseErrorEsc);
    };

    var onCloseErrorEsc = function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        var error = main.querySelector('.error');
        error.remove();
      }
      errorButton.removeEventListener('click', onCloseErrorClick);
      main.removeEventListener('click', onCloseErrorClick);
      document.removeEventListener('keydown', onCloseErrorEsc);
    };

    errorButton.addEventListener('click', onCloseErrorClick);
    main.addEventListener('click', onCloseErrorClick);
    document.addEventListener('keydown', onCloseErrorEsc);
  };

  var getRandomArray = function (arr) {
    var randomArr = [];
    var max = Math.floor(Math.random() * arr.length);
    for (var i = 0; i <= max; i++) {
      randomArr.push(arr[i]);
    }
    return randomArr;
  };

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var removeChildren = function (node) {
    while (node.firstChild) {
      node.firstChild.remove();
    }
  };

  window.util = {
    IMG_WIDTH: IMG_WIDTH,
    IMG_HEIGHT: IMG_HEIGHT,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    ESC_KEY_CODE: ESC_KEY_CODE,
    getRandomInt: getRandomInt,
    getRandomArray: getRandomArray,
    removeChildren: removeChildren,
    debounce: debounce,
    errorHandler: errorHandler
  };
})();
