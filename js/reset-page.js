'use strict';

(function () {
  var PIN_MAIN_DEFAULT_COORDS = window.initialStateForm.PIN_MAIN_DEFAULT_COORDS;
  var resetUploadedFiles = window.uploadPhoto.resetUploadedFiles;
  var setDefaultPreview = window.uploadPhoto.setDefaultPreview;
  var removeChildren = window.util.removeChildren;
  var setDisable = window.initialStateForm.setDisable;
  var setAddressInactiveState = window.initialStateForm.setAddressInactiveState;
  var setMinValuePlaceholder = window.initialStateForm.setMinValuePlaceholder;
  var renderCapacity = window.initialStateForm.renderCapacity;
  var setTimeSync = window.initialStateForm.setTimeSync;

  var adFormElement = document.querySelector('.ad-form');
  var selectElements = document.querySelectorAll('select');
  var fieldsetElements = document.querySelectorAll('fieldset');
  var titleElement = adFormElement.querySelector('#title');
  var priceElement = adFormElement.querySelector('#price');
  var typeHouseElement = adFormElement.querySelector('#type');
  var timeInElement = adFormElement.querySelector('#timein');
  var textareaElement = adFormElement.querySelector('#description');
  var mapElement = document.querySelector('.map');
  var roomNumberSelectElement = document.querySelector('#room_number');
  var formFeatureElements = adFormElement.querySelectorAll('.feature__checkbox');
  var mapFilterElement = document.querySelector('.map__filters');


  var resetCheckboxes = function (checkboxesCollection) {
    checkboxesCollection.forEach(function (item) {
      if (item.checked === true) {
        item.checked = false;
      }
    });
  };

  var removeInvalidClass = function (elements) {
    elements.forEach(function (item) {
      item.classList.remove('ad-form--invalid');
    });
  };

  var resetPage = function () {
    var mapCardElement = document.querySelector('.map__card');
    if (mapCardElement !== null) {
      mapCardElement.remove();
    }

    var mapPinsElement = document.querySelector('.map__pins');
    var pinMainElement = document.querySelector('.map__pin--main');
    removeChildren(mapPinsElement);

    setDisable(selectElements);
    setDisable(fieldsetElements);

    resetCheckboxes(formFeatureElements);
    removeInvalidClass(adFormElement.querySelectorAll('.ad-form--invalid'));

    roomNumberSelectElement.value = '1';
    renderCapacity(roomNumberSelectElement.value);

    mapFilterElement.reset();
    resetUploadedFiles();
    setDefaultPreview();
    setAddressInactiveState();

    mapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');
    mapPinsElement.appendChild(pinMainElement);
    pinMainElement.style.left = PIN_MAIN_DEFAULT_COORDS.x + 'px';
    pinMainElement.style.top = PIN_MAIN_DEFAULT_COORDS.y + 'px';

    titleElement.value = '';
    priceElement.value = '';
    textareaElement.value = '';

    typeHouseElement.value = 'house';
    timeInElement.selectedIndex = 0;
    setMinValuePlaceholder(typeHouseElement.value.toUpperCase());
    setTimeSync(timeInElement.selectedIndex);
  };

  window.resetPage = resetPage;
})();
