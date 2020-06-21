'use strict';
//модуль, который управляет карточками объявлений и пинами: добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте

(function () {
  var mapElement = window.const.mapElement;
  var mapPinsElement = document.querySelector('.map__pins');//элемент с метками объявлений
  var mapPinMainElem = window.const.mapPinMainElem//главная метка на карте
  var mapPinMainWidth = window.const.mapPinMainWidth;
  var mapPinMainHeight = window.const.mapPinMainHeight;
  var mapFiltersElem = document.querySelector('.map__filters');//форма с фильтрами для объявлений
  var pinTemplate = document.querySelector('#pin'); //шаблон пина на карте
  var mapOverlayElem = window.const.mapOverlayElem;
  var ENTER_KEYCODE = window.const.ENTER_KEYCODE;
  var ESCAPE_KEYCODE = window.const.ESCAPE_KEYCODE;
  //допустимый диапазон по Х для пинов на элемете .map__overlay
  var MAP_OVERLAY_WIDTH = window.const.MAP_OVERLAY_WIDTH;
  //допустимый диапазон по Y для пинов на элемете .map__overlay
  var MAP_OVERLAY_HEIGTH = window.const.MAP_OVERLAY_HEIGTH
  var MAP_PIN_HEIGTH = window.const.MAP_PIN_HEIGTH;
  var addFormElement = window.const.addFormElement;
  var addFormTextarea = addFormElement.querySelector('textarea');
  var addFormFieldsets = addFormElement.querySelectorAll('fieldset');//Fieldsets в форме, кот нужно сделать активными
  var addFormButtons = addFormElement.querySelectorAll('button');
  var mapFiltersSelects = mapFiltersElem.querySelectorAll('select'); //select в форме фильтров
  var mapFiltersFieldset = mapFiltersElem.querySelector('fieldset'); //fielset в форме фильтров
  var PIN_ARROW_HEIGHT = window.const.PIN_ARROW_HEIGHT;


  ///ф-я, в активное состояние страницы
  var showMapByPress = function () {
    mapElement.classList.remove('map--faded');
    addFormElement.classList.remove('ad-form--disabled');
    mapFiltersElem.classList.remove('ad-form--disabled');
    mapFiltersFieldset.removeAttribute('disabled');
    addFormTextarea.removeAttribute('disabled');
    for (var selects of mapFiltersSelects) {
      selects.removeAttribute('disabled')
    };
    for (var fieldsets of addFormFieldsets) {
      fieldsets.removeAttribute('disabled');
    };
    for (var buttons of addFormButtons) {
      buttons.removeAttribute('disabled');
    }
    // удаляем обработчик события
    mapPinMainElem.removeEventListener('mousedown', showMapByPress)
  }

  //слушатель по нажатию мыши на метку
  mapPinMainElem.addEventListener('mousedown', showMapByPress)

  // слушатель по нажатию enter
  mapPinMainElem.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      showMapByPress()
    }
  })

  //контент шаблона для пина на карте
  var pinTempContent = pinTemplate.content;
  //отрисовывка пинов на карте
  window.pin.createPins(pinTempContent, window.data.moks, mapPinsElement);

  // ф-я удаления выбранной карточки с объявлением
  var deletePinPopup = function () {
    mapElement.querySelector('article.popup').remove();
    document.removeEventListener('keydown', onEscapeButClose);
  }

  // отрисовка карточки по клику, удаление popup если выбирается новый
  // находим все пины и слушает 'клик'
  var pins = mapPinsElement.querySelectorAll('button[type=button].map__pin');
  for (var pin of pins) {
    pin.addEventListener('click', function (e) {
      //проверяем есть ли открытое объявление на карте
      if (mapElement.contains(document.querySelector('article.popup'))) {
        deletePinPopup();
      };
      var currentPin = window.data.moks[e.currentTarget.value]; //нажатый пин - объект
      window.pin.createCard(currentPin);
      //вешаем слушателя на esc
      document.addEventListener('keydown', onEscapeButClose);
      //вешаем слушателя на enter по кнопке .popup__close
      var popupClose = mapElement.querySelector('.popup__close');
      popupClose.addEventListener('keydown', onEnterButClose);
      popupClose.addEventListener('click', deletePinPopup);
    })
  }

  //удаление карточки по enter на .popup__close
  var onEnterButClose = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      deletePinPopup();
    }
  }

  //удаление карточки по esc
  var onEscapeButClose = function (evt) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      deletePinPopup();
    }
  }


  //tgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
  var dragged; //флаг перетаскивания
  var coordsLimit = mapOverlayElem.getBoundingClientRect();
  console.log(coordsLimit.x)
  //ограничения за которые нельзя перетащить главный пин
  var limits = {
    top: MAP_OVERLAY_HEIGTH.min - mapPinMainHeight * 0.5 - PIN_ARROW_HEIGHT,
    rigth: MAP_OVERLAY_WIDTH.max,
    bottom: MAP_OVERLAY_HEIGTH.max - mapPinMainHeight * 0.5 - PIN_ARROW_HEIGHT,
    left: MAP_OVERLAY_WIDTH.min
  };
  console.log(limits.top, mapPinMainHeight)
  mapPinMainElem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    dragged = true;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (dragged) {
        var newLocaton = {
          x: limits.left,
          y: limits.top
        };
console.log(moveEvt.clientX, pageXOffset)
        if (moveEvt.clientX > limits.rigth + coordsLimit.x) {
          newLocaton.x = limits.rigth;
        }
        else if (moveEvt.clientX > limits.left + coordsLimit.x) {
          newLocaton.x = moveEvt.clientX - coordsLimit.x;
        }
        if (moveEvt.clientY > limits.bottom - pageYOffset) {
          newLocaton.y = limits.bottom - pageYOffset;
        }
        else if (moveEvt.clientY > limits.top - pageYOffset) {
          newLocaton.y = moveEvt.clientY;
        }
        //координаты метки с корректировкой относительно размеров метки
        mapPinMainElem.style.top = newLocaton.y + pageYOffset - mapPinMainHeight * 0.5 + 'px';
        mapPinMainElem.style.left = newLocaton.x - mapPinMainWidth * 0.5 + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      dragged = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  })
})()


