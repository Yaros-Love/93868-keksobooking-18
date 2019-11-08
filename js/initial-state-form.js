'use strict';

(function () {
  var PIN_MAIN_DEFAULT_COORDS = window.util.PIN_MAIN_DEFAULT_COORDS;
  var MIN_LENGTH = 30;
  var MAX_LENGTH = 100;

  var adForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var inputAddress = adForm.querySelector('#address');
  var title = adForm.querySelector('#title');
  var price = adForm.querySelector('#price');
  var typeSelect = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');


  var setFieldsetsDisable = function () {
    fieldsets.forEach(function (item) {
      item.disabled = true;
    });
  };
  setFieldsetsDisable();

  var setAdressInactiveState = function () {
    inputAddress.value = PIN_MAIN_DEFAULT_COORDS.x + ', ' + PIN_MAIN_DEFAULT_COORDS.y;
  };
  setAdressInactiveState();

  var setTimeSynch = function (option) {
    timeOut.options[option].selected = true;
    timeIn.options[option].selected = true;
  };


  title.minLength = MIN_LENGTH;
  title.maxLength = MAX_LENGTH;
  title.required = true;

  var roomVariant = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  price.setAttribute('required', 'required');
  price.setAttribute('max', '1000000');
  typeSelect.value = 'house';
  price.setAttribute('min', '5000');

  var setMinValuePlaceholder = function (option) {
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
    setFieldsetsDisable: setFieldsetsDisable,
    setAdressInactiveState: setAdressInactiveState,
    setMinValuePlaceholder: setMinValuePlaceholder,
    renderCapacity: renderCapacity,
    setTimeSynch: setTimeSynch
  };
})();
