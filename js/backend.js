'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000; // ms

  var setConnection = function (onLoad, onError, method, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        setTimeout(function () {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }, 200);
      }
    });

    xhr.addEventListener('error', function () {
      setTimeout(function () {
        onError('Произошла ошибка соединения');
      }, 200);
    });
    xhr.addEventListener('timeout', function () {
      setTimeout(function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      }, 200);
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);

    return xhr;
  };

  var load = function (onLoad, onError) {
    setConnection(onLoad, onError, 'GET', URL).send();
  };

  var save = function (data, onLoad, onError) {
    setConnection(onLoad, onError, 'POST', URL_POST).send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
