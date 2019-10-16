'use strict';

(function () {
  var map = document.querySelector('.map');;
  var adForm = document.querySelector('.ad-form');
  var renderCard = window.card.renderCard;
  var getRandomInt = window.util.getRandomInt;
  var insertPinsInMap = window.map.insertPinsInMap;
  var similarAdsArray = window.data.similarAdsArray;

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
    resetDisable(fieldsets);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    // var randomItemCardInArray = renderCard(similarAdsArray[getRandomInt(0, similarAdsArray.length - 1)]);
    // map.appendChild(randomItemCardInArray);
    // map.appendChild(insertPinsInMap());

    map.appendChild(insertPinsInMap(similarAdsArray));
  };

  // var successHandler = function (data) {
  //   // similarListElement.appendChild(insertWizards(data));
  //   // setup.querySelector('.setup-similar').classList.remove('hidden');
  //   // console.log(data);
  //
  //   resetDisable(fieldsets);
  //   map.classList.remove('map--faded');
  //   adForm.classList.remove('ad-form--disabled');
  //   var randomItemCardInArray = renderCard(data);
  //   map.appendChild(randomItemCardInArray);
  //   // map.appendChild(insertPinsInMap());
  //
  //   map.appendChild(insertPinsInMap(data));
  //
  // };



  window.mapActivation = {
    mapActivation: mapActivation

    // successHandler: successHandler
  };
})();
