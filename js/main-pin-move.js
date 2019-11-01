'use strict';
(function () {
  var Coordinate = window.coordinate.Coordinate;
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PIN_ARROW = 22;
  var PIN_HEIGHT_TOTAL = PIN_HEIGHT + PIN_ARROW;

  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var mapRect = map.getBoundingClientRect();

  var getAddressValue = function (pin) {
    var address = getComputedStyle(pin);
    var x = parseInt(address.left, 10);
    var y = parseInt(address.top, 10);
    x += Math.round(PIN_WIDTH / 2);
    y += PIN_HEIGHT_TOTAL;


    return new Coordinate(x, y);
  };

  var setInputAdress = function () {
    var inputAddress = document.querySelector('#address');

    inputAddress.setAttribute('readonly', 'readonly');
    inputAddress.value = getAddressValue(pinMain).x + ', ' + getAddressValue(pinMain).y;
  };

  var movePinTo = function (x, y) {
    var LOCATION_X_MIN = 0;
    var LOCATION_X_MAX = mapRect.width;
    var LOCATION_Y_MIN = 130 - 54;
    var LOCATION_Y_MAX = 630 - 54;

    if (x < LOCATION_X_MIN) {
      x = LOCATION_X_MIN;
    }
    if (y < LOCATION_Y_MIN) {
      y = LOCATION_Y_MIN;
    }
    if (x > LOCATION_X_MAX) {
      x = LOCATION_X_MAX;
    }
    if (y > LOCATION_Y_MAX) {
      y = LOCATION_Y_MAX;
    }

    pinMain.style.left = (x - PIN_WIDTH / 2) + 'px';
    pinMain.style.top = (y - PIN_HEIGHT / 2) + 'px';
    setInputAdress();
  };

  var clickInMapCoords = function (evt) {
    var coords = {
      x: evt.pageX - mapRect.x,
      y: evt.pageY - mapRect.y
    };
    return movePinTo(coords.x, coords.y);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', clickInMapCoords);
    document.removeEventListener('mouseup', onMouseUp);
  };

  window.mainPinMove = {
    movePinTo: movePinTo,
    setInputAdress: setInputAdress,
    clickInMapCoords: clickInMapCoords,
    onMouseUp: onMouseUp
  };
})();
