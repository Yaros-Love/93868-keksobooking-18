'use strict';

(function () {
  var ESC_KEY_CODE = window.util.ESC_KEY_CODE;

  var save = window.backend.save;
  var onMainPinClick = window.map.onMainPinClick;
  var resetPage = window.resetPage;
  var setMinValuePlaceholder = window.initialStateForm.setMinValuePlaceholder;
  var setTimeSync = window.initialStateForm.setTimeSync;
  var renderCapacity = window.initialStateForm.renderCapacity;
  var errorHandler = window.util.errorHandler;

  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');

  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var typeSelect = adForm.querySelector('#type');

  timeIn.addEventListener('input', function (evt) {
    var option = evt.currentTarget.selectedIndex;
    setTimeSync(option);
  });
  timeOut.addEventListener('input', function (evt) {
    var option = evt.currentTarget.selectedIndex;
    setTimeSync(option);
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

  var successMessageHandler = function () {
    var main = document.querySelector('main');
    var successTemplate = document.querySelector('#success');
    var successElement = successTemplate.content.cloneNode(true);

    main.prepend(successElement);

    var successClose = function () {
      var message = main.querySelector('.success');
      message.remove();
      main.removeEventListener('click', successClose);
    };

    var onCloseSuccessEsc = function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        var message = main.querySelector('.success');
        message.remove();
        renderCapacity(roomNumberSelect.value);
      }
      document.removeEventListener('keydown', onCloseSuccessEsc);
    };

    main.addEventListener('click', successClose);
    document.addEventListener('keydown', onCloseSuccessEsc);
  };


  adForm.addEventListener('submit', function (evt) {
    save(new FormData(adForm), function () {
      resetPage();
      successMessageHandler();
    }, errorHandler);

    pinMain.addEventListener('mousedown', onMainPinClick);
    evt.preventDefault();
  });

  adForm.addEventListener('reset', function (evt) {
    evt.preventDefault();
    resetPage();
    pinMain.addEventListener('mousedown', onMainPinClick);
  });
})();
