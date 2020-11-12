'use strict';

const MAIN_MOUSE_BUTTON_CODE = 0;
const ServerRequest = {
  GET: {
    method: `GET`,
    url: `https://21.javascript.pages.academy/keksobooking/data`
  },
  POST: {
    method: `POST`,
    url: `https://21.javascript.pages.academy/keksobooking`
  }
};
const StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404
};
const KeysList = {
  ESCAPE: `Escape`,
  ENTER: `Enter`
};

const setEnterEvent = (evt, action) => {
  if (evt.key === KeysList.ENTER) {
    action();
  }
};

const setEscapeEvent = (evt, action) => {
  if (evt.key === KeysList.ESCAPE) {
    action();
  }
};

const setMainMouseEvent = (evt, action) => {
  if (evt.button === MAIN_MOUSE_BUTTON_CODE) {
    action();
  }
};

window.utility = {
  setEnterEvent,
  setEscapeEvent,
  setMainMouseEvent,
  StatusCode,
  ServerRequest
};
