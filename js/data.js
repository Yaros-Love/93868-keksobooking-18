'use strict';
//модуль с данными

(function () {
  var MAP_OVERLAY_WIDTH = window.const.MAP_OVERLAY_WIDTH;
  var MAP_OVERLAY_HEIGTH = window.const.MAP_OVERLAY_HEIGTH;
  var randomItem = window.util.randomItem;
  var MAP_PIN_WIDTH = window.const.MAP_PIN_WIDTH;
  var MAP_PIN_HEIGTH = window.const.MAP_PIN_HEIGTH;
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

  //ф-я создания массива с рандомным числом фотографий
  var randomLengthPhotos = function (PHOTOS) {
    var photosForObjects = [];
    for (var k = 0; k < window.util.randomItemMinMax(MIN_PHOTOS, MAX_PHOTOS); k++) {
      photosForObjects.push(randomItem(PHOTOS));
    }
    return photosForObjects
  };

  //ф-я создания моков, объекты поинтов на карте
  var createMoks = function () {
    var moksCollection = [];
    for (var i = 0; i < window.const.MOKS_COUNT; i++) {
      var objectItem = {};
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
        x: window.util.randomItemMinMax(MAP_OVERLAY_WIDTH.min - MAP_PIN_WIDTH * 0.5, MAP_OVERLAY_WIDTH.max - MAP_PIN_WIDTH * 0.5),
        y: window.util.randomItemMinMax(MAP_OVERLAY_HEIGTH.min - MAP_PIN_HEIGTH, MAP_OVERLAY_HEIGTH.max - MAP_PIN_HEIGTH)
      }
      //добавляем объекты в массив
      moksCollection.push(objectItem)
    }
    return moksCollection;
  }
  var moks = createMoks();

  // объект с данными, экспорт //!!
  window.data = {
    FEATURES : FEATURES,
    TYPE_LIVING: TYPE_LIVING,
    TYPE_LIVING_RUS: TYPE_LIVING_RUS,
    moks: moks,
  }
})()
