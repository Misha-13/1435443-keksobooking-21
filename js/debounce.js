'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 1500;
  let lastTimeout;

  const setDebounce = (action) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    setDebounce
  };
})();
