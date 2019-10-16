'use strict';

(function () {
  var renderPin = window.pin.renderPin;
  var ENTER_KEYCODE = window.util.ENTER_KEYCODE;
  var renderCard = window.card.renderCard;
  var getRandomInt = window.util.getRandomInt;
  // var successHandler =  window.mapActivation.successHandler;
  // var load = window.backend.load;

  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');

  var resetDisable = function (obj) {
    for (var j = 0; j < obj.length; j++) {
      obj[j].removeAttribute('disabled', 'disabled');
    }
  };


  var insertPinsInMap = function (arr) {
    var fragment = document.createDocumentFragment();
    var similarListPin = map.querySelector('.map__pins');

    if (arr.length !== 0) {
      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(renderPin(arr[i]));
      }
      similarListPin.appendChild(fragment);
    }

    return similarListPin;
  };


  var successHandler = function (data) {
    resetDisable(fieldsets);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    // var randomItemCardInArray = renderCard(data[getRandomInt(0, data.length - 1)]);
    // map.appendChild(randomItemCardInArray);
    // map.appendChild(insertPinsInMap());

    map.appendChild(insertPinsInMap(data));

    var pins = map.querySelector('.map__pins');
    pins.addEventListener('click', function (evt) {
      var target = evt.target
      var src = target.getAttribute('src');
      var userNumber = getNumberFromString(src);
      console.log(data);

      if (target.tagName === 'IMG' && data.src != 'default') {
        // searchObj(data, src);
        var randomItemCardInArray = renderCard(data[userNumber]);
        map.appendChild(randomItemCardInArray);

        console.log('click');
      }
    });
  };

  var errorHandler = function () {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = 'Произошла шибка соединения';
    document.body.insertAdjacentElement('afterbegin', node);
  };


  var URL = 'https://js.dump.academy/keksobooking/data';

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };

  var onMouseDown = function () {
    load(successHandler, errorHandler);
    pinMain.removeEventListener('click', onMouseDown);
  };

  pinMain.addEventListener('click', onMouseDown);
    // var mapActivation = window.mapActivation.mapActivation;
    // mapActivation();


  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      var mapActivation = window.mapActivation.mapActivation;
      mapActivation();
    }
  });

var searchObj = function (dataArr, src) {
  var i = 0;
  for (var src in dataArr) {
    i++;
    if (dataArr[src]) {
      console.log(i);
      return dataArr[i];
    }
  };
};

var getNumberFromString = function (str) {
  var emptyStr = '';
  for (var i in str) {
    if ( parseInt(str[i]) ) {
      emptyStr += str[i];
    }
  }
  parseInt(emptyStr);

  return parseInt(emptyStr);
};


  // слушатели пинов




  window.map = {
    insertPinsInMap: insertPinsInMap,
    map: map,
    pinMain: pinMain,
    adForm: adForm
  };
})();
