'use strict';

(function () {
  var renderCard = window.card.renderCard;

  var renderPin = function (obj) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    var map = document.querySelector('.map');

    pinElement.style.left = obj.location.x + 'px';
    pinElement.style.top = obj.location.y + 'px';
    pinElementImg.setAttribute('src', obj.author.avatar);
    pinElementImg.setAttribute('alt', obj.offer.title);

    var onPinClick = function () {
      var mapPins = document.querySelectorAll('.map__pin');
      var mapCard = document.querySelector('.map__card');
      for (var i = 0; i < mapPins.length; i++) {
        mapPins[i].classList.remove('map__pin--active');
      }
      pinElement.classList.add('map__pin--active');
      if (mapCard === null) {
        map.appendChild(renderCard(obj));
      } else {
        mapCard.remove();
        map.appendChild(renderCard(obj));
      }
    };

    pinElement.addEventListener('click', function () {
      onPinClick();
    });

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin
  };
})();
