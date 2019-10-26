'use strict';
(function () {
  var Coordinate = window.coordinate.Coordinate;
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 87;

  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');


  var getAddressValue = function (pin) {
    var address = getComputedStyle(pin);
    var x = parseInt(address.left, 10);
    var y = parseInt(address.top, 10);
    x += Math.round(PIN_WIDTH / 2);
    y += PIN_HEIGHT;
    var value = x + ', ' + y;

    return value;
  };

  var setInputAdress = function () {
    var inputAddress = document.querySelector('#address');

    inputAddress.setAttribute('readonly', 'readonly');
    inputAddress.value = getAddressValue(pinMain);
  };

  var mainPinHandler = function (evt) {

    var mapRect = map.getBoundingClientRect();
    var LOCATION_X_MIN = (mapRect.x - mapRect.x) + PIN_WIDTH / 2;
    var LOCATION_X_MAX = mapRect.width - PIN_WIDTH / 2;
    var LOCATION_Y_MIN = 130;
    var LOCATION_Y_MAX = 630 - PIN_HEIGHT;

    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords.setX(moveEvt.clientX);
      startCoords.setY(moveEvt.clientY);

      var endCoords = new Coordinate(startCoords.x - mapRect.x, -(mapRect.top - startCoords.y));

      if ((endCoords.x >= LOCATION_X_MIN) && (endCoords.x <= LOCATION_X_MAX)) {
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      }
      if ((endCoords.y >= LOCATION_Y_MIN) && (endCoords.y <= LOCATION_Y_MAX)) {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      }

      setInputAdress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.mainPinMove = {
    mainPinHandler: mainPinHandler,
    setInputAdress: setInputAdress
  };
})();