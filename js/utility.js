'use strict';

(function () {
  const MAIN_MOUSE_BUTTON_CODE = 0;
  const KeysList = {
    ESCAPE: `Escape`,
    ENTER: `Enter`
  };

  window.utility = {
    isEnterEvent(evt, action) {
      if (evt.key === KeysList.ENTER) {
        action();
      }
    },
    isEscapeEvent(evt, action) {
      if (evt.key === KeysList.ESCAPE) {
        action();
      }
    },
    isMainMouseEvent(evt, action) {
      if (evt.button === MAIN_MOUSE_BUTTON_CODE) {
        action();
      }
    }
  };
})();
