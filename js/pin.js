'use strict';

(function () {
  var renderCard = window.card.renderCard;
  var removeCard = window.card.removeCard;

  var renderPin = function (pinProperty) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    var map = document.querySelector('.map');

    pinElement.style.left = pinProperty.location.x + 'px';
    pinElement.style.top = pinProperty.location.y + 'px';

    var pinElementImg = pinElement.querySelector('img');

    pinElementImg.setAttribute('src', pinProperty.author.avatar);
    pinElementImg.setAttribute('alt', pinProperty.offer.title);

    var onPinClick = function () {
      var mapPins = document.querySelectorAll('.map__pin--active');
      for (var i = 0; i < mapPins.length; i++) {
        mapPins[i].classList.remove('map__pin--active');
      }
      pinElement.classList.add('map__pin--active');
      removeCard();
      map.appendChild(renderCard(pinProperty));
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
