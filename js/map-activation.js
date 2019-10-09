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

  var mapActivation = function () {
    var map = window.map.map;
    var adForm = window.map.adForm;
    var renderCard = window.card.renderCard;
    var getRandomInt = window.util.getRandomInt;
    var insertPinsInMap = window.map.insertPinsInMap;
    var similarAdsArray = window.data.similarAdsArray;

    resetDisable(fieldsets);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    var randomItemCardInArray = renderCard(similarAdsArray[getRandomInt(0, similarAdsArray.length - 1)]);
    map.appendChild(randomItemCardInArray);
    map.appendChild(insertPinsInMap(similarAdsArray));
  };

  window.mapActivation = {
    mapActivation: mapActivation
  };
})();
