'use strict';

(function () {
  var renderCard = function (obj) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var popupFeatures = cardElement.querySelector('.popup__features');
    //  получаем дефолтную колекцию li и удаляем
    var childrenLi = popupFeatures.children;

    for (var i = childrenLi.length - 1; i >= 0; i--) {
      var child = childrenLi[i];

      child.parentElement.removeChild(child);
    }
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

    cardElement.querySelector('.popup__title').textContent = obj.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = obj.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = obj.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    // вставляем фрагмент (новую коллекцию li)
    popupFeatures.appendChild(createLi(obj.offer.features));
    cardElement.querySelector('.popup__description').textContent = obj.offer.description;
    cardElement.querySelector('.popup__photo').setAttribute('src', obj.offer.photos);
    cardElement.querySelector('.popup__avatar').setAttribute('src', obj.author.avatar);

    return cardElement;
  };

  window.card = {
    renderCard: renderCard
  };
})();
