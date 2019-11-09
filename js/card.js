'use strict';

(function () {
  var ESC_KEY_CODE = window.util.ESC_KEY_CODE;
  var typeHouse = window.initialStateForm.typeHouse;
  var removeChildren = window.util.removeChildren;

  var renderCard = function (apartCard) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var popupPhotosImg = cardElement.querySelector('.popup__photo');
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupPhotos = cardElement.querySelector('.popup__photos');

    //  получаем дефолтную колекцию li и удаляем
    removeChildren(popupFeatures);
    // создаем новую коллекцию li вставляем во фрагмент
    var createLi = function (featureArr) {
      var liElement = cardTemplate.querySelector('.popup__feature');
      var fragmentLi = document.createDocumentFragment();
      for (var j = 0; j < featureArr.length; j++) {
        var featureElement = liElement.cloneNode(true);
        featureElement.classList.add('popup__feature--' + featureArr[j]);
        fragmentLi.appendChild(featureElement);
      }
      return fragmentLi;
    };

    var createImages = function (images) {
      var fragment = document.createDocumentFragment();

      for (var j = 0; j < images.length; j++) {
        var node = popupPhotosImg.cloneNode(true);
        node.src = images[j];
        fragment.appendChild(node);
      }
      return fragment;
    };

    var getTypeHouseOnRus = function (type) {
      return typeHouse[type].text;
    };

    cardElement.querySelector('.popup__title').textContent = apartCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = apartCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = apartCard.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getTypeHouseOnRus(apartCard.offer.type.toUpperCase());
    cardElement.querySelector('.popup__text--capacity').textContent = apartCard.offer.rooms + ' комнаты для ' + apartCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + apartCard.offer.checkin + ', выезд до ' + apartCard.offer.checkout;
    // вставляем фрагмент (новую коллекцию li)
    popupFeatures.appendChild(createLi(apartCard.offer.features));
    cardElement.querySelector('.popup__description').textContent = apartCard.offer.description;
    // удаляем шаблон изображения
    popupPhotos.removeChild(popupPhotos.children[0]);
    popupPhotos.appendChild(createImages(apartCard.offer.photos));
    cardElement.querySelector('.popup__avatar').setAttribute('src', apartCard.author.avatar);

    var popupClose = cardElement.querySelector('.popup__close');

    var removeCard = function () {
      cardElement.remove();
    };

    var onClickCross = function () {
      removeCard();
      popupClose.removeEventListener('click', onClickCross);
    };

    var onPressEsc = function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        removeCard();
      }

      document.removeEventListener('keydown', onPressEsc);
    };

    popupClose.addEventListener('click', onClickCross);
    document.addEventListener('keydown', onPressEsc);

    return cardElement;
  };

  window.card = {
    renderCard: renderCard,
    removeChildren: removeChildren
  };
})();
