'use strict';

(function () {
  var IMG_WIDTH = 40;
  var IMG_HEIGHT = 70;
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms
  var PIN_RADIUS = 65;

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

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEY_CODE) {
      action();
    }
  };

  // var addHandler = function (element, cb) {
  //   element.addEventListener('click', cb);
  // };
  var mainElement = document.querySelector('main');
  var errorTemplateElement = document.querySelector('#error');

  var onLoadError = function (error) {
    var errorElement = errorTemplateElement.content.cloneNode(true);
    var errorMessageElement = errorElement.querySelector('.error__message');
    var errorButtonElement = errorElement.querySelector('.error__button');
    errorMessageElement.innerHTML = error + ', упс!';

    mainElement.prepend(errorElement);

    var closeErrorMessage = function () {
      mainElement.querySelector('.error').remove();

      errorButtonElement.removeEventListener('click', onCloseErrorClick);
      mainElement.removeEventListener('click', onCloseErrorClick);
      document.removeEventListener('keydown', onPopupPressEsc);
    };

    var onCloseErrorClick = function () {
      closeErrorMessage();
    };

    var onPopupPressEsc = function (evt) {
      isEscEvent(evt, closeErrorMessage);
    };

    errorButtonElement.addEventListener('click', onCloseErrorClick);
    mainElement.addEventListener('click', onCloseErrorClick);
    document.addEventListener('keydown', onPopupPressEsc);
  };

  var getRandomArray = function (array) {
    var randomNumbers = [];
    var max = Math.floor(Math.random() * array.length);
    for (var i = 0; i <= max; i++) {
      randomNumbers.push(array[i]);
    }
    return randomNumbers;
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
    PIN_RADIUS: PIN_RADIUS,
    getRandomInt: getRandomInt,
    getRandomArray: getRandomArray,
    removeChildren: removeChildren,
    debounce: debounce,
    onLoadError: onLoadError,
    // addHandler: addHandler,
    isEscEvent: isEscEvent
  };
})();
