'use strict';

const {OK, BAD_REQUEST, NOT_FOUND} = window.utility.StatusCode;
const {method, url} = window.utility.ServerRequest.GET;

const getData = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case OK:
        onSuccess(xhr.response);
        break;
      case BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case NOT_FOUND:
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
  xhr.open(method, url);
  xhr.send();
};

window.load = {
  getData
};
