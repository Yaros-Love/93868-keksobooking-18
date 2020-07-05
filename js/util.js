'use strict';
// модуль с улилитарными переменными
(function(){

//ф-я рандомного значения из массива
var randomItem = function (array) {
  return array[Math.round(Math.random() * (array.length - 1 - 0) + 0)];
};

 //ф-я рандома в диапазоне
 var randomItemMinMax = function (min, max) {
  //  случайное число от min до (max+1)
  var randItem = min + Math.random() * (max + 1 - min);
  return Math.floor(randItem);
};

//ф-я удаления детей
var deleteChilds = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

//объект на экспорт
window.util = {
  randomItem : randomItem,
  randomItemMinMax : randomItemMinMax,
  deleteChilds : deleteChilds,
}
})()