'use strict';

(function () {
  var save = window.backend.save;
  var onMainPinClick = window.map.onMainPinClick;
  var resetPage = window.resetPage;
  var setMinValuePlaceholder = window.initialStateForm.setMinValuePlaceholder;
  var setTimeSync = window.initialStateForm.setTimeSync;
  var renderCapacity = window.initialStateForm.renderCapacity;
  var onLoadError = window.util.onLoadError;
  var isEscEvent = window.util.isEscEvent;

  var adFormElement = document.querySelector('.ad-form');
  var pinMainElement = document.querySelector('.map__pin--main');

  var timeInElement = adFormElement.querySelector('#timein');
  var timeOutElement = adFormElement.querySelector('#timeout');
  var typeSelectElement = adFormElement.querySelector('#type');

  timeInElement.addEventListener('input', function (evt) {
    var option = evt.currentTarget.selectedIndex;
    setTimeSync(option);
  });
  timeOutElement.addEventListener('input', function (evt) {
    var option = evt.currentTarget.selectedIndex;
    setTimeSync(option);
  });

  typeSelectElement.addEventListener('input', function (evt) {
    var option = evt.currentTarget.value;
    setMinValuePlaceholder(option.toUpperCase());
  });

  var roomNumberSelectElement = document.querySelector('#room_number');

  roomNumberSelectElement.addEventListener('input', function (evt) {
    var room = evt.target.value;
    renderCapacity(room);
  });

  var mainElement = document.querySelector('main');
  var successTemplateElement = document.querySelector('#success');

  var showSuccessMessage = function () {
    var successElement = successTemplateElement.content.cloneNode(true);

    mainElement.prepend(successElement);

    var closeSuccessMessage = function () {
      mainElement.querySelector('.success').remove();

      mainElement.removeEventListener('click', onPopupSuccessClick);
      document.removeEventListener('keydown', onPopupSuccessPressEsc);
    };

    var onPopupSuccessClick = function () {
      closeSuccessMessage();
    };

    var onPopupSuccessPressEsc = function (evt) {
      isEscEvent(evt, closeSuccessMessage);
    };

    mainElement.addEventListener('click', onPopupSuccessClick);
    document.addEventListener('keydown', onPopupSuccessPressEsc);
  };

  var adFormSelectElements = adFormElement.querySelectorAll('select');
  var adFormInputElements = adFormElement.querySelectorAll('input');
  var adFormButtonElement = adFormElement.querySelector('.ad-form__submit');

  var setBorderInvalid = function (element) {
    if (element.validity.valid) {
      element.classList.remove('ad-form--invalid');
    } else {
      element.classList.add('ad-form--invalid');
    }
  };

  var checkValidation = function (elements) {
    elements.forEach(function (item) {
      setBorderInvalid(item);
    });
  };

  adFormButtonElement.addEventListener('click', function () {
    checkValidation(adFormInputElements);
    checkValidation(adFormSelectElements);
  });

  adFormElement.addEventListener('submit', function (evt) {
    save(new FormData(adFormElement), function () {
      resetPage();
      showSuccessMessage();
    }, onLoadError);

    pinMainElement.addEventListener('mousedown', onMainPinClick);
    evt.preventDefault();
  });

  adFormElement.addEventListener('reset', function (evt) {
    evt.preventDefault();
    resetPage();
    pinMainElement.addEventListener('mousedown', onMainPinClick);
  });
})();
