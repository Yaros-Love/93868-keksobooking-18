'use strict';
(function () {
  var Coordinate = window.coordinate.Coordinate;
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 87;

  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var mapRect = map.getBoundingClientRect();


  var movePinTo = function (x, y) {
    var LOCATION_X_MIN = 0;
    var LOCATION_X_MAX = mapRect.width;
    var LOCATION_Y_MIN = 130;
    var LOCATION_Y_MAX = 630;

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

    console.log(x, y);

    pinMain.style.left = x + 'px';
    pinMain.style.top = y  + 'px';
   };

  var clickInMapCoords = function (absoluteX, absoluteY) {
    var coords = {
      x: absoluteX - mapRect.x,
      y: absoluteY - mapRect.y
    };
    return movePinTo(coords.x, coords.y);
  };



  var getAddressValue = function (pin) {
    var address = getComputedStyle(pin);
    var x = parseInt(address.left, 10);
    var y = parseInt(address.top, 10);
    x += Math.round(PIN_WIDTH / 2);
    y += PIN_HEIGHT;

    return new Coordinate(x, y);
  };

  var setInputAdress = function () {
    var inputAddress = document.querySelector('#address');

    inputAddress.setAttribute('readonly', 'readonly');
    inputAddress.value = getAddressValue(pinMain).x + ', ' + getAddressValue(pinMain).y;
  };
//
//   var mainPinHandler = function (evt) {
//
//     var mapRect = map.getBoundingClientRect();
//     var LOCATION_X_MIN = (mapRect.right - mapRect.width - mapRect.x) + PIN_WIDTH / 2;
//     var LOCATION_X_MAX = mapRect.width - PIN_WIDTH / 2;
//     var LOCATION_Y_MIN = 130;
//     var LOCATION_Y_MAX = 630 - PIN_HEIGHT;
//
//     var startCoords = new Coordinate(evt.clientX, evt.clientY);
//
//     var onMouseMove = function (moveEvt) {
//       moveEvt.preventDefault();
//
//       var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);
//
//       startCoords.setX(moveEvt.clientX);
//       startCoords.setY(moveEvt.clientY);
//
//       var endCoords = new Coordinate(startCoords.x - mapRect.x, startCoords.y - mapRect.y);
//       if ((endCoords.x >= LOCATION_X_MIN) && (endCoords.x <= LOCATION_X_MAX)) {
//         pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
//         setInputAdress();
//       }
//       if ((endCoords.y >= LOCATION_Y_MIN) && (endCoords.y <= LOCATION_Y_MAX)) {
//         pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
//         setInputAdress();
//       }
//     };
//
//     var onMouseUp = function (upEvt) {
//       upEvt.preventDefault();
//
//       document.removeEventListener('mousemove', onMouseMove);
//       document.removeEventListener('mouseup', onMouseUp);
//     };
//     document.addEventListener('mousemove', onMouseMove);
//     document.addEventListener('mouseup', onMouseUp);
//   };
//
  window.mainPinMove = {
    movePinTo: movePinTo,
    setInputAdress: setInputAdress,
    clickInMapCoords: clickInMapCoords
  };
})();
