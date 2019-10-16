'use strict';

(function () {
  var adForm = window.map.adForm;
  var pinMain = window.map.pinMain;
  var IMG_WIDTH = window.util.IMG_WIDTH;
  var IMG_HEIGHT = window.util.IMG_HEIGHT;

  var inputAddress = adForm.querySelector('#address');
  var title = adForm.querySelector('#title');

  var getAddressValue = function (obj) {
    var address = getComputedStyle(obj);
    var x = parseInt(address.left, 10);
    var y = parseInt(address.top, 10);
    x = x + IMG_WIDTH;
    y = y + IMG_HEIGHT;
    var value = '' + x + ', ' + y + '';

    return value;
  };


  title.minLength = '30';
  title.maxLength = '100';
  title.required = true;

  inputAddress.setAttribute('readonly', 'readonly');
  inputAddress.value = getAddressValue(pinMain);


  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var setTimeSynch = function (option) {
    timeOut.options[option].selected = true;
    timeIn.options[option].selected = true;
  };


  timeIn.addEventListener('input', function (evt) {
    var option = evt.currentTarget.selectedIndex;
    setTimeSynch(option);
  });

  timeOut.addEventListener('input', function (evt) {
    var option = evt.currentTarget.selectedIndex;
    setTimeSynch(option);
  });

  var price = adForm.querySelector('#price');
  var typeSelect = adForm.querySelector('#type');

  price.setAttribute('required', 'required');
  price.setAttribute('max', '1000000');
  typeSelect.value = 'house';
  price.setAttribute('min', '5000');

  var setMinValuePlaceholder = function (option) {
    var typeHouse = {
      'palace': {
        'text': 'Дворец',
        'minPrice': 10000
      },
      'house': {
        'text': 'Дом',
        'minPrice': 5000
      },
      'flat': {
        'text': 'Квартира',
        'minPrice': 1000
      },
      'bungalo': {
        'text': 'Бунгало',
        'minPrice': 0
      }
    };

    price.setAttribute('min', typeHouse[option].minPrice);
    price.setAttribute('placeholder', typeHouse[option].minPrice);
  };

  typeSelect.addEventListener('input', function (evt) {
    var option = evt.currentTarget.value;
    setMinValuePlaceholder(option);
  });

  var numberRoomException = '100';
  var capacityException = '0';
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  roomNumberSelect.value = '1';
  capacitySelect.value = '1';

  var renderCapacity = function (room) {
    var options = capacitySelect.children;
    for (var i = 0; i < options.length; i++) {
      if ((room >= options[i].value) && (options[i].value !== capacityException)) {
        options[i].disabled = false;
      } else if ((room === numberRoomException) && (options[i].value === capacityException)) {
        options[i].disabled = false;
      } else {
        options[i].disabled = true;
      }
    }
  };

  var checkValidation = function (room, capacityValue) {
    if ((room >= capacityValue) && (capacityValue !== capacityException) && (room !== numberRoomException)) {
      capacitySelect.setCustomValidity('');
    } else if ((room === numberRoomException) && (capacityValue === capacityException)) {
      capacitySelect.setCustomValidity('');
    } else if ((room === numberRoomException) && (capacityValue !== capacityException) || (room !== numberRoomException) && (capacityValue === '0')) {
      capacitySelect.setCustomValidity('Не для гостей - 100 комнат');
    } else {
      capacitySelect.setCustomValidity('Количество человек не должно превышать количество комнат!');
    }
  };

  roomNumberSelect.addEventListener('input', function (evt) {
    var room = evt.currentTarget.value;
    var capacityValue = capacitySelect.value;
    renderCapacity(room);
    checkValidation(room, capacityValue);
  });

  capacitySelect.addEventListener('input', function (evt) {
    var capacityValue = evt.currentTarget.value;
    var room = roomNumberSelect.value;
    checkValidation(room, capacityValue);
  });

})();
