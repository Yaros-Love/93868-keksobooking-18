'use strict';

(function () {
  var renderCard = window.card.renderCard;
  var removeCard = window.card.removeCard;

  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapElement = document.querySelector('.map');


  var renderPin = function (pinProperty) {
    var pinElement = pinTemplateElement.cloneNode(true);

    pinElement.style.left = pinProperty.location.x + 'px';
    pinElement.style.top = pinProperty.location.y + 'px';

    var pinElementImage = pinElement.querySelector('img');

    pinElementImage.src = pinProperty.author.avatar;
    pinElementImage.alt = pinProperty.offer.title;

    var onPinClick = function () {
      var mapActivePins = document.querySelectorAll('.map__pin--active');
      mapActivePins.forEach(function (item) {
        return item.classList.remove('map__pin--active');
      });
      pinElement.classList.add('map__pin--active');
      removeCard();
      mapElement.appendChild(renderCard(pinProperty));
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
