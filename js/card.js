'use strict';

(function () {
  var TypeHouse = window.initialStateForm.TypeHouse;
  var removeChildren = window.util.removeChildren;
  var isEscEvent = window.util.isEscEvent;

  var removeCard = function () {
    var mapCardElement = document.querySelector('.map__card');
    if (mapCardElement) {
      mapCardElement.remove();
      document.removeEventListener('keydown', onPressEsc);
      document.removeEventListener('click', onPressCross);
    }
  };

  var onPressCross = function () {
    removeCard();
  };

  var onPressEsc = function (evt) {
    isEscEvent(evt, removeCard);
  };

  var getTypeHouseOnRus = function (type) {
    return TypeHouse[type].text;
  };

  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhotosImgElement = document.querySelector('#card').content.querySelector('.popup__photo');

  var renderCard = function (card) {
    var cardElement = cardTemplateElement.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getTypeHouseOnRus(card.offer.type.toUpperCase());
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    // удаляем дефолтную коллекцию li
    removeChildren(cardElement.querySelector('.popup__features'));
    card.offer.features.forEach(function (item) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + item;
      cardElement.querySelector('.popup__features').appendChild(featureElement);
    });
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    // удаляем шаблон изображения
    removeChildren(cardElement.querySelector('.popup__photos'));
    card.offer.photos.forEach(function (item) {
      var photo = popupPhotosImgElement.cloneNode(true);
      photo.src = item;
      cardElement.querySelector('.popup__photos').appendChild(photo);
    });
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    var popupClose = cardElement.querySelector('.popup__close');

    popupClose.addEventListener('click', onPressCross);
    document.addEventListener('keydown', onPressEsc);

    return cardElement;
  };


  window.card = {
    renderCard: renderCard,
    removeCard: removeCard
  };
})();
