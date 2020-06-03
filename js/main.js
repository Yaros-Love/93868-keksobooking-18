'use strict';
//данные для моков***************************************************

var ADRESS = '600, 350';
var PRICE = [3000, 2970, 1098, 1000];
var TITLE = 'Какое-то интересное предложение'
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var TYPE_RUS = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var ROOMS = [1, 2, 3, 4, 5, 6];
var GUESTS = [1, 2, 3, 4, 5, 6, 7, 8];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIO = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis viverra nibh. Placerat in egestas erat imperdiet. Non odio euismod lacinia at quis risus sed. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat.';
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var HEIGTH_BLOCK_Y = {
  min: 130,
  max: 630
}
//диапазон фотографий в массивах рандомной длинны
var MIN_PHOTOS = 1;
var MAX_PHOTOS = 10;

//находим ширину документа и блока с меткой ......вынести макс и мин в константы
var MIN_X = 0;
var MAX_X = document.querySelector('.map__overlay').offsetWidth;

//количество меток на карте
var moksCount = 8;
/********************************************************************/

//находим блок с меткой
var MAP_PINS_ELEMENT = document.querySelector('.map__pins');

//высота метки в разметке
var MAP_PIN_HEIGTH = 70;
//ширина метки в разметке
var MAP_PIN_WIDTH = 50;

//убираем класс у .map
// var mapActiv = document.querySelector('.map').classList.remove('map--faded');

//ф-я рандомного значения из массива
var randomItem = function (arrayItems) {
  return arrayItems[Math.round(Math.random() * (arrayItems.length - 1 - 0) + 0)];
}

//ф-я рандома в диапазоне
var randomItemMinMax = function (min, max) {
  //  случайное число от min до (max+1)
  var randItem = min + Math.random() * (max + 1 - min);
  return Math.floor(randItem);
}

//ф-я создания массива с рандомным числом фотографий
var randomLengthPhotos = function (PHOTOS) {
  var photosForObjects = [];
  for (var k = 0; k < randomItemMinMax(MIN_PHOTOS, MAX_PHOTOS); k++) {
    photosForObjects.push(randomItem(PHOTOS));
  }
  return photosForObjects
}

//ф-я создания моков, объекты поинтов на карте
var createMoks = function () {
  var moksCollection = [];
  for (var i = 0; i < moksCount; i++) {
    var objectItem = {};
    //заполняем массив рандомной длинны фотографиями
    randomLengthPhotos(PHOTOS)
    //об авторе
    objectItem.autor = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    }
    //предложение
    objectItem.offer = {
      title: TITLE,
      address: ADRESS,
      price: randomItem(PRICE),
      type: randomItem(TYPE),
      rooms: randomItem(ROOMS),
      guests: randomItem(GUESTS),
      checkin: randomItem(CHECKINS),
      checkout: randomItem(CHECKOUTS),
      features: randomItem(FEATURES),
      description: DESCRIPTIO,
      photos: randomLengthPhotos(PHOTOS)
    }
    //местоположение
    objectItem.location = {
      x: randomItemMinMax(MIN_X, MAX_X),
      y: randomItemMinMax(HEIGTH_BLOCK_Y.min, HEIGTH_BLOCK_Y.max)
    }
    //добавляем объекты в массив
    moksCollection.push(objectItem)
  }

  return moksCollection;
}
var moks = createMoks();
console.log(moks);

//контент шаблона
var pinTamplate = document.querySelector('#pin').content;

//ф-я создания елемента в разметки
var createElementsPins = function (tamplate, arrayObj, elementForPush) {
  for (var j = 0; j < arrayObj.length; j++) {
    var pointInTheMap = tamplate.cloneNode(true);
    var mapButtonPin = pointInTheMap.querySelector('.map__pin');
    mapButtonPin.style.left = arrayObj[j].location.x - MAP_PIN_WIDTH * 0.5 + 'px';
    mapButtonPin.style.top = arrayObj[j].location.y - MAP_PIN_HEIGTH + 'px';
    mapButtonPin.alt = arrayObj[j].offer.title;
    pointInTheMap.querySelector('img').src = arrayObj[j].autor.avatar;
    elementForPush.appendChild(pointInTheMap);
  }
}
createElementsPins(pinTamplate, moks, MAP_PINS_ELEMENT);

//отрисовка карточек объявлений
//находим шаблом карточки, и ее контент
var cardTamlateContent = document.querySelector('#card').content;
//находим элемент перед которым нужно вставлять новые элементы
var mapFiltersContainer = document.querySelector('.map__filters-container');

