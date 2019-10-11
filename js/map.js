'use strict';

(function () {
  var renderPin = window.pin.renderPin;
  var ENTER_KEYCODE = window.util.ENTER_KEYCODE;
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  var insertPinsInMap = function (arr) {
    var fragment = document.createDocumentFragment();
    var similarListPin = map.querySelector('.map__pins');

    if (arr.length !== 0) {
      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(renderPin(arr[i]));
      }
      similarListPin.appendChild(fragment);
    }

    return similarListPin;
  };

  pinMain.addEventListener('mousedown', function () {
    var mapActivation = window.mapActivation.mapActivation;
    mapActivation();
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      var mapActivation = window.mapActivation.mapActivation;
      mapActivation();
    }
  });

  window.map = {
    insertPinsInMap: insertPinsInMap,
    map: map,
    pinMain: pinMain,
    adForm: adForm
  };
})();
