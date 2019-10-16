'use strict';

(function () {
  var renderPin = window.pin.renderPin;
  var ENTER_KEYCODE = window.util.ENTER_KEYCODE;
  // var renderCard = window.card.renderCard;
  // var getRandomInt = window.util.getRandomInt;
  var load = window.backend.load;

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');

  var resetDisable = function (obj) {
    for (var j = 0; j < obj.length; j++) {
      obj[j].removeAttribute('disabled', 'disabled');
    }
  };

  var insertPinsInMap = function (arr) {
    var fragment = document.createDocumentFragment();
    var similarListPin = map.querySelector('.map__pins');

    if (arr.length !== 0) {
      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(renderPin(arr[i]));
      }
      similarListPin.appendChild(fragment);
    }

    return similarListPin;
  };

  var successHandler = function (data) {
    resetDisable(fieldsets);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    map.appendChild(insertPinsInMap(data));

    //  появление карточки при клике на пин пока работает не очень
    // var pins = map.querySelector('.map__pins');
    // pins.addEventListener('click', function (evt) {
    //   var target = evt.target
    //   var src = target.getAttribute('src');
    //   var userNumber = getNumberFromString(src);
    //   console.log(data);
    //
    //   if (target.tagName === 'IMG' && data.src != 'default') {
    //     // searchObj(data, src);
    //     var randomItemCardInArray = renderCard(data[userNumber]);
    //     map.appendChild(randomItemCardInArray);
    //
    //     console.log('click');
    //   }
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

  //  функция вытаскивает из строки число
  // var getNumberFromString = function (str) {
  //   var emptyStr = '';
  //   for (var i in str) {
  //     if ( parseInt(str[i]) ) {
  //       emptyStr += str[i];
  //     }
  //   }
  //   parseInt(emptyStr);
  //
  //   return parseInt(emptyStr);
  // };

  window.map = {
    insertPinsInMap: insertPinsInMap,
    map: map,
    pinMain: pinMain,
    adForm: adForm
  };
})();
