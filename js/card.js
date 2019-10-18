'use strict';

(function () {
  var renderCard = function (dataObj) {
    var ESC_KEYCODE = window.util.ESC_KEYCODE;

    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupPhotosImg = cardElement.querySelector('.popup__photo');
    //  получаем дефолтную колекцию li и удаляем
    var removeChilds = function (node) {
      var last;
      while (last = node.lastChild) {
        node.removeChild(last);
      }
    };
    removeChilds(popupFeatures);
    // создаем новую коллекцию li вставляем во фрагмент
    var createLi = function (featureArr) {
      var liElement = cardTemplate.querySelector('.popup__feature');
      var fragmentLi = document.createDocumentFragment();
      for (var j = 0; j < featureArr.length; j++) {
        var featureElement = liElement.cloneNode(true);
        featureElement.className = 'popup__feature';
        featureElement.classList.add('popup__feature--' + featureArr[j]);
        fragmentLi.appendChild(featureElement);
      }
      return fragmentLi;
    };

    var createImages = function (arrImages) {
      var fragment = document.createDocumentFragment();

      for (var j = 0; j < arrImages.length; j++) {
        var node = popupPhotosImg.cloneNode(true);
        node.src = arrImages[j];
        fragment.appendChild(node);
      }
      return fragment;
    };

    cardElement.querySelector('.popup__title').textContent = dataObj.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = dataObj.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = dataObj.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = dataObj.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = dataObj.offer.rooms + ' комнаты для ' + dataObj.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataObj.offer.checkin + ', выезд до ' + dataObj.offer.checkout;
    // вставляем фрагмент (новую коллекцию li)
    popupFeatures.appendChild(createLi(dataObj.offer.features));
    cardElement.querySelector('.popup__description').textContent = dataObj.offer.description;
    // удаляем шаблон изображения
    popupPhotos.removeChild(popupPhotos.children[0]);
    popupPhotos.appendChild(createImages(dataObj.offer.photos));
    cardElement.querySelector('.popup__avatar').setAttribute('src', dataObj.author.avatar);

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
