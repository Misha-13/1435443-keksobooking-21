'use strict';

(function () {
  const getData = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case window.utility.StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case window.utility.StatusCode.BAD_REQUEST:
          error = `Неверный запрос`;
          break;
        case window.utility.StatusCode.NOT_FOUND:
          error = `Ничего не найдено`;
          break;
        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = 10000;
    xhr.open(window.utility.SERVER_REQUEST.get.method, window.utility.SERVER_REQUEST.get.url);
    xhr.send();
  };

  window.load = {
    getData
  };
})();
