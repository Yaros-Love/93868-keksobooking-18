'use strict';
//модуль с данными

(function () {
  //ф-я рандомного значения из массива
  var randomItem = function (array) {
    return array[Math.round(Math.random() * (array.length - 1 - 0) + 0)];
  }
  //ф-я рандома в диапазоне
  var randomItemMinMax = function (min, max) {
    //  случайное число от min до (max+1)
    var randItem = min + Math.random() * (max + 1 - min);
    return Math.floor(randItem);
  }

  //данные для моков
  var ADRESS = '600, 350';
  var PRICE = [3000, 2970, 1098, 1000];
  var TITLE = 'Какое-то интересное предложение'
  var TYPE_LIVING = ['palace', 'flat', 'house', 'bungalo'];
  var TYPE_LIVING_RUS = {
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
  //диапазон фотографий в массивах рандомной длинны
  var MIN_PHOTOS = 1;
  var MAX_PHOTOS = 10;
  //элементы DOM
  var mapPinsElement = document.querySelector('.map__pins');//элемент с метками объявлений
  var mapOverlayElem = document.querySelector('.map__overlay');
  var mapPinMainElem = document.querySelector('.map__pin--main');//главноая метка на карте
  var mapElement = document.querySelector('.map');//Карта объявлений
  var addFormElement = document.querySelector('.ad-form');//Форма объявления
  var addFormFieldsets = addFormElement.querySelectorAll('fieldset');//Fieldsets в форме, кот нужно сделать активными
  var mapFiltersElem = document.querySelector('.map__filters');//форма с фильтрами для объявлений
  var pinTemplate = document.querySelector('#pin'); //шаблон пина на карте
  var cardTemplate = document.querySelector('#card'); //шаблон карточки объявления
  var mapFiltersContainer = document.querySelector('.map__filters-container'); //элемент перед которым нужно вставлять карточку объявления на карте

  // вспомогательные
  var ENTER_KEYCODE = 13;
  var ESCAPE_KEYCODE = 27;
  var MOKS_COUNT = 8; //количество пинов на карте

  //высота пина (.map__pin) в разметке
  var MAP_PIN_HEIGTH = 70;
  //ширина пина (.map__pin) в разметке
  var MAP_PIN_WIDTH = 50;

  //допустимый диапазон по Х для пинов на элемете .map__overlay
  var MAP_OVERLAY_WIDTH = {
    min: 0,
    max: mapOverlayElem.offsetWidth
  }

  //допустимый диапазон по Y для пинов на элемете .map__overlay
  var MAP_OVERLAY_HEIGTH = {
    min: 130,
    max: 630
  }

  //ф-я создания массива с рандомным числом фотографий
  var randomLengthPhotos = function (PHOTOS) {
    var photosForObjects = [];
    for (var k = 0; k < randomItemMinMax(MIN_PHOTOS, MAX_PHOTOS); k++) {
      photosForObjects.push(randomItem(PHOTOS));
    }
    return photosForObjects
  };

  //ф-я создания моков, объекты поинтов на карте
  var createMoks = function () {
    var moksCollection = [];
    for (var i = 0; i < MOKS_COUNT; i++) {
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
        type: randomItem(TYPE_LIVING),
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
        x: randomItemMinMax(MAP_OVERLAY_WIDTH.min, MAP_OVERLAY_WIDTH.max),
        y: randomItemMinMax(MAP_OVERLAY_HEIGTH.min, MAP_OVERLAY_HEIGTH.max)
      }
      //добавляем объекты в массив
      moksCollection.push(objectItem)
    }
    return moksCollection;
  }
  var moks = createMoks();

  // объект с данными, экспорт
  window.data = {
    //функции
    randomItem: randomItem,
    randomItemMinMax: randomItemMinMax,
    // данные для моков
    ADRESS: ADRESS,
    PRICE: PRICE,
    TITLE: TITLE,
    TYPE_LIVING: TYPE_LIVING,
    TYPE_LIVING_RUS: TYPE_LIVING_RUS,
    ROOMS: ROOMS,
    GUESTS: GUESTS,
    CHECKINS: CHECKINS,
    CHECKOUTS: CHECKOUTS,
    FEATURES: FEATURES,
    DESCRIPTIO: DESCRIPTIO,
    PHOTOS: PHOTOS,
    MIN_PHOTOS: MIN_PHOTOS,
    MAX_PHOTOS: MAX_PHOTOS,
    moks: moks,
    // элементы ДОМ
    mapPinsElement: mapPinsElement,
    mapOverlayElem: mapOverlayElem,
    mapPinMainElem: mapPinMainElem,
    mapElement: mapElement,
    addFormElement: addFormElement,
    addFormFieldsets: addFormFieldsets,
    mapFiltersElem: mapFiltersElem,
    pinTemplate: pinTemplate,
    cardTemplate: cardTemplate,
    mapFiltersContainer : mapFiltersContainer,
    // вспомогательные
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESCAPE_KEYCODE: ESCAPE_KEYCODE,
    MOKS_COUNT: MOKS_COUNT,
    MAP_PIN_HEIGTH: MAP_PIN_HEIGTH,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH
  }
})()
