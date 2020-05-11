//'use strict';
//данные для моков
var moksCollection = [];
var avatarPic = [1, 2, 3, 4, 5, 6, 7, 8];
var title = 'Предлагаю предложение';
var address = '600, 350';
var price = [3000, 2970, 1098, 1000];
var type = ['palace', 'flat', 'house', 'bungalo'];
var rooms = [1, 2, 3, 4, 5, 6];
var guests = [1, 2, 3, 4, 5, 6, 7, 8];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas diam in arcu cursus euismod quis viverra nibh. Placerat in egestas erat imperdiet. Non odio euismod lacinia at quis risus sed. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat.';
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var locationPoint = {
  x : 150,
  y : 2
};

//убираем класс у .map
var mapActiv = document.querySelector('.map').classList.remove('map--faded');

//ф-я рандомного значения из
var randomItem = function (arrayItems) {
  return arrayItems[Math.round(Math.random() * (arrayItems.length - 1 - 0) + 0)];
}

//ф-я создания моков
var creationMoks = function (avatarPicArray, someTitle, someAdress, priceArray, typeArray, roomsArray, guestsArray, checkinArray, checkoutArray, featuresArray, someDescription, photosArray, someLocationPoint) {
for (i=0; i < 9; i++) {
var objectItem = {};
//об авторе
objectItem.autor = {
  avatar : 'img/avatars/user0' + randomItem(avatarPicArray) + '.png'
}
//о предложении

moksCollection.push(objectItem)
}
}

creationMoks(avatarPic);
console.log(moksCollection)
