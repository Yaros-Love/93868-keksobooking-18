'use strict';

var map = document.querySelector('.map');

var widthBlock = map.querySelector('.map__pins').offsetWidth;
var AMOUNT_OFFER = 8;
var PRICE = 5200;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Великолепный Дворец в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var IMG_WIDTH = 40;
var IMG_HEIGHT = 70;
var LOCATION_X_MIN = IMG_WIDTH;
var LOCATION_X_MAX = widthBlock - IMG_WIDTH;
var LOCATION_Y_MIN = 130 + IMG_HEIGHT;
var LOCATION_Y_MAX = 630 - IMG_HEIGHT;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomArray = function (arr) {
  var randomArr = [];
  var max = Math.floor(Math.random() * arr.length);
  for (var i = 0; i <= max; i++) {
    randomArr.push(arr[i]);
  }
  return randomArr;
};

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

var renderPin = function (obj) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');

  pinElement.style.left = obj.location.x + 'px';
  pinElement.style.top = obj.location.y + 'px';
  pinElementImg.setAttribute('src', obj.author.avatar);
  pinElementImg.setAttribute('alt', obj.offer.title);

  return pinElement;
};

var similarAdsArray = createOffersArray();

// функция встаквки пинов
var insertPinsInMap = function (arr) {
  var fragment = document.createDocumentFragment();
  var similarListPin = map.querySelector('.map__pins');

  if (arr.length !== 0) {
    for (var i = 0; i < similarAdsArray.length; i++) {
      fragment.appendChild(renderPin(similarAdsArray[i]));
    }
    similarListPin.appendChild(fragment);
  }

  return similarListPin;
};

// функция генерации карточки
var renderCard = function (obj) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var popupFeatures = cardElement.querySelector('.popup__features');
  //  получаем дефолтную колекцию li и удаляем
  var childrenLi = popupFeatures.children;

  for (var i = childrenLi.length - 1; i >= 0; i--) {
    var child = childrenLi[i];

    child.parentElement.removeChild(child);
  }
  // создаем новую коллекцию li вставляем во фрагмент
  var createLi = function (arr) {
    var liElement = cardTemplate.querySelector('.popup__feature');
    var fragmentLi = document.createDocumentFragment();
    for (var j = 0; j < arr.length; j++) {
      var featureElement = liElement.cloneNode(true);
      featureElement.className = 'popup__feature';
      featureElement.classList.add('popup__feature--' + arr[j]);
      fragmentLi.appendChild(featureElement);
    }
    return fragmentLi;
  };

  cardElement.querySelector('.popup__title').textContent = obj.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = obj.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  // вставляем фрагмент (новую коллекцию li)
  popupFeatures.appendChild(createLi(obj.offer.features));
  cardElement.querySelector('.popup__description').textContent = obj.offer.description;
  cardElement.querySelector('.popup__photo').setAttribute('src', obj.offer.photos);
  cardElement.querySelector('.popup__avatar').setAttribute('src', obj.author.avatar);

  return cardElement;
};

// var randomItemCardInArray = renderCard(similarAdsArray[getRandomInt(0, similarAdsArray.length - 1)]);
// map.appendChild(randomItemCardInArray);
// map.appendChild(insertPinsInMap(similarAdsArray));


var fieldsets = document.querySelectorAll('fieldset');
for (var i = 0; i < fieldsets.length; i++) {
  fieldsets[i].setAttribute('disabled', 'disabled');
}

var resetDisable = function (obj) {
  for (var i = 0; i < obj.length; i++) {
    obj[i].removeAttribute('disabled', 'disabled');
  }
};

var getAddressValue = function (obj) {
  var address = getComputedStyle(obj);
  var x = parseInt(address.left);
  var y = parseInt(address.top);
  x = x + IMG_WIDTH;
  y = y + IMG_HEIGHT;
  var value = '' + x + ', ' + y + '';

  return value;
};


var pinMain = map.querySelector('.map__pin--main');
var inputAddress = document.querySelector('#address');
inputAddress.value = getAddressValue(pinMain);

pinMain.addEventListener('mousedown', function () {
  resetDisable(fieldsets);
  map.classList.remove('map--faded');
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    resetDisable(fieldsets);
    map.classList.remove('map--faded');
  }
});

var form = document.querySelector('.ad-form');
var roomNumberSelect = document.querySelector('#room_number');
var roomValue = roomNumberSelect.value;
var capacitySelect = document.querySelector('#capacity');
capacitySelect.selectedIndex = 2;

// var checkValidationRooms = function (target) {
//   var constrainsValidation = {
//     '1' : {
//       'guests' : ['1'],
//       'errorText' : '1 комната для 1 гостя'
//     },
//     '2': {
//       'guests' : ['1', '2'],
//       'errorText' : '2 комнаты для 1 или для 2 гостей'
//     },
//     '3' : {
//       'guests ': ['1', '2', '3'],
//       'errorText' : '3 комнаты для 1, 2 или 3 гостей'
//     },
//     '100': {
//       'guests' : ['0'],
//       'errorText' : '100 не для гостей'
//     }
//   };
//   var guests = capacityValue.value;
//   roomNumberSelect.setCustomValidity(constrainsValidation[target].guests.includes(guests) ? '' : constrainsValidation[target].errorText);
//
//  };

var makeDisabledOptionsCapacity = function (target) {
  var optionArr = capacitySelect.children;

  for (var j = 0; j < optionArr.length; j++) {
    optionArr[j].removeAttribute('disabled', 'disabled');
  }

  for (var i = 0; i < optionArr.length; i++) {
    if (optionArr[i].value > target ||  optionArr[i].value == 0) {
      optionArr[i].setAttribute('disabled', 'disabled');
    }
    if (target == 100 && optionArr[i].value == 0) {
      for (var p = 0; p < optionArr.length; p++) {
        optionArr[p].disabled = true;
      }
      optionArr[i].disabled = false;
    }
  }
};

var makeDisabledOptionsRooms = function (target) {
  var optionArr = roomNumberSelect.children;

  for (var j = 0; j < optionArr.length; j++) {
    optionArr[j].removeAttribute('disabled', 'disabled');
  }

  for (var i = 0; i < optionArr.length; i++) {
    if (optionArr[i].value < target ||  optionArr[i].value == 100) {
      optionArr[i].setAttribute('disabled', 'disabled');
    }
    if (target == 0 && optionArr[i].value == 100) {
      for (var p = 0; p < optionArr.length; p++) {
        optionArr[p].disabled = true;
      }
      optionArr[i].disabled = false;
    }
  }
};

 roomNumberSelect.addEventListener('input', function (evt) {
   var target = evt.currentTarget.value;
   makeDisabledOptionsCapacity(target);
 });

 capacitySelect.addEventListener('input', function (evt) {
   var target = evt.currentTarget.value
   makeDisabledOptionsRooms(target);
 });
