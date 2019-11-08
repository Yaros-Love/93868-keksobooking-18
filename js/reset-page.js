'use strict';

(function () {
  var resetPage = function () {
    var PIN_MAIN_DEFAULT_COORDS = window.util.PIN_MAIN_DEFAULT_COORDS;

    var preview = window.avatar.preview;
    var defaultSrcPreview = window.avatar.defaultSrcPreview;
    var resetUploadedFiles = window.avatar.resetUploadedFiles;
    var removeChilds = window.card.removeChilds;
    var setFieldsetsDisable = window.initialStateForm.setFieldsetsDisable;
    var setAdressInactiveState = window.initialStateForm.setAdressInactiveState;
    var renderCapacity = window.initialStateForm.renderCapacity;

    var pinMain = document.querySelector('.map__pin--main');
    var adForm = document.querySelector('.ad-form');
    var map = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins');
    var mapCard = document.querySelector('.map__card');
    var formFeatures = adForm.querySelectorAll('.feature__checkbox');
    var mapFilter = document.querySelector('.map__filters');
    var title = adForm.querySelector('#title');
    var price = adForm.querySelector('#price');
    var roomNumberSelect = document.querySelector('#room_number');

    var resetCheckboxes = function (checkboxesCollection) {
      Array.from(checkboxesCollection).forEach(function (item) {
        item.checked = false;
      });
    };

    if (mapCard !== null) {
      mapCard.remove();
    }
    removeChilds(mapPins);
    setFieldsetsDisable();
    resetCheckboxes(formFeatures);
    roomNumberSelect.value = '1';
    renderCapacity(roomNumberSelect.value);
    setAdressInactiveState();
    mapFilter.reset();
    resetUploadedFiles();


    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPins.appendChild(pinMain);
    pinMain.style.left = PIN_MAIN_DEFAULT_COORDS.x + 'px';
    pinMain.style.top = PIN_MAIN_DEFAULT_COORDS.y + 'px';

    title.value = '';
    price.value = '';
    preview.src = defaultSrcPreview;
  };

  window.resetPage = resetPage;
})();
