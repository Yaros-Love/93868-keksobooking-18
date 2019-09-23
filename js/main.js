'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var widthBlock = map.querySelector('.map__pins').offsetWidth;

var AMOUNT_OFFER = 8;
var TITLE = 'Уютное гнездышко для молодоженов';
var PRICE = 5200;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var IMG_WIDTH = 40;
var IMG_HEIGHT = 70;
var LOCATION_X_MIN = 0 + IMG_WIDTH;
var LOCATION_X_MAX = widthBlock - IMG_WIDTH;
var LOCATION_Y_MIN = 130 + IMG_HEIGHT;
var LOCATION_Y_MAX = 630 - IMG_HEIGHT;

var getRandomArray = function (arr) {
  var randomArr = [];
  for (var i = 0; i <= Math.floor(Math.random() * arr.length); i++) {
    randomArr.push(arr[i]);
  }
  return randomArr;
};

var createOffersArray = function () {
  var offersArray = [];
  for (var i = 1; i <= AMOUNT_OFFER; i++) {
    var locationX = Math.floor(Math.random() * (LOCATION_X_MAX - LOCATION_X_MIN)) + LOCATION_X_MIN;
    var locationY = Math.floor(Math.random() * (LOCATION_Y_MAX - LOCATION_Y_MIN)) + LOCATION_Y_MIN;
    offersArray.push(
        {
          author: {
            avatar: 'img/avatars/user0' + i + '.png'
          },
          offer: {
            title: TITLE,
            adress: locationX + ', ' + locationY,
            price: PRICE,
            type: TYPES[Math.floor(Math.random() * TYPES.length)],
            rooms: Math.floor(Math.random() * (3 - 1)) + 1,
            guests: Math.floor(Math.random() * (3 - 1)) + 1,
            checkin: CHECKINS[Math.floor(Math.random() * CHECKINS.length)],
            checkout: CHECKOUTS[Math.floor(Math.random() * CHECKOUTS.length)],
            features: getRandomArray(FEATURES),
            description: DESCRIPTION,
            photos: getRandomArray(PHOTOS)
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


var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderPin = function (similarArray) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.setAttribute('style', 'left: ' + similarArray.location.x + 'px' + '; ' + 'top:' + similarArray.location.y + 'px');
  pinElement.setAttribute('src', similarArray.author.avatar);
  pinElement.setAttribute('alt', similarArray.offer.title);

  return pinElement;
};

var similarArray = createOffersArray();

var fragment = document.createDocumentFragment();
for (var i = 0; i < similarArray.length; i++) {
  fragment.appendChild(renderPin(similarArray[i]));
}

var similarListPin = map.querySelector('.map__pins');
similarListPin.appendChild(fragment);
