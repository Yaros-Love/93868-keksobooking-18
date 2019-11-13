'use strict';
(function () {
  var PIN_RADIUS = window.util.PIN_RADIUS;
  var PIN_ARROW = 22;
  var PIN_HEIGHT_TOTAL = (PIN_RADIUS * 2) + PIN_ARROW;
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = document.querySelector('.map').offsetWidth;
  var LOCATION_Y_MIN = 130 - (PIN_RADIUS + PIN_ARROW);
  var LOCATION_Y_MAX = 630 - (PIN_RADIUS + PIN_ARROW);

  var Coordinate = window.coordinate.Coordinate;

  var mapElement = document.querySelector('.map');
  var pinMainElement = mapElement.querySelector('.map__pin--main');

  var getAddressValue = function (pin) {
    var address = getComputedStyle(pin);
    var x = parseInt(address.left, 10);
    var y = parseInt(address.top, 10);
    x += PIN_RADIUS;
    y += PIN_HEIGHT_TOTAL;

    return new Coordinate(x, y);
  };

  var setInputAddress = function () {
    var inputAddressElement = document.querySelector('#address');
    var addressValue = getAddressValue(pinMainElement);
    inputAddressElement.value = addressValue.x + ', ' + addressValue.y;
  };

  var movePinTo = function (x, y) {
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

    pinMainElement.style.left = Math.floor(x - PIN_RADIUS) + 'px';
    pinMainElement.style.top = y - PIN_RADIUS + 'px';
    setInputAddress();
  };

  var onPinMouseMove = function (evt) {
    var mapCoords = mapElement.getBoundingClientRect();

    var coords = {
      x: evt.pageX - mapCoords.x,
      y: evt.pageY - (mapCoords.top + pageYOffset)
    };
    return movePinTo(coords.x, coords.y);
  };

  var onMouseUp = function (evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  window.mainPinMove = {
    movePinTo: movePinTo,
    setInputAddress: setInputAddress,
    onPinMouseMove: onPinMouseMove,
    onMouseUp: onMouseUp
  };
})();
