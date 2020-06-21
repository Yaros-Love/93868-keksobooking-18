'use strict';
// модуль с валидацией форм

(function () {
  var mapPinMainElem = window.const.mapPinMainElem//главная метка на карте
  var mapPinMainWidth = window.const.mapPinMainWidth;
  var mapPinMainHeight = window.const.mapPinMainHeight;
  var mapElement = window.const.mapElement;
  var addFormElement = window.const.addFormElement;
  var PIN_ARROW_HEIGHT = window.const.PIN_ARROW_HEIGHT;
  // устанавливаем значение поля адреса, центр метки до активации
  // устанавливаем значение поля адреса для активного состояния, конец указателя метки
  var inputAddress = document.querySelector('#address');

  /// переменные координат x и y для адреса
  var positionXAddress;
  var positionYAddress;

  ///координаты метки в неактивном состоянии
  var valueOfAddressInput = function () {
    if (mapElement.classList.contains('map--faded') === true) {
      positionXAddress = Math.floor(mapPinMainElem.offsetLeft + mapPinMainWidth * 0.5);
      positionYAddress = Math.floor(mapPinMainElem.offsetTop + mapPinMainHeight * 0.5);
      inputAddress.value = positionXAddress + ', ' + positionYAddress;
    }
  }
  valueOfAddressInput();

  /// координаты в активном при нажатии мышью на маркер
  mapPinMainElem.addEventListener('mousemove', function () {
    positionXAddress = Math.floor(mapPinMainElem.offsetLeft + mapPinMainWidth * 0.5);
    positionYAddress = Math.floor(mapPinMainElem.offsetTop + mapPinMainHeight + PIN_ARROW_HEIGHT);
    inputAddress.value = positionXAddress + ', ' + positionYAddress;
  })
  
  // валидация полей с комнатами и количеством гостей
  var roomNumberSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');

  var checkValidRooms = function () {
    if (roomNumberSelect.value === '100' && capacitySelect.value !== '0') {
      roomNumberSelect.setCustomValidity('Количетво комнат явно не для гостей')
      return (roomNumberSelect.reportValidity(), capacitySelect.setCustomValidity(""))
    }

    if (roomNumberSelect.value !== '100' && capacitySelect.value === '0') {
      capacitySelect.setCustomValidity('Выберите количество гостей')
      return (capacitySelect.reportValidity(), roomNumberSelect.setCustomValidity(""))
    }

    if (roomNumberSelect.value < capacitySelect.value) {
      roomNumberSelect.setCustomValidity('Количество комнат не должно быть меньше количества гостей!')
      return (roomNumberSelect.reportValidity(), capacitySelect.setCustomValidity(""))
    }

    else {
      roomNumberSelect.setCustomValidity("");
      capacitySelect.setCustomValidity("");
      return
    }
  }

  // слушатели на изм значений в полях "гостей" и "комнат"
  roomNumberSelect.addEventListener('input', checkValidRooms);
  capacitySelect.addEventListener('input', checkValidRooms);

  //валидация вида жилья и стоимости
  var typeSelectElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');

  typeSelectElement.addEventListener('change', function () {
    if (typeSelectElement.value === 'bungalo') {
      priceInputElement.setAttribute('min', '0');
      priceInputElement.setAttribute('placeholder', '0')
    }
    if (typeSelectElement.value === 'flat') {
      priceInputElement.setAttribute('min', '1000');
      priceInputElement.setAttribute('placeholder', '1 000')
    }
    if (typeSelectElement.value === 'house') {
      priceInputElement.setAttribute('min', '5000');
      priceInputElement.setAttribute('placeholder', '5 000')
    }
    if (typeSelectElement.value === 'palace') {
      priceInputElement.setAttribute('min', '10000');
      priceInputElement.setAttribute('placeholder', '10 000')
    }
  })

  //валидация времени заезда и выезда
  var timeinSelectElement = document.querySelector('#timein');
  var timeoutSelectElement = document.querySelector('#timeout');

  timeinSelectElement.addEventListener('change', function () {
    timeoutSelectElement.value = timeinSelectElement.value;
  })
  timeoutSelectElement.addEventListener('change', function () {
    timeinSelectElement.value = timeoutSelectElement.value
  })

  addFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault()
  })
})()
