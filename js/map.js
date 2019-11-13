'use strict';

(function () {
  var ENTER_KEY_CODE = window.util.ENTER_KEY_CODE;

  var PINS_AMOUNT = 5;
  var HOUSING_PRICE_RANGE = {
    'HIGH': {
      'MIN': 50000,
      'MAX': Infinity
    },
    'LOW': {
      'MIN': 0,
      'MAX': 9999
    },
    'MIDDLE': {
      'MIN': 10000,
      'MAX': 50001
    }
  };


  var renderPin = window.pin.renderPin;
  var load = window.backend.load;
  var setInputAddress = window.mainPinMove.setInputAddress;
  var clickInMapCoords = window.mainPinMove.clickInMapCoords;
  var onMouseUp = window.mainPinMove.onMouseUp;
  var removeChildren = window.util.removeChildren;
  var debounce = window.util.debounce;

  var errorHandler = window.util.errorHandler;


  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');
  var mapPins = map.querySelector('.map__pins');
  var filter = document.querySelector('.map__filters');

  var pins = [];

  var resetDisable = function (elements) {
    elements.forEach(function (item) {
      item.disabled = false;
    });
  };

  var insertPinsInMap = function (pinsArr) {
    var fragment = document.createDocumentFragment();
    var takeNumber = pinsArr.length > PINS_AMOUNT ? PINS_AMOUNT : pinsArr.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(pinsArr[i]));
    }

    return fragment;
  };

  var getPriceRange = function (option, price) {
    return price >= HOUSING_PRICE_RANGE[option].MIN && price <= HOUSING_PRICE_RANGE[option].MAX;
  };

  var updatePins = debounce(function () {
    var housingType = filter.querySelector('#housing-type');
    var housingPrice = filter.querySelector('#housing-price');
    var housingRooms = filter.querySelector('#housing-rooms');
    var housingGuests = filter.querySelector('#housing-guests');
    var housingCheckedFeatures = filter.querySelectorAll('input:checked');


    var filteredHouseArr = pins
      .filter(function (item) {
        return item.offer.type === housingType.value || housingType.value === 'any';
      })
      .filter(function (item) {
        return housingPrice.value === 'any' || getPriceRange(housingPrice.value.toUpperCase(), item.offer.price);
      })
      .filter(function (item) {
        return housingRooms.value === 'any' || parseInt(housingRooms.value, 10) === item.offer.rooms;
      })
      .filter(function (item) {
        return housingGuests.value === 'any' || parseInt(housingGuests.value, 10) === item.offer.guests;
      })
      .filter(function (item) {
        return Array.from(housingCheckedFeatures).every(function (elem) {
          return item.offer.features.includes(elem.value);
        });
      });

    removeChildren(mapPins);
    mapPins.appendChild(pinMain);
    mapPins.appendChild(insertPinsInMap(filteredHouseArr));
  });

  filter.addEventListener('change', function () {
    updatePins();
    var mapCard = document.querySelector('.map__card');
    if (mapCard !== null) {
      mapCard.remove();
    }
  });

  var onMainPinClick = function () {
    load(successHandler, errorHandler);
    pinMain.removeEventListener('mousedown', onMainPinClick);
  };

  var successHandler = function (data) {
    pins = data;
    resetDisable(fieldsets);
    resetDisable(selects);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapPins.appendChild(insertPinsInMap(data));
    setInputAddress();
  };


  pinMain.addEventListener('mousedown', onMainPinClick);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', clickInMapCoords);
    document.addEventListener('mouseup', onMouseUp);
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      onMainPinClick();
    }
  });

  window.map = {
    insertPinsInMap: insertPinsInMap,
    onMainPinClick: onMainPinClick,
    map: map,
    errorHandler: errorHandler
  };
})();
