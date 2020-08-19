'use strict';

(function () {
  var hostingType = document.querySelector('#housing-type');
  var advertisement = [];
  var PINS_COUNT = 5; //количество отфильтрованных пинов на карте


  var filterPins = function (value) {
    var filterType = window.advertisement.filter(function (it) {
      if (value === 'any') {
        return it.offer.type === it.offer.type;
      }
      else {
      return it.offer.type === value;
      }
    });

    console.log(filterType)
    window.pin.createPins(countPins(filterType))
  }

  //отображать максимум 5 отфильтрованных пинов
  var countPins = function (data) {
    return (data.slice(0, 5))
  };

  window.filter = {
    filterPins: filterPins,
    countPins : countPins
  };

})()