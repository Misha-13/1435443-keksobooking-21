'use strict';

const main = document.querySelector(`main`);
const {method, url} = window.utility.ServerRequest.POST;

const showUploadInfo = (windowId) => {
  const msgTemplate = document.querySelector(`#` + windowId).content.querySelector(`.` + windowId);
  const msgWindow = msgTemplate.cloneNode(true);

  const onMsgWindowRemove = () => {
    msgWindow.remove();
  };

  msgWindow.addEventListener(`click`, onMsgWindowRemove);

  const onMsgKeyDown = (evt) => {
    window.utility.setEscapeEvent(evt, onMsgWindowRemove);
    window.removeEventListener(`keydown`, onMsgKeyDown);
  };

  window.addEventListener(`keydown`, onMsgKeyDown);

  if (windowId === `error`) {
    const errorButton = msgWindow.querySelector(`.error__button`);
    const onErrorButtonClick = () => {
      onMsgWindowRemove();
      errorButton.removeEventListener(`click`, onErrorButtonClick);
    };
    errorButton.addEventListener(`click`, onErrorButtonClick);
    window.map.removeExistPin();
  }
  main.prepend(msgWindow);
};

const uploadData = (data, onSuccess) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    const isSuccess = (xhr.status === window.utility.StatusCode.OK);
    if (isSuccess) {
      onSuccess();
    }
    showUploadInfo(isSuccess ? `success` : `error`);
  });
  xhr.addEventListener(`error`, () => {
    showUploadInfo(`error`);
  });
  xhr.open(method, url);
  xhr.send(data);
};

window.upload = {
  upload: uploadData
};
