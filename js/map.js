'use strict';

(function () {
  var renderPin = window.pin.renderPin;
  var ENTER_KEYCODE = window.util.ENTER_KEYCODE;
  var PINS_AMOUNT = 5;
  var load = window.backend.load;

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

  var insertPinsInMap = function (dataObj) {
    var fragment = document.createDocumentFragment();
    var takeNumber = dataObj.length > PINS_AMOUNT ? PINS_AMOUNT : dataObj.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(dataObj[i]));
    }

    return fragment;
  };

  var pins = [];
  var updatePins = function (value) {
    var typeHouse = pins.filter(function (it) {
      return it.offer.type === value || value === 'any';
    });
    mapPins.innerHTML = '';
    mapPins.appendChild(insertPinsInMap(typeHouse));
  };

  var successHandler = function (data) {
    pins = data;
    resetDisable(fieldsets);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapPins.appendChild(insertPinsInMap(data));
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

    // добавить обработчики на click/keydown ESC
  };

  var onMainPinClick = function () {
    load(successHandler, errorHandler);
    pinMain.removeEventListener('click', onMainPinClick);
  };

  pinMain.addEventListener('click', onMainPinClick);

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onMainPinClick();
    }
  });

  housingType.addEventListener('change', function (evt) {
    var value = evt.target.value;
    updatePins(value);
    var mapCard = document.querySelector('.map__card');
    if (mapCard !== null) {
      mapCard.remove();
    }
  });

  window.map = {
    insertPinsInMap: insertPinsInMap,
    map: map
  };
})();
