//'use strict';
//данные для моков
const ADRESS_CONST = '600, 350';
const PRICE_ARR = [3000, 2970, 1098, 1000];
const TITLE_CONST = 'Какое-то интересное предложение'
const TYPE_ARR = ['palace', 'flat', 'house', 'bungalo'];
const ROOMS_ARR = [1, 2, 3, 4, 5, 6];
const GUESTS_ARR = [1, 2, 3, 4, 5, 6, 7, 8];
const CHECKIN_ARR = ['12:00', '13:00', '14:00'];
const CHECKOUT_ARR = ['12:00', '13:00', '14:00'];
const FEATURES_ARR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIO_CONST = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis viverra nibh. Placerat in egestas erat imperdiet. Non odio euismod lacinia at quis risus sed. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat.';
const PHOTOS_ARR = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const HEIGTH_BLOCK_Y = {
  min: 130,
  max: 630
}
//находим блок с меткой
const PIN_AREA = document.querySelector('.map__pins');

//высота метки в разметке
const MAP_PIN_HEIGTH = 70;
//ширина метки в разметке
const MAP_PIN_WIDTH = 50;

//убираем класс у .map
var mapActiv = document.querySelector('.map').classList.remove('map--faded');

//ф-я рандомного значения из массива
var randomItem = function (arrayItems) {
  return arrayItems[Math.round(Math.random() * (arrayItems.length - 1 - 0) + 0)];
}

//ф-я рандома в диапазоне
var randomItemMinMax = function (min, max) {
  //  случайное число от min до (max+1)
  let randItem = min + Math.random() * (max + 1 - min);
  return Math.floor(randItem);
}

//ф-я создания моков, обЪекты поинтов на карте
var creationMoks = function () {
  var moksCollection = [];
  for (var i = 0; i < 8; i++) {
    var objectItem = {};
    //об авторе
    objectItem.autor = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    }
    //предложение
    objectItem.offer = {
      title: TITLE_CONST,
      address: ADRESS_CONST,
      price: randomItem(PRICE_ARR),
      type: randomItem(TYPE_ARR),
      rooms: randomItem(ROOMS_ARR),
      guests: randomItem(GUESTS_ARR),
      checkin: randomItem(CHECKIN_ARR),
      checkout: randomItem(CHECKOUT_ARR),
      features: randomItem(FEATURES_ARR),
      description: DESCRIPTIO_CONST,
      photos: randomItem(PHOTOS_ARR)
    }
    //местоположение
    //находим ширину документа и блока с меткой
    let minX = 0;
    let maxX = document.querySelector('.map__overlay').offsetWidth;
    objectItem.location = {
      x: randomItemMinMax(minX, maxX),
      y: randomItemMinMax(HEIGTH_BLOCK_Y.min, HEIGTH_BLOCK_Y.max)
    }
console.log(objectItem.location.y)
    //добавляем объекты в массив
    moksCollection.push(objectItem)
  }

  return moksCollection;
}
creationMoks();
console.log(creationMoks())
//контент шаблона
var pinTamplate = document.querySelector('#pin').content;

//ф-я создания елемента в разметки
var creatElementsPins = function (tamplate, arrayObj, elementForPush) {
  for (var j = 0; j < arrayObj.length; j++) {
    let pointInTheMap = tamplate.cloneNode(true);
    let mapButtonPin = pointInTheMap.querySelector('.map__pin');
    mapButtonPin.style.left = arrayObj[j].location.x - MAP_PIN_WIDTH * 0.5 + 'px';
    mapButtonPin.style.top = arrayObj[j].location.y - MAP_PIN_HEIGTH + 'px';
    mapButtonPin.alt = arrayObj[j].offer.title;
    pointInTheMap.querySelector('img').src = arrayObj[j].autor.avatar;
    elementForPush.appendChild(pointInTheMap);
  }
}
creatElementsPins(pinTamplate, creationMoks(), PIN_AREA)


//отрисовка карточек объявлений
//находим шаблом карточки, и ее контент
var cardTamlateContent = document.querySelector('#card').content;
//находим элемент перед которым нужно вставлять новые элементы
var insertCardsBeforMe = document.querySelector('.map__filters-container');

//ф-я создания и отрисовки нового элемента
var creatCard = function (template, arrayObjects, elementForPush) {
  let cardItem = template.cloneNode(true);
  //заголовок
  cardItem.querySelector('.popup__title').textContent = arrayObjects[0].offer.title;
  //цена жилья
  cardItem.querySelector('.popup__text--price').textContent = arrayObjects[0].offer.price + ' р/ночь';
//типы жилья
  if (arrayObjects[0].offer.type === 'flat') {
    cardItem.querySelector('.popup__type').textContent = 'Квартира';
  }
  if (arrayObjects[0].offer.type === 'bungalo') {
    cardItem.querySelector('.popup__type').textContent = 'Бунгало';
  }
  if (arrayObjects[0].offer.type === 'house') {
    cardItem.querySelector('.popup__type').textContent = 'Дом';
  }
  if (arrayObjects[0].offer.type === 'palace') {
    cardItem.querySelector('.popup__type').textContent = 'Дворец';
  }
  //комнаты и гости
  cardItem.querySelector('.popup__text--capacity').textContent = arrayObjects[0].offer.rooms + ' комнаты для ' + arrayObjects[0].offer.guests + ' гостей';
  //заезд, выезд
  cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayObjects[0].offer.checkin + ', выезд до ' + arrayObjects[0].offer.checkout;
  //удобства
  cardItem.querySelector('.popup__features').textContent = arrayObjects[0].offer.features;
  //описание
  cardItem.querySelector('.popup__description').textContent = arrayObjects[0].offer.description;
  //фото
  cardItem.querySelector('.popup__photo').src = 'http://o0.github.io/assets/images/tokyo/hotel1.jpg';
  //аватарка
  cardItem.querySelector('.popup__avatar').src = arrayObjects[0].autor.avatar;
  //добавляем в разметку перед след элементом:
  elementForPush.before(cardItem)
}

creatCard(cardTamlateContent, creationMoks(), insertCardsBeforMe)
