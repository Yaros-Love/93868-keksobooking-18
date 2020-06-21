'use strict';
// модуль, который отвечает за создание пина и карточки с объевлением

(function () {
  var cardTemplate = document.querySelector('#card'); //шаблон карточки объявления
  var mapFiltersContainer = document.querySelector('.map__filters-container'); //элемент перед которым нужно вставлять карточку объявления на карте
  var MAP_PIN_WIDTH = window.const.MAP_PIN_WIDTH; //ширина пина (.map__pin) в разметке
  var MAP_PIN_HEIGTH = window.const.MAP_PIN_HEIGTH; //высота пина (.map__pin) в разметке
  //массив с FEATURES
  var FEATURES = window.data.FEATURES;

  //объект с классами для li.popup__feature popup__feature--...
  // var featuresClasses = {
  //   'wifi' : 'popup__feature--wifi',
  //   'dishwasher' : 'popup__feature--dishwasher',
  //   'parking' :
  // }

  //ф-я создания пинов на карте
  var createPins = function (tamplate, arrayObj, parent) {
    for (var j = 0; j < arrayObj.length; j++) {
      var pin = tamplate.cloneNode(true);
      var mapPinItem = pin.querySelector('.map__pin');
      mapPinItem.style.left = arrayObj[j].location.x + 'px';
      mapPinItem.style.top = arrayObj[j].location.y + 'px';
      mapPinItem.alt = arrayObj[j].offer.title;
      mapPinItem.value = j;
      pin.querySelector('img').src = arrayObj[j].autor.avatar;
      parent.appendChild(pin);
    }
  }

  //находим контент карточки
  var cardTempContent = cardTemplate.content;

  //ф-я создания карточки объявления на карте
  var createCard = function (mok) {
    var card = cardTempContent.cloneNode(true);
    //заголовок
    card.querySelector('.popup__title').textContent = mok.offer.title;
    //цена жилья
    card.querySelector('.popup__text--price').textContent = mok.offer.price + ' р/ночь';
    //типы жилья
    card.querySelector('.popup__type').textContent = window.data.TYPE_LIVING_RUS[mok.offer.type];
    //комнаты и гости
    card.querySelector('.popup__text--capacity').textContent = mok.offer.rooms + ' комнаты для ' + mok.offer.guests + ' гостей';
    //заезд, выезд
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + mok.offer.checkin + ', выезд до ' + mok.offer.checkout;
    //удобства, проверяем наличие нажного li, остальные скрываем
    var popupFeaturesLi = card.querySelector('.popup__features').querySelectorAll('li');
    for (var i = 0; i < popupFeaturesLi.length; i++) {
      if (popupFeaturesLi[i].className !== 'popup__feature popup__feature--' + mok.offer.features) {
        popupFeaturesLi[i].classList.add('visually-hidden');
      };
    };
    //описание
    card.querySelector('.popup__description').textContent = mok.offer.description;
    //добавляем галерею с рандомным количеством фотографий в диапазоне
    //тк один элемент img уже существует в разметке, то сначала добавляем фото ему, затем создаем остальные через цикл, начинаю с .[1]
    card.querySelector('.popup__photo').src = mok.offer.photos[0]
    var popupPhotosElem = card.querySelector('.popup__photos');
    for (var i = 1; i < mok.offer.photos.length; i++) {
      var newPhotoElement = card.querySelector('.popup__photo').cloneNode(true);
      newPhotoElement.src = mok.offer.photos[i];
      popupPhotosElem.appendChild(newPhotoElement);
    }

    //аватарка
    card.querySelector('.popup__avatar').src = mok.autor.avatar;
    //добавляем в разметку перед след элементом:
    mapFiltersContainer.before(card);
  }

  // объект с данными, экспорт
  window.pin = {
    createPins: createPins,
    createCard: createCard
  }
})()
