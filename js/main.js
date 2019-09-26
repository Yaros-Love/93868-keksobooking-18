'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var widthBlock = map.querySelector('.map__pins').offsetWidth;

var AMOUNT_OFFER = 8;
var TITLE = 'Самая классная локация';
var PRICE = 5200;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Великолепный Дворец в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.'];
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

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getTypeFlat = function (type) {
  var typeApart;

  if (type === 'flat') {
    typeApart = 'Квартира';
  }
  if (type === 'palace') {
    typeApart = 'Дворец';
  }
  if (type === 'bungalo') {
    typeApart = 'Бунгало';
  }
  if (type === 'house') {
    typeApart = 'Дом';
  }

  return typeApart;
};

var typeApartString = getTypeFlat(TYPES[getRandomInt(0, TYPES.length)]); // получаем строковое значение апартаментов

var createOffersArray = function () {
  var offersArray = [];
  for (var i = 1; i <= AMOUNT_OFFER; i++) {
    var locationX = getRandomInt(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = getRandomInt(LOCATION_Y_MIN, LOCATION_Y_MAX);
    offersArray.push(
        {
          author: {
            avatar: 'img/avatars/user0' + i + '.png'
          },
          offer: {
            title: TITLE,
            address: locationX + ', ' + locationY,
            price: PRICE,
            type: typeApartString,
            rooms: getRandomInt(1, 3),
            guests: getRandomInt(1, 3),
            checkin: CHECKINS[getRandomInt(0, CHECKINS.length)],
            checkout: CHECKOUTS[getRandomInt(0, CHECKOUTS.length)],
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

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (obj) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = obj.location.x + 'px';
  pinElement.style.top = obj.location.y + 'px';
  pinElement.querySelector('img').setAttribute('src', obj.author.avatar);
  pinElement.querySelector('img').setAttribute('alt', obj.offer.title);

  return pinElement;
};

var similarAdsArray = createOffersArray();

var fragment = document.createDocumentFragment();
for (var i = 0; i < similarAdsArray.length; i++) {
  fragment.appendChild(renderPin(similarAdsArray[i]));
}

var similarListPin = map.querySelector('.map__pins');
similarListPin.appendChild(fragment);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderCard = function (obj) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = obj.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = obj.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = obj.offer.features;
  cardElement.querySelector('.popup__description').textContent = obj.offer.description;
  cardElement.querySelector('.popup__photos').setAttribute('src', obj.offer.photos);
  cardElement.querySelector('.popup__avatar').setAttribute('src', obj.author.avatar);

  return cardElement;
};
var firstItemCardInArray = renderCard(similarAdsArray[0]);


map.insertBefore(firstItemCardInArray, similarListPin);
