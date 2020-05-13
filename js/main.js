//'use strict';
//данные для моков
const addressConst = '600, 350';
const priceArr = [3000, 2970, 1098, 1000];
const titleConst ='Какое-то интересное предложение'
const typeArr = ['palace', 'flat', 'house', 'bungalo'];
const roomsArr = [1, 2, 3, 4, 5, 6];
const guestsArr = [1, 2, 3, 4, 5, 6, 7, 8];
const checkinArr = ['12:00', '13:00', '14:00'];
const checkoutArr = ['12:00', '13:00', '14:00'];
const featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptionConst = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis viverra nibh. Placerat in egestas erat imperdiet. Non odio euismod lacinia at quis risus sed. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat.';
const photosArr = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const heigthBlockY = {
  min : 130,
  max : 630
}
//блок с меткой
const PIN_AREA = document.querySelector('.map__pins');

//высота метки в разметке
const MAP_PIN_HEIGTH = 70;
//ширина метки в разметке
const MAP_PIN_WIDTH = 50;
//убираем класс у .map
var mapActiv = document.querySelector('.map').classList.remove('map--faded');

//ф-я рандомного значения из
var randomItem = function (arrayItems) {
  return arrayItems[Math.round(Math.random() * (arrayItems.length - 1 - 0) + 0)];
}

//ф-я рандома в диапазоне
var randomItemMinMax = function (min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
let randItem = min - 0.5 + Math.random() * (max - min +1);
return Math.round(randItem);
}

//ф-я создания моков
var creationMoks = function () {
var moksCollection = [];
for (var i=0; i < 8; i++) {
var objectItem = {};
//об авторе
objectItem.autor = {
avatar : 'img/avatars/user0' + (i+1) + '.png'
}
//предложение
objectItem.offer = {
title : titleConst,
address : addressConst,
price : randomItem(priceArr),
type : randomItem(typeArr),
rooms : randomItem(roomsArr),
guests : randomItem(guestsArr),
checkin : randomItem(checkinArr),
checkout : randomItem(checkoutArr),
features : randomItem(featuresArr),
description : descriptionConst,
photos : randomItem(photosArr)
}
//местоположение
//находим ширину документа и блока с меткой
let widthDoc = document.querySelector('html').offsetWidth;
let widthBlockPoint = PIN_AREA.offsetWidth;
objectItem.location = {
x : randomItemMinMax((widthDoc - widthBlockPoint) * 0.5, widthDoc - ((widthDoc - widthBlockPoint) * 0.5)),
y : randomItemMinMax(heigthBlockY.min, heigthBlockY.max)
}
//добавляем объекты в массив
moksCollection.push(objectItem)
}
return moksCollection;
}

creationMoks();
console.log(creationMoks())

//контент шаблона
var pinTamplate = document.querySelector('#pin').content;
//console.log(pinTamplate)

//ф-я создания елемента в разметки
var creatElementsPins = function (tamplate, arrayObj, elementForPush) {
for (var j = 0; j < arrayObj.length; j++){
  let pointInTheMap = tamplate.cloneNode(true);
  let mapButtonPin = pointInTheMap.querySelector('.map__pin');
  console.log(mapButtonPin)
  mapButtonPin.style.left = arrayObj[j].location.x - MAP_PIN_WIDTH * 0.5 + 'px';
  mapButtonPin.style.top = arrayObj[j].location.y - MAP_PIN_HEIGTH + 'px';
  mapButtonPin.alt = arrayObj[j].offer.title;
  pointInTheMap.querySelector('img').src = arrayObj[j].autor.avatar;
  elementForPush.appendChild(pointInTheMap);
}
}

creatElementsPins(pinTamplate, creationMoks(), PIN_AREA)
