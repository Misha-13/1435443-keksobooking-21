'use strict';

(function () {
  const getData = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = `Неверный запрос`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;
        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = 10000;
    xhr.open(`GET`, `https://21.javascript.pages.academy/keksobooking/data`);
    xhr.send();
  };

  window.load = {
    getData
  };
})();
