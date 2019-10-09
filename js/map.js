'use strict';

(function () {
  var fieldsets = document.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }

  var resetDisable = function (obj) {
    for (var j = 0; j < obj.length; j++) {
      obj[j].removeAttribute('disabled', 'disabled');
    }
  };

  var map = document.querySelector('.map');

  window.insertPinsInMap = function (arr) {
    var fragment = document.createDocumentFragment();
    var similarListPin = map.querySelector('.map__pins');

    if (arr.length !== 0) {
      for (var i = 0; i < similarAdsArray.length; i++) {
        fragment.appendChild(window.renderPin(window.similarAdsArray[i]));
      }
      similarListPin.appendChild(fragment);
    }

    return similarListPin;
  };

  var pinMain = map.querySelector('.map__pin--main');

  pinMain.addEventListener('mousedown', function () {
    resetDisable(fieldsets);
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    var randomItemCardInArray = window.renderCard(similarAdsArray[window.getRandomInt(0, similarAdsArray.length - 1)]);
    map.appendChild(randomItemCardInArray);
    map.appendChild(insertPinsInMap(similarAdsArray));
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      resetDisable(fieldsets);
      map.classList.remove('map--faded');
      window.form.adForm.classList.remove('ad-form--disabled');
      var randomItemCardInArray = window.renderCard(similarAdsArray[window.getRandomInt(0, similarAdsArray.length - 1)]);
      map.appendChild(randomItemCardInArray);
      map.appendChild(window.insertPinsInMap(similarAdsArray));
    }
  });

  window.map = {
    pinMain: pinMain
  };
})();
