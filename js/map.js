'use strict';
//модуль, который управляет карточками объявлений и пинами: добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте

(function(){
///ф-я, в активное состояние страницы
var showMapByPress = function () {
  window.data.mapElement.classList.remove('map--faded');
  window.data.addFormElement.classList.remove('ad-form--disabled');
  window.data.mapFiltersElem.classList.remove('ad-form--disabled');
  for (var fieldsets of window.data.addFormFieldsets) {
    fieldsets.removeAttribute("disabled");
  }
  // удаляем обработчик события
  window.data.mapPinMainElem.removeEventListener('mousedown', showMapByPress)
}

//слушатель по нажатию мыши на метку
window.data.mapPinMainElem.addEventListener('mousedown', showMapByPress)

// слушатель по нажатию enter
window.data.mapPinMainElem.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.data.ENTER_KEYCODE) {
    showMapByPress()
  }
})

//контент шаблона для пина на карте
var pinTempContent = window.data.pinTemplate.content;
//отрисовывка пинов на карте
window.pin.createPins(pinTempContent, window.data.moks, window.data.mapPinsElement);

// ф-я удаления выбранной карточки с объявлением
var deletePinPopup = function () {
  window.data.mapElement.querySelector('article.popup').remove();
  document.removeEventListener('keydown', onEscapeButClose);
}

// отрисовка карточки по клику, удаление popup если выбирается новый
// находим все пины и слушает 'клик'
var pins = window.data.mapPinsElement.querySelectorAll('button[type=button].map__pin');
for (var pin of pins) {
  pin.addEventListener('click', function (e) {
    //проверяем есть ли открытое объявление на карте
    if (window.data.mapElement.contains(document.querySelector('article.popup'))) {
      deletePinPopup();
    }
    var currentValuePin = e.currentTarget.value;
    window.pin.createCard(window.data.moks, currentValuePin);
    //вешаем слушателя на esc
    document.addEventListener('keydown', onEscapeButClose);
    //вешаем слушателя на enter по кнопке .popup__close
    var popupClose = window.data.mapElement.querySelector('.popup__close');
    popupClose.addEventListener('keydown', onEnterButClose);
    popupClose.addEventListener('click', deletePinPopup);
  })
}

//удаление карточки по enter на .popup__close
var onEnterButClose = function (evt) {
  if (evt.keyCode === window.data.ENTER_KEYCODE) {
    deletePinPopup();
  }
}

//удаление карточки по esc
var onEscapeButClose = function (evt) {
  if (evt.keyCode === window.data.ESCAPE_KEYCODE) {
    deletePinPopup();
  }
}
})()
