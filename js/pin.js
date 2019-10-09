'use strict';

(function () {
  window.renderPin = function (obj) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinElement = pinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');

    pinElement.style.left = obj.location.x + 'px';
    pinElement.style.top = obj.location.y + 'px';
    pinElementImg.setAttribute('src', obj.author.avatar);
    pinElementImg.setAttribute('alt', obj.offer.title);

    return pinElement;
  };
})();
