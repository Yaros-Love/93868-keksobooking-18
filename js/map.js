'use strict';

(function () {
  var ENTER_KEY_CODE = window.util.ENTER_KEY_CODE;

  var PINS_AMOUNT = 5;
  var HousingPriceRange = {
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
  var onPinMousemove = window.mainPinMove.onPinMousemove;
  var onMouseUp = window.mainPinMove.onMouseUp;
  var removeChildren = window.util.removeChildren;
  var debounce = window.util.debounce;
  // var addHandler = window.util.addHandler;
  var onLoadError = window.util.onLoadError;


  var adFormElement = document.querySelector('.ad-form');
  var mapElement = document.querySelector('.map');
  var pinMainElement = mapElement.querySelector('.map__pin--main');
  var fieldsetElements = document.querySelectorAll('fieldset');
  var selectElements = document.querySelectorAll('select');
  var mapPinsElement = mapElement.querySelector('.map__pins');
  var filterElement = document.querySelector('.map__filters');

  var pins = [];

  var resetDisable = function (elements) {
    elements.forEach(function (item) {
      item.disabled = false;
    });
  };

  var insertPinsInMap = function (array) {
    var fragment = document.createDocumentFragment();
    var takeNumber = array.length > PINS_AMOUNT ? PINS_AMOUNT : array.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(array[i]));
    }

    return fragment;
  };

  var getPriceRange = function (option, price) {
    return price >= HousingPriceRange[option].MIN && price <= HousingPriceRange[option].MAX;
  };

  var updatePins = debounce(function () {
    var housingTypeElement = filterElement.querySelector('#housing-type');
    var housingPriceElement = filterElement.querySelector('#housing-price');
    var housingRoomsElement = filterElement.querySelector('#housing-rooms');
    var housingGuestsElement = filterElement.querySelector('#housing-guests');
    var housingCheckedFeatureElements = filterElement.querySelectorAll('input:checked');

    var filteredHouses = pins
    .filter(function (item) {
      return (housingTypeElement.value === 'any' || item.offer.type === housingTypeElement.value) &&
              (housingPriceElement.value === 'any' || getPriceRange(housingPriceElement.value.toUpperCase(), item.offer.price)) &&
              (housingRoomsElement.value === 'any' || parseInt(housingRoomsElement.value, 10) === item.offer.rooms) &&
              (housingGuestsElement.value === 'any' || parseInt(housingGuestsElement.value, 10) === item.offer.guests) &&
              (Array.from(housingCheckedFeatureElements).every(function (elem) {
                return item.offer.features.includes(elem.value);
              }));
    });

    removeChildren(mapPinsElement);
    mapPinsElement.appendChild(pinMainElement);
    mapPinsElement.appendChild(insertPinsInMap(filteredHouses));
  });

  filterElement.addEventListener('change', function () {
    updatePins();
    var mapCard = document.querySelector('.map__card');
    if (mapCard !== null) {
      mapCard.remove();
    }
  });


  var onMainPinClick = function () {
    resetDisable(fieldsetElements);
    resetDisable(selectElements);
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    setInputAddress();
    load(onLoadSuccess, onLoadError);

    // if (mainElement.querySelector('.error') === null) {
    //   pinMainElement.removeEventListener('mousedown', onMainPinClick);
    // } else {
    //   addHandler(pinMainElement, onMainPinClick);
    // }
    pinMainElement.removeEventListener('mousedown', onMainPinClick);
  };

  var onLoadSuccess = function (data) {
    pins = data;
    mapPinsElement.appendChild(insertPinsInMap(data));
  };


  pinMainElement.addEventListener('mousedown', onMainPinClick);

  pinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', onPinMousemove);
    document.addEventListener('mouseup', onMouseUp);
  });

  pinMainElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      onMainPinClick();
    }
  });

  window.map = {
    insertPinsInMap: insertPinsInMap,
    onMainPinClick: onMainPinClick
  };
})();
