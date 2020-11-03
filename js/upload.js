'use strict';

(function () {
  const showUploadInfo = function (windowId) {
    const main = document.querySelector(`main`);
    const msgTemplate = document.querySelector(`#` + windowId).content.querySelector(`.` + windowId);
    const msgWindow = msgTemplate.cloneNode(true);
    msgWindow.addEventListener(`click`, function () {
      msgWindow.remove();
    });

    const onMsgKeyDown = function (evt) {
      window.utility.isEscapeEvent(evt, function () {
        msgWindow.remove();
      });
      document.removeEventListener(`keydown`, onMsgKeyDown);
    };

    document.addEventListener(`keydown`, onMsgKeyDown);

    if (windowId === `error`) {
      const errorButton = msgWindow.querySelector(`.error__button`);
      const onErrorButtonClick = function () {
        msgWindow.remove();
        errorButton.removeEventListener(`click`, onErrorButtonClick);
      };
      errorButton.addEventListener(`click`, onErrorButtonClick);
      window.map.removeExistPin();
    }
    main.prepend(msgWindow);
  };

  const uploadData = function (data, onSuccess) {
    const StatusCode = {
      OK: 200,
      BAD_REQUEST: 400,
      NOT_FOUND: 404
    };
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess();
        showUploadInfo(`success`);
      } else {
        showUploadInfo(`error`);
      }
    });
    xhr.addEventListener(`error`, function () {
      showUploadInfo(`error`);
    });
    xhr.open(`POST`, `https://21.javascript.pages.academy/keksobooking`);
    xhr.send(data);
  };

  window.upload = {
    uploadData
  };
})();
