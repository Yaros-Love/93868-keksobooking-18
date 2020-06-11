'use strict';
// модуль, который отвечает за создание пина и карточки с объевлением

(function(){
//ф-я создания пинов на карте
var createPins = function (tamplate, arrayObj, parent) {
  for (var j = 0; j < arrayObj.length; j++) {
    var pin = tamplate.cloneNode(true);
    var mapPinItem = pin.querySelector('.map__pin');
    mapPinItem.style.left = arrayObj[j].location.x - window.data.MAP_PIN_WIDTH * 0.5 + 'px';
    mapPinItem.style.top = arrayObj[j].location.y - window.data.MAP_PIN_HEIGTH + 'px';
    mapPinItem.alt = arrayObj[j].offer.title;
    mapPinItem.value = j;
    pin.querySelector('img').src = arrayObj[j].autor.avatar;
    parent.appendChild(pin);
  }
}

//находим контент карточки
var cardTempContent = window.data.cardTemplate.content;

//ф-я создания карточки объявления на карте
var createCard = function (arrayObjects, currentValue) {
  var card = cardTempContent.cloneNode(true);
  //заголовок
  card.querySelector('.popup__title').textContent = arrayObjects[currentValue].offer.title;
  //цена жилья
  card.querySelector('.popup__text--price').textContent = arrayObjects[currentValue].offer.price + ' р/ночь';
  //типы жилья
  card.querySelector('.popup__type').textContent = window.data.TYPE_LIVING_RUS[arrayObjects[currentValue].offer.type];
  //комнаты и гости
  card.querySelector('.popup__text--capacity').textContent = arrayObjects[currentValue].offer.rooms + ' комнаты для ' + arrayObjects[currentValue].offer.guests + ' гостей';
  //заезд, выезд
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayObjects[currentValue].offer.checkin + ', выезд до ' + arrayObjects[currentValue].offer.checkout;
  //удобства
  card.querySelector('.popup__features').textContent = arrayObjects[currentValue].offer.features;
  //описание
  card.querySelector('.popup__description').textContent = arrayObjects[currentValue].offer.description;
  //добавляем галерею с рандомным количеством фотографий в диапазоне
  var addNewPhotos = function () {
    card.querySelector('.popup__photo').src = arrayObjects[currentValue].offer.photos[window.data.randomItemMinMax(0, arrayObjects[currentValue].offer.photos.length - 1)];
    var popupPhotosElem = card.querySelector('.popup__photos');
    for (var i = 0; i < arrayObjects[currentValue].offer.photos.length; i++) {
      var newPhotoElement = card.querySelector('.popup__photo').cloneNode(true);
      newPhotoElement.src = arrayObjects[currentValue].offer.photos[i];
      popupPhotosElem.appendChild(newPhotoElement);
    }
  }
  addNewPhotos();
  //аватарка
  card.querySelector('.popup__avatar').src = arrayObjects[currentValue].autor.avatar;
  //добавляем в разметку перед след элементом:
  window.data.mapFiltersContainer.before(card);
}

// объект с данными, экспорт
window.pin = {
  createPins : createPins,
  createCard : createCard
}
})()
