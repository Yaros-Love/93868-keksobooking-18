'use strict';

(function () {
  var renderCard = function (obj) {
    var ESC_KEYCODE = window.util.ESC_KEYCODE;

    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupPhotosImg = cardElement.querySelector('.popup__photo');
    //  получаем дефолтную колекцию li и удаляем
    var childrenLi = popupFeatures.children;

    var removeChildren = function (arr) {
      for (var i = arr.length - 1; i >= 0; i--) {
        var child = arr[i];

        child.parentElement.removeChild(child);
      }
    };
    removeChildren(childrenLi);
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

    // вставка фотографий в карточку, требует доработки
    var createImg = function (arr) {
      var fragment = document.createDocumentFragment();

      for (var j = 0; j < arr.length; j++) {
        var node = popupPhotosImg.cloneNode(true);
        node.src = arr[j];
        fragment.appendChild(node);
      }
      return fragment;
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
    // удаляем шаблон изображения
    popupPhotos.removeChild(popupPhotos.children[0]);
    popupPhotos.appendChild(createImg(obj.offer.photos));
    cardElement.querySelector('.popup__avatar').setAttribute('src', obj.author.avatar);

    var popupClose = cardElement.querySelector('.popup__close');
    var removeCard = function () {
      cardElement.remove();
    };

    popupClose.addEventListener('click', removeCard);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        removeCard();
      }
    });

    return cardElement;
  };

  window.card = {
    renderCard: renderCard
  };
})();
