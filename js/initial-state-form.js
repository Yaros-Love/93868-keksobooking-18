'use strict';

(function () {
  var PIN_MAIN_DEFAULT_COORDS = {
    x: 570,
    y: 375
  };
  var PIN_RADIUS = window.util.PIN_RADIUS;
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var MAX_PRICE = 1000000;
  var MIN_PRICE = 5000;
  var RoomVariant = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var TypeHouse = {
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

  var adFormElement = document.querySelector('.ad-form');
  var selectElements = document.querySelectorAll('select');
  var fieldsetElements = document.querySelectorAll('fieldset');
  var inputAddressElement = adFormElement.querySelector('#address');


  var setDisable = function (elements) {
    elements.forEach(function (item) {
      item.disabled = true;
    });
  };
  setDisable(selectElements);
  setDisable(fieldsetElements);

  var setAddressInactiveState = function () {
    inputAddressElement.readOnly = true;
    inputAddressElement.value = (PIN_MAIN_DEFAULT_COORDS.x + PIN_RADIUS) + ', ' + (PIN_MAIN_DEFAULT_COORDS.y + PIN_RADIUS);
  };
  setAddressInactiveState();


  var timeInElement = adFormElement.querySelector('#timein');
  var timeOutElement = adFormElement.querySelector('#timeout');

  var setTimeSync = function (option) {
    timeOutElement.options[option].selected = true;
    timeInElement.options[option].selected = true;
  };


  var titleElement = adFormElement.querySelector('#title');

  titleElement.minLength = MIN_LENGTH_TITLE;
  titleElement.maxLength = MAX_LENGTH_TITLE;
  titleElement.required = true;

  var typeSelectElement = adFormElement.querySelector('#type');
  var priceElement = adFormElement.querySelector('#price');
  var roomNumberSelectElement = document.querySelector('#room_number');
  var capacitySelectElement = document.querySelector('#capacity');
  var capacityOptionElements = capacitySelectElement.querySelectorAll('option');

  priceElement.required = true;
  priceElement.max = MAX_PRICE;
  typeSelectElement.value = 'house';
  priceElement.min = MIN_PRICE;


  var setMinValuePlaceholder = function (option) {
    priceElement.min = TypeHouse[option].minPrice;
    priceElement.placeholder = TypeHouse[option].minPrice;
  };

  var renderCapacity = function (roomValue) {
    capacityOptionElements.forEach(function (option) {
      if (!option.disabled) {
        option.disabled = true;
      }
    });
    RoomVariant[roomValue].forEach(function (item) {
      capacityOptionElements.forEach(function (opt) {
        if (parseInt(opt.value, 10) === item) {
          opt.disabled = false;
          opt.selected = true;
        }
      });
    });
  };

  renderCapacity(roomNumberSelectElement.value);

  window.initialStateForm = {
    PIN_MAIN_DEFAULT_COORDS: PIN_MAIN_DEFAULT_COORDS,
    setDisable: setDisable,
    setAddressInactiveState: setAddressInactiveState,
    setMinValuePlaceholder: setMinValuePlaceholder,
    renderCapacity: renderCapacity,
    setTimeSync: setTimeSync,
    TypeHouse: TypeHouse
  };
})();