//ф-я создания и отрисовки нового элемента
var createCard = function (template, arrayObjects, elementForPush) {
  var cardItem = template.cloneNode(true);
  //заголовок
  cardItem.querySelector('.popup__title').textContent = arrayObjects[0].offer.title;
  //цена жилья
  cardItem.querySelector('.popup__text--price').textContent = arrayObjects[0].offer.price + ' р/ночь';
  //типы жилья
  cardItem.querySelector('.popup__type').textContent = TYPE_RUS[arrayObjects[0].offer.type];
  //комнаты и гости
  cardItem.querySelector('.popup__text--capacity').textContent = arrayObjects[0].offer.rooms + ' комнаты для ' + arrayObjects[0].offer.guests + ' гостей';
  //заезд, выезд
  cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayObjects[0].offer.checkin + ', выезд до ' + arrayObjects[0].offer.checkout;
  //удобства
  cardItem.querySelector('.popup__features').textContent = arrayObjects[0].offer.features;
  //описание
  cardItem.querySelector('.popup__description').textContent = arrayObjects[0].offer.description;
  //фото
  var addNewPhotos = function () {
    cardItem.querySelector('.popup__photo').src = arrayObjects[0].offer.photos[randomItemMinMax(0, arrayObjects[0].offer.photos.length - 1)];
    var popupPhotosElem = cardItem.querySelector('.popup__photos');
    for (var i = 0; i < arrayObjects[0].offer.photos.length; i++) {
      var newPhotoElement = cardItem.querySelector('.popup__photo').cloneNode(true);
      newPhotoElement.src = arrayObjects[0].offer.photos[i];
      popupPhotosElem.appendChild(newPhotoElement);
    }
  }
  addNewPhotos();
  //аватарка
  cardItem.querySelector('.popup__avatar').src = arrayObjects[0].autor.avatar;
  //добавляем в разметку перед след элементом:
  elementForPush.before(cardItem)
}

createCard(cardTamlateContent, moks, mapFiltersContainer)



// обытия и валидация
/**************************************************************************/
var ENTER_KEYCODE = 13;
// находим элементы для активации
var MAP_PIN_MAIN_ELEM = document.querySelector('.map__pin--main');
var MAP_ELEM = document.querySelector('.map');
var ADD_FORM_ELEM = document.querySelector('.ad-form');
var MAP_FILTERS_ELEM = document.querySelector('.map__filters');
var FIELDSET_ELEMENTS = ADD_FORM_ELEM.querySelectorAll('fieldset');

///ф-я, в активное состояние страницы
var showMapByPress = function () {
  MAP_ELEM.classList.remove('map--faded');
  ADD_FORM_ELEM.classList.remove('ad-form--disabled');
  MAP_FILTERS_ELEM.classList.remove('ad-form--disabled');
  for (var fieldsets of FIELDSET_ELEMENTS) {
    fieldsets.removeAttribute("disabled");
  }
  // удаляем обработчик события
  MAP_PIN_MAIN_ELEM.removeEventListener('mousedown', showMapByPress)
}
//слушатель по нажатию мыши на метку
MAP_PIN_MAIN_ELEM.addEventListener('mousedown', showMapByPress)

// слушатель по нажатию enter
MAP_PIN_MAIN_ELEM.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    showMapByPress()
  }
})

// устанавливаем значение поля адреса, центр метки до активации
// устанавливаем значение поля адреса для активного состояния, конец указателя метки
var ADDRESS_INPUT = document.querySelector('#address');

///находим размеры метки
var MAP_PIN_MAIN_WIDTH = MAP_PIN_MAIN_ELEM.offsetWidth;
var MAP_PIN_MAIN_HEIGTH = MAP_PIN_MAIN_ELEM.offsetHeight;
var MAP_LEYER = document.querySelector('.map__overlay');
var INDENT_PIN_MAIN = 15; //отступ по Y для конца метки

/// переменные координат x и y для адреса
var positionXAddress;
var positionYAddress;

///координаты в неактивном состоянии
var valueOfAddressInput = function () {
  if (MAP_ELEM.classList.contains('map--faded') === true) {
    positionXAddress = Math.floor(MAP_PIN_MAIN_ELEM.offsetLeft + MAP_PIN_MAIN_WIDTH * 0.5);
    positionYAddress = Math.floor(MAP_PIN_MAIN_ELEM.offsetTop + MAP_PIN_MAIN_HEIGTH * 0.5);
    ADDRESS_INPUT.value = positionXAddress + ', ' + positionYAddress;
  }
}
valueOfAddressInput();

/// координаты в активном при нажатии мышью на маркер
MAP_PIN_MAIN_ELEM.addEventListener('mousedown', function () {
  positionXAddress = Math.floor(MAP_PIN_MAIN_ELEM.offsetLeft + MAP_PIN_MAIN_WIDTH * 0.5);
  positionYAddress = Math.floor(MAP_PIN_MAIN_ELEM.offsetTop + MAP_PIN_MAIN_HEIGTH + INDENT_PIN_MAIN);
  ADDRESS_INPUT.value = positionXAddress + ', ' + positionYAddress;
})

// валидация полей с комнатами и количеством гостей
var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');

var checkValidRooms = function () {
  if (roomNumberSelect.value === '100' && capacitySelect.value !== '0') {
    roomNumberSelect.setCustomValidity('Количетво комнат явно не для гостей')
    return (roomNumberSelect.reportValidity())
  }

  if (capacitySelect.value === '0' && roomNumberSelect.value !== '100') {
    capacitySelect.setCustomValidity('Выберите количество гостей')
    return(capacitySelect.reportValidity())
  }

  if (roomNumberSelect.value < capacitySelect.value) {
    roomNumberSelect.setCustomValidity('Количество комнат не должно быть меньше количества госте!')
    return (roomNumberSelect.reportValidity())
  }

  else {
    roomNumberSelect.setCustomValidity("")
    return
  }
}

// слушатели на изм значений в полях "гостей" и "комнат"
roomNumberSelect.addEventListener('change', checkValidRooms);
capacitySelect.addEventListener('change', checkValidRooms);