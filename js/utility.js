'use strict';

(function () {
  const MAIN_MOUSE_BUTTON_CODE = 0;
  const KeysList = {
    ESCAPE: `Escape`,
    ENTER: `Enter`
  };

  const isEnterEvent = function (evt, action) {
    if (evt.key === KeysList.ENTER) {
      action();
    }
  };

  const isEscapeEvent = function (evt, action) {
    if (evt.key === KeysList.ESCAPE) {
      action();
    }
  };

  const isMainMouseEvent = function (evt, action) {
    if (evt.button === MAIN_MOUSE_BUTTON_CODE) {
      action();
    }
  };

  window.utility = {
    isEnterEvent,
    isEscapeEvent,
    isMainMouseEvent
  };
})();
