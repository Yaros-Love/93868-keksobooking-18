'use strict';

(function () {
  var createOffersArray = function () {
    var getTypeFlatAsString = function (type) {
      switch (type) {
        case 'flat': return 'Квартира';
        case 'palace': return 'Дворец';
        case 'bungalo': return 'Бунгало';
        case 'house': return 'Дом';
      }
      return type;
    };

    var offersArray = [];

    var widthBlock = document.querySelector('.map__pins').offsetWidth;
    var AMOUNT_OFFER = 8;
    var PRICE = 5200;
    var TYPES = ['palace', 'flat', 'house', 'bungalo'];
    var CHECKINS = ['12:00', '13:00', '14:00'];
    var CHECKOUTS = ['12:00', '13:00', '14:00'];
    var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var DESCRIPTION = ['Великолепный Дворец в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.'];
    var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

    var LOCATION_X_MIN = window.util.IMG_WIDTH;
    var LOCATION_X_MAX = widthBlock - window.util.IMG_WIDTH;
    var LOCATION_Y_MIN = 130 + window.util.IMG_HEIGHT;
    var LOCATION_Y_MAX = 630 - window.util.IMG_HEIGHT;
    var getRandomInt = window.util.getRandomInt;
    var getRandomArray = window.util.getRandomArray;
    var IMG_WIDTH = window.util.IMG_WIDTH;
    var IMG_HEIGHT = window.util.IMG_HEIGHT;

    for (var i = 1; i <= AMOUNT_OFFER; i++) {
      var locationX = getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX);
      var locationY = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
      offersArray.push(
          {
            author: {
              avatar: 'img/avatars/user0' + i + '.png'
            },
            offer: {
              title: 'Самая классная локация',
              address: locationX + ', ' + locationY,
              price: PRICE,
              type: getTypeFlatAsString(TYPES[getRandomInt(0, TYPES.length - 1)]),
              rooms: getRandomInt(1, 3),
              guests: getRandomInt(1, 3),
              checkin: CHECKINS[getRandomInt(0, CHECKINS.length - 1)],
              checkout: CHECKOUTS[getRandomInt(0, CHECKOUTS.length - 1)],
              features: getRandomArray(FEATURES),
              description: DESCRIPTION,
              photos: PHOTOS[getRandomInt(0, PHOTOS.length - 1)]
            },
            location: {
              x: locationX - (IMG_WIDTH / 2),
              y: locationY - (IMG_HEIGHT / 2)
            }
          }
      );
    }

    return offersArray;
  };

  var similarAdsArray = createOffersArray();

  window.data = {
    similarAdsArray: similarAdsArray
  };
})();
