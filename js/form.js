'use strict';

(function () {
  var ESC_KEYCODE = window.util.ESC_KEYCODE;
  var save = window.backend.save;
  var errorHandler = window.map.errorHandler;
  var onMainPinClick = window.map.onMainPinClick;
  var removeChilds = window.card.removeChilds;
  var adForm = document.querySelector('.ad-form');

  var MIN_LENGTH = 30;
  var MAX_LENGTH = 100;
  var title = adForm.querySelector('#title');
  title.minLength = MIN_LENGTH;
  title.maxLength = MAX_LENGTH;
  title.required = true;


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

  var main = document.querySelector('main');

  var successMessageHandler = function () {
    var successTemplate = document.querySelector('#success');
    var successElement = successTemplate.content.cloneNode(true);

    main.prepend(successElement);

    var successClose = function () {
      var message = main.querySelector('.success');
      message.remove();
      main.removeEventListener('click', successClose);
    };

    main.addEventListener('click', successClose);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        successClose();
      }
    });
  };

  var setDefaultStatePage = function () {
    var pinMain = document.querySelector('.map__pin--main');
    var fieldsets = document.querySelectorAll('fieldset');
    var map = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins');
    var pinMainDefaultCoords = {
      left: 570,
      top: 375
    };

    var setDisable = function (fieldsetsArr) {
      for (var j = 0; j < fieldsetsArr.length; j++) {
        fieldsetsArr[j].setAttribute('disabled', 'disabled');
      }
    };

    removeChilds(mapPins);
    setDisable(fieldsets);

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPins.appendChild(pinMain);
    pinMain.style.left = pinMainDefaultCoords.left + 'px';
    pinMain.style.top = pinMainDefaultCoords.top + 'px';
    pinMain.addEventListener('mousedown', onMainPinClick);
  };

  adForm.addEventListener('submit', function (evt) {
    save(new FormData(adForm), function () {
      setDefaultStatePage();
      successMessageHandler();
      adForm.reset();
    }, errorHandler);

    evt.preventDefault();
  });
})();
