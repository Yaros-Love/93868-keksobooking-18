'use strict';
// модуль, который отвечает за создание пина и карточки с объевлением

(function () {
  var cardTemplate = document.querySelector('#card'); //шаблон карточки объявления
  var mapPinsElement = document.querySelector('.map__pins');//элемент с метками объявлений
  var mapFiltersContainer = document.querySelector('.map__filters-container'); //элемент перед которым нужно вставлять карточку объявления на карте
  var pinTemplate = document.querySelector('#pin'); //шаблон пина на карте
  var MAP_PIN_WIDTH = window.const.MAP_PIN_WIDTH; //ширина пина (.map__pin) в разметке
  var MAP_PIN_HEIGTH = window.const.MAP_PIN_HEIGTH; //высота пина (.map__pin) в разметке
  //массив с FEATURES
  var FEATURES = window.const.FEATURES;
  //объект с видом жилья
  var TYPE_LIVING_RUS = window.const.TYPE_LIVING_RUS;

  //ф-я создания пинов на карте
  var createPins = function (arrayObj) {
    //контент шаблона для пина на карте
    var pinTempContent = pinTemplate.content;
    for (var j = 0; j < arrayObj.length; j++) {
      var pin = pinTempContent.cloneNode(true);
      var mapPinItem = pin.querySelector('.map__pin');
      mapPinItem.style.left = arrayObj[j].location.x + 'px';
      mapPinItem.style.top = arrayObj[j].location.y + 'px';
      mapPinItem.alt = arrayObj[j].offer.title;
      mapPinItem.value = j;
      pin.querySelector('img').src = arrayObj[j].author.avatar;
      mapPinsElement.appendChild(pin);
    }
  }

  //находим контент карточки
  var cardTempContent = cardTemplate.content;

  //ф-я создания карточки объявления на карте
  var createCard = function (data) {
    var card = cardTempContent.cloneNode(true);
    //заголовок
    card.querySelector('.popup__title').textContent = data.offer.title;
    //цена жилья
    card.querySelector('.popup__text--price').textContent = data.offer.price + ' р/ночь';
    //типы жилья
    card.querySelector('.popup__type').textContent = TYPE_LIVING_RUS[data.offer.type];
    //комнаты и гости
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    //заезд, выезд
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    //удобства, удаляем li, создаем новые в нужном количестве
    var popupFeaturesLi = card.querySelector('.popup__features');
    while (popupFeaturesLi.firstChild) {
      popupFeaturesLi.removeChild(popupFeaturesLi.firstChild);
    };
    for (var i = 0; i < data.offer.features.length; i++) {
      var createLi = document.createElement('li');
      createLi.classList.add('popup__feature', 'popup__feature--' + data.offer.features[i]);
      popupFeaturesLi.appendChild(createLi)
    };

    //описание
    card.querySelector('.popup__description').textContent = data.offer.description;

    //добавляем галерею фотографий
    var popupPhotosElem = card.querySelector('.popup__photos');
    popupPhotosElem.querySelector('.popup__photo').remove();
    for (var i = 0; i < data.offer.photos.length; i++) {
      var createImg = document.createElement('img');
      createImg.classList.add('popup__photo');
      createImg.src = data.offer.photos[i];
      createImg.alt = 'Фотография жилья';
      createImg.style.width = 45 + 'px';
      createImg.style.height = 45 + 'px';
      popupPhotosElem.appendChild(createImg);
    }

    //аватарка
    card.querySelector('.popup__avatar').src = data.author.avatar;
    //добавляем в разметку перед след элементом:
    mapFiltersContainer.before(card);
  }

  // объект с данными, экспорт
  window.pin = {
    createPins: createPins,
    createCard: createCard
  }
})()
