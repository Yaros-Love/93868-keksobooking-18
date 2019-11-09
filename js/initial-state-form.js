'use strict';

(function () {
  var Coordinate = window.coordinate.Coordinate;
  var PIN_MAIN_DEFAULT_COORDS = new Coordinate(570, 375);
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var MAX_PRICE = 1000000;
  var MIN_PRICE = 5000;

  var adForm = document.querySelector('.ad-form');
  var selects = document.querySelectorAll('select');
  var fieldsets = document.querySelectorAll('fieldset');
  var inputAddress = adForm.querySelector('#address');


  var setDisable = function (elements) {
    elements.forEach(function (item) {
      item.disabled = true;
    });
  };
  setDisable(selects);
  setDisable(fieldsets);

  var setAddressInactiveState = function () {
    inputAddress.value = PIN_MAIN_DEFAULT_COORDS.x + ', ' + PIN_MAIN_DEFAULT_COORDS.y;
  };
  setAddressInactiveState();


  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var setTimeSync = function (option) {
    timeOut.options[option].selected = true;
    timeIn.options[option].selected = true;
  };


  var title = adForm.querySelector('#title');

  title.minLength = MIN_LENGTH_TITLE;
  title.maxLength = MAX_LENGTH_TITLE;
  title.required = true;

  var typeSelect = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');

  var roomVariant = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  price.setAttribute('required', 'required');
  price.setAttribute('max', MAX_PRICE);
  typeSelect.value = 'house';
  price.setAttribute('min', MIN_PRICE);

  var typeHouse = {
    'PALACE': {
      'text': 'Дворец',
      'minPrice': 10000
    },
    'HOUSE': {
      'text': 'Дом',
      'minPrice': 5000
    },
    'FLAT': {
      'text': 'Квартира',
      'minPrice': 1000
    },
    'BUNGALO': {
      'text': 'Бунгало',
      'minPrice': 0
    }
  };

  var setMinValuePlaceholder = function (option) {
    price.setAttribute('min', typeHouse[option].minPrice);
    price.setAttribute('placeholder', typeHouse[option].minPrice);
  };

  var renderCapacity = function (roomValue) {
    capacityOptions.forEach(function (option) {
      option.disabled = true;
    });
    roomVariant[roomValue].forEach(function (item) {
      capacityOptions.forEach(function (opt) {
        if (parseInt(opt.value, 10) === item) {
          opt.disabled = false;
          opt.selected = true;
        }
      });
    });
  };

  renderCapacity(roomNumberSelect.value);

  window.initialStateForm = {
    PIN_MAIN_DEFAULT_COORDS: PIN_MAIN_DEFAULT_COORDS,
    setDisable: setDisable,
    setAddressInactiveState: setAddressInactiveState,
    setMinValuePlaceholder: setMinValuePlaceholder,
    renderCapacity: renderCapacity,
    setTimeSync: setTimeSync,
    typeHouse: typeHouse
  };
})();
