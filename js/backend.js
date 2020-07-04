'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';//для GET
  var URL_POST = 'https://javascript.pages.academy/keksobooking'//для POST

  var load = function (onLoad, onError) {
    setConnection(URL, onLoad, onError, 'GET').send();
  }

  //ф-я обрабатывает запрос, успешный и ошибочный
  var setConnection = function (url, onLoad, onError, method) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusTex);
        window.pin.createPins(xhr.response);
        window.map.onPinClickShowPopup(xhr.response)
      }
      else {
        switch (xhr.status) {
          case 404: onError('Неверный запрос');
            break;
          case 500: onError('Ошибка сервера');
            break;
          case 505: onError('Сервер не найден');
            break;
          default: onError('Произошла ошибка соединения');
        }
      };

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 10000; //10s
    });

    xhr.open(method, url);

    return xhr
  };


  var onErrorLoad = function (message) {
    console.log(message)
    var template = document.querySelector('#error').content;
    var errorElem = template.cloneNode(true);
    errorElem.querySelector('.error__message').textContent = message;
    document.querySelector('main').appendChild(errorElem);
  };

  var onLoadSucsess = function (message) {
    console.log(message)
  }


  window.backend = {
    load: load,
    onLoadSucsess: onLoadSucsess,
    onErrorLoad: onErrorLoad,
  }
})();





//var load = function (onLoad, onError) {
// 	setConnection(url, onLoad, onError, 'GET').send();
// };
// //ф-я отправки данных формы
// var save = function (onLoad, onError, data) {
//   setConnection(URL_POST, onLoad, onError, 'POST').send(data);
// };

// //ф-я обрабатывает запрос, успешный и ошибочный
// var setConnection = function (URL, onLoad, onError, method) {
//   var xhr = new XMLHttpRequest();

//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {

// 	 if (xhr.status === 200) {
// 		onLoad('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText, xhr.response);
// 	 }
// 	 else {
// 		switch (xhr.status) {
// 		  case 400: onError('Неверный запрос');
// 			 break;
// 		  case 500: onError('Ошибка сервера');
// 			 break;
// 		  case 505: onError('Сервер не найден');
// 			 break;
// 		  default: onError('Произошла ошибка соединения');
// 		}
// 	 }
//   });

//   xhr.addEventListener('error', function () {
// 	 onError('Произошла ошибка соединения')
//   });

//   xhr.addEventListener('timeout', function () {
// 	 onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
//   });
//   xhr.timeout = 10000; //10s

//   xhr.open(method, URL);

//   return xhr;
// };


// var onPostSucsess = function (message) {
//   console.log(message);
//   setupElement.classList.add('hidden');
// };
// //слушаем sunmit на форме
// setupWizardForm.addEventListener('submit', function (evt) {
//   save(onPostSucsess, onErrorLoad, new FormData(setupWizardForm));
//   evt.preventDefault();
// });


