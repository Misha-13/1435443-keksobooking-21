'use strict';

const addErrorMsg = (errorText) => {
  const errorDiv = document.createElement(`div`);
  errorDiv.setAttribute(`style`, `width: 80%; height: 200px; background-color: rgba(240, 240, 234, 0.8); font-family: "Roboto", "Arial", sans-serif; position: absolute; top: 20%; left: 50%; z-index: 9999; transform: translateX(-50%); text-align: center;`);
  errorDiv.innerHTML = `<h1 style="margin-bottom: 10px;">Error: ` + errorText + `</h1><br><a href="index.html" style="font-size: 50px; margin:0; color: rgba(255, 86, 53, 0.7);">Обновите страницу!</a>`;
  document.body.prepend(errorDiv);
};

const showError = (errorText) => {
  addErrorMsg(errorText);
};

window.error = {
  show: showError
};
