'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  var setConnection = function (onLoad, onError, method, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
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
