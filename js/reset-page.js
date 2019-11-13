'use strict';

(function () {
  var resetPage = function () {
    var PIN_MAIN_DEFAULT_COORDS = window.initialStateForm.PIN_MAIN_DEFAULT_COORDS;
    var resetUploadedFiles = window.uploadPhoto.resetUploadedFiles;
    var setDefaultPreview = window.uploadPhoto.setDefaultPreview;
    var removeChildren = window.util.removeChildren;
    var setDisable = window.initialStateForm.setDisable;
    var setAddressInactiveState = window.initialStateForm.setAddressInactiveState;
    var renderCapacity = window.initialStateForm.renderCapacity;

    var resetCheckboxes = function (checkboxesCollection) {
      Array.from(checkboxesCollection).forEach(function (item) {
        item.checked = false;
      });
    };

    var mapCard = document.querySelector('.map__card');
    if (mapCard !== null) {
      mapCard.remove();
    }

    var mapPins = document.querySelector('.map__pins');
    var pinMain = document.querySelector('.map__pin--main');
    removeChildren(mapPins);

    var selects = document.querySelectorAll('select');
    var fieldsets = document.querySelectorAll('fieldset');
    setDisable(selects);
    setDisable(fieldsets);

    var adForm = document.querySelector('.ad-form');
    var formFeatures = adForm.querySelectorAll('.feature__checkbox');
    resetCheckboxes(formFeatures);

    var roomNumberSelect = document.querySelector('#room_number');
    roomNumberSelect.value = '1';
    renderCapacity(roomNumberSelect.value);

    var mapFilter = document.querySelector('.map__filters');
    mapFilter.reset();

    resetUploadedFiles();
    setDefaultPreview();
    setAddressInactiveState();

    var map = document.querySelector('.map');

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPins.appendChild(pinMain);
    pinMain.style.left = PIN_MAIN_DEFAULT_COORDS.x + 'px';
    pinMain.style.top = PIN_MAIN_DEFAULT_COORDS.y + 'px';


    var title = adForm.querySelector('#title');
    var price = adForm.querySelector('#price');
    title.value = '';
    price.value = '';
  };

  window.resetPage = resetPage;
})();
