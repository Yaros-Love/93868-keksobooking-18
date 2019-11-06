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
  var debounce = window.debounce;

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var mapPins = map.querySelector('.map__pins');
  var filter = document.querySelector('.map__filters');

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

  var updatePins = debounce(function () {
    var housingType = filter.querySelector('#housing-type');
    var housingPrice = filter.querySelector('#housing-price');
    var housingRooms = filter.querySelector('#housing-rooms');
    var housingGuests = filter.querySelector('#housing-guests');
    var housingCheckedFeatures = filter.querySelectorAll('input:checked');

    var getPriceRange = function (option, x) {
      var housingPriceRange = {
        'high': {
          'min': 50000,
          'max': Infinity
        },
        'low': {
          'min': 0,
          'max': 9999
        },
        'middle': {
          'min': 10000,
          'max': 50001
        }
      };

      return x >= housingPriceRange[option].min && x <= housingPriceRange[option].max;
    };

    var filteredHouseArr = pins.
    filter(function (item) {
      return item.offer.type === housingType.value || housingType.value === 'any';
    })
    .filter(function (item) {
      return housingPrice.value === 'any' || getPriceRange(housingPrice.value, item.offer.price);
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

    removeChilds(mapPins);
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

  var pins = [];
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
    onMainPinClick: onMainPinClick,
    map: map
  };
})();
