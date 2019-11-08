'use strict';

(function () {
  var ESC_KEYCODE = window.util.ESC_KEYCODE;

  var save = window.backend.save;
  var onMainPinClick = window.map.onMainPinClick;
  var resetPage = window.resetPage;
  var setMinValuePlaceholder = window.initialStateForm.setMinValuePlaceholder;
  var setTimeSynch = window.initialStateForm.setTimeSynch;
  var renderCapacity = window.initialStateForm.renderCapacity;

  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');

  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var typeSelect = adForm.querySelector('#type');

  timeIn.addEventListener('input', function (evt) {
    var option = evt.currentTarget.selectedIndex;
    setTimeSynch(option);
  });
  timeOut.addEventListener('input', function (evt) {
    var option = evt.currentTarget.selectedIndex;
    setTimeSynch(option);
  });

  typeSelect.addEventListener('input', function (evt) {
    var option = evt.currentTarget.value;
    setMinValuePlaceholder(option.toUpperCase());
  });


  var roomNumberSelect = document.querySelector('#room_number');

  roomNumberSelect.addEventListener('input', function (evt) {
    var room = evt.target.value;
    renderCapacity(room);
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

  var saveError = function (err) {
    var errorTemplate = document.querySelector('#error');
    var errorElement = errorTemplate.content.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    errorMessage.innerHTML = err + ', упс!';

    main.prepend(errorElement);

    var onCloseErrorClick = function () {
      var error = main.querySelector('.error');
      error.remove();
      renderCapacity(roomNumberSelect.value);
      errorButton.removeEventListener('click', onCloseErrorClick);
    };

    var onCloseErrorEsc = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        var error = main.querySelector('.error');
        error.remove();
        renderCapacity(roomNumberSelect.value);
      }
      document.removeEventListener('keydown', onCloseErrorEsc);
    };

    errorButton.addEventListener('click', onCloseErrorClick);
    document.addEventListener('keydown', onCloseErrorEsc);
  };


  adForm.addEventListener('submit', function (evt) {
    save(new FormData(adForm), function () {
      resetPage();
      successMessageHandler();
    }, saveError);

    pinMain.addEventListener('mousedown', onMainPinClick);
    evt.preventDefault();
  });

  adForm.addEventListener('reset', function (evt) {
    evt.preventDefault();
    resetPage();
    pinMain.addEventListener('mousedown', onMainPinClick);
  });
})();
