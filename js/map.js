'use strict';

(function () {
  var renderPin = window.pin.renderPin;
  var ENTER_KEYCODE = window.util.ENTER_KEYCODE;
  var PINS_AMOUNT = 5;
  var load = window.backend.load;
  var setInputAdress = window.mainPinMove.setInputAdress;
  var clickInMapCoords = window.mainPinMove.clickInMapCoords;
  var onMouseUp = window.mainPinMove.onMouseUp;
  var removeChilds = window.card.removeChilds;

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var mapPins = map.querySelector('.map__pins');
  var filter = document.querySelector('.map__filters');
  var housingType = filter.querySelector('#housing-type');

  var resetDisable = function (fieldsetsArr) {
    for (var j = 0; j < fieldsetsArr.length; j++) {
      fieldsetsArr[j].removeAttribute('disabled', 'disabled');
    }
  };

  var insertPinsInMap = function (pinsArr) {
    var fragment = document.createDocumentFragment();
    var takeNumber = pinsArr.length > PINS_AMOUNT ? PINS_AMOUNT : pinsArr.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(pinsArr[i]));
    }

    return fragment;
  };

  var pins = [];
  var updatePins = function (houseValue) {
    var typeHouseArr = pins.filter(function (item) {
      return item.offer.type === houseValue || houseValue === 'any';
    });
    removeChilds(mapPins);
    mapPins.appendChild(pinMain);
    mapPins.appendChild(insertPinsInMap(typeHouseArr));
  };

  housingType.addEventListener('change', function (evt) {
    var houseValue = evt.target.value;
    updatePins(houseValue);
    var mapCard = document.querySelector('.map__card');
    if (mapCard !== null) {
      mapCard.remove();
    }
  });

  var successHandler = function (data) {
    pins = data;
    resetDisable(fieldsets);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapPins.appendChild(insertPinsInMap(data));
    setInputAdress();
  };

  var errorHandler = function (err) {
    var errorTemplate = document.querySelector('#error');
    var errorElement = errorTemplate.content.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    errorMessage.innerHTML = err + ', упс!';

    main.prepend(errorElement);

    errorButton.addEventListener('click', function () {
      document.location.reload(true);
    });
  };

  var onMainPinClick = function () {
    load(successHandler, errorHandler);
    pinMain.removeEventListener('mousedown', onMainPinClick);
  };
  pinMain.addEventListener('mousedown', onMainPinClick);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', clickInMapCoords);
    document.addEventListener('mouseup', onMouseUp);
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onMainPinClick();
    }
  });

  window.map = {
    insertPinsInMap: insertPinsInMap,
    map: map
  };
})();
