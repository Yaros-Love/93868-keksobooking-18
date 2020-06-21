'use strict';
//модуль с константами
(function () {
  var ENTER_KEYCODE = 13;
  var ESCAPE_KEYCODE = 27;
  var MOKS_COUNT = 8; //количество пинов на карте
  var PIN_ARROW_HEIGHT = 22; //высота стрелки пина

  var mapElement = document.querySelector('.map');//Карта объявлений
  var mapPinMainElem = document.querySelector('.map__pin--main');//главноая метка на карте
  var mapPinMainWidth = mapPinMainElem.offsetWidth;
  var mapPinMainHeight = mapPinMainElem.offsetHeight;
  var mapOverlayElem = document.querySelector('.map__overlay');
  var addFormElement = document.querySelector('.ad-form');//Форма объявления

  //допустимый диапазон по Х для пинов на элемете .map__overlay
  var MAP_OVERLAY_WIDTH = {
    min: 0,
    max: mapOverlayElem.offsetWidth
  };

  //допустимый диапазон по Y для пинов на элемете .map__overlay
  var MAP_OVERLAY_HEIGTH = {
    min: 130,
    max: 630
  };

  //высота пина (.map__pin) в разметке
  var MAP_PIN_HEIGTH = 70;
  //ширина пина (.map__pin) в разметке
  var MAP_PIN_WIDTH = 50;

  //Объект на экспорт
  window.const = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESCAPE_KEYCODE: ESCAPE_KEYCODE,
    MOKS_COUNT: MOKS_COUNT,
    PIN_ARROW_HEIGHT : PIN_ARROW_HEIGHT,
    mapElement : mapElement,
    mapPinMainElem : mapPinMainElem,
    mapPinMainWidth : mapPinMainWidth,
    mapPinMainHeight : mapPinMainHeight,
    mapOverlayElem: mapOverlayElem,
    addFormElement : addFormElement,
    MAP_OVERLAY_WIDTH: MAP_OVERLAY_WIDTH,
    MAP_OVERLAY_HEIGTH: MAP_OVERLAY_HEIGTH,
    MAP_PIN_HEIGTH : MAP_PIN_HEIGTH,
    MAP_PIN_WIDTH : MAP_PIN_WIDTH,

  }
})()