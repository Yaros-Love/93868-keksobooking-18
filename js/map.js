'use strict';

(function () {
  // var ENTER_KEY_CODE = window.util.ENTER_KEY_CODE;

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

  var isEnterEvent = window.util.isEnterEvent;
  var renderPin = window.pin.renderPin;
  var removeCard = window.card.removeCard;
  var load = window.backend.load;
  var setInputAddress = window.mainPinMove.setInputAddress;
  var onPinMouseMove = window.mainPinMove.onPinMouseMove;
  var onMouseUp = window.mainPinMove.onMouseUp;
  var removeChildren = window.util.removeChildren;
  var debounce = window.util.debounce;
  var onLoadError = window.util.onLoadError;

  var adFormElement = document.querySelector('.ad-form');
  var formSelectElements = adFormElement.querySelectorAll('select');
  var formFieldsetElements = adFormElement.querySelectorAll('fieldset');

  var mapElement = document.querySelector('.map');
  var mapPinsElement = mapElement.querySelector('.map__pins');
  var pinMainElement = mapElement.querySelector('.map__pin--main');

  var filterElement = document.querySelector('.map__filters');
  var filterSelectElements = filterElement.querySelectorAll('select');
  var filterFieldsetElements = filterElement.querySelectorAll('fieldset');
  var housingTypeElement = filterElement.querySelector('#housing-type');
  var housingPriceElement = filterElement.querySelector('#housing-price');
  var housingRoomsElement = filterElement.querySelector('#housing-rooms');
  var housingGuestsElement = filterElement.querySelector('#housing-guests');


  var pins = [];

  var resetDisable = function (elements) {
    elements.forEach(function (item) {
      item.disabled = false;
    });
  };

  var insertPinsInMap = function (arrayPins) {
    var fragment = document.createDocumentFragment();
    var takeNumber = arrayPins.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(arrayPins[i]));
    }

    return fragment;
  };

  var getPriceRange = function (option, price) {
    return price >= HousingPriceRange[option].MIN && price <= HousingPriceRange[option].MAX;
  };
  var getFilters = function () {
    var housingCheckedFeatureElements = filterElement.querySelectorAll('input:checked');
    var filters = [
      function (item) {
        return item.offer;
      },
      function (item) {
        return housingTypeElement.value === 'any' || item.offer.type === housingTypeElement.value;
      },
      function (item) {
        return housingPriceElement.value === 'any' || getPriceRange(housingPriceElement.value.toUpperCase(), item.offer.price);
      },
      function (item) {
        return housingRoomsElement.value === 'any' || parseInt(housingRoomsElement.value, 10) === item.offer.rooms;
      },
      function (item) {
        return housingGuestsElement.value === 'any' || parseInt(housingGuestsElement.value, 10) === item.offer.guests;
      },
      function (item) {
        return Array.from(housingCheckedFeatureElements).every(function (elem) {
                 return item.offer.features.includes(elem.value);
             });
      }
    ];

    return filters;
  };

  var updatePins = debounce(function () {
    var filters = getFilters();
    var filteredHouses = [];
    for (var i = 0; (i < pins.length) && (filteredHouses.length < PINS_AMOUNT); i++) {
      var isValidHouse = filters.every(function (filter) {
        return filter(pins[i]);
      });

      if (isValidHouse) {
        filteredHouses.push(pins[i]);
      }
    }
    removeChildren(mapPinsElement);
    mapPinsElement.appendChild(pinMainElement);
    mapPinsElement.appendChild(insertPinsInMap(filteredHouses));
  });

  filterElement.addEventListener('change', function () {
    updatePins();
    removeCard();
  });

  var onRequestDataLoad = function () {
    load(onLoadSuccess, onMainPinLoadError);

    pinMainElement.removeEventListener('mousedown', onRequestDataLoad);
  };

  var onMainPinLoadError = function (error) {
    onLoadError(error);

    pinMainElement.addEventListener('mousedown', onRequestDataLoad);
  };

  var onMainPinClick = function () {
    resetDisable(formSelectElements);
    resetDisable(formFieldsetElements);
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    setInputAddress();
    onRequestDataLoad();
    pinMainElement.removeEventListener('mousedown', onMainPinClick);
  };

  var onLoadSuccess = function (data) {
    pins = data;

    updatePins();
    resetDisable(filterFieldsetElements);
    resetDisable(filterSelectElements);
  };

  pinMainElement.addEventListener('mousedown', onMainPinClick);

  pinMainElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  pinMainElement.addEventListener('keydown', function (evt) {
    isEnterEvent(evt, onMainPinClick);
  });

  window.map = {
    insertPinsInMap: insertPinsInMap,
    onMainPinClick: onMainPinClick
  };
})();
