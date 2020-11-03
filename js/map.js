'use strict';

(function () {
  const X_SHIFT = 25;
  const Y_SHIFT = 70;
  const EXCEPTION = `map__pin--main`;
  const cardFragment = document.createDocumentFragment();
  const mapArea = document.querySelector(`.map`);
  const insertTargetElement = mapArea.querySelector(`.map__filters-container`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinsList = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();

  const fillPins = function (pin) {
    const pinElement = pinTemplate.cloneNode(true);
    const img = pinElement.querySelector(`img`);
    const pinX = pin.location.x - X_SHIFT;
    const pinY = pin.location.y - Y_SHIFT;
    pinElement.setAttribute(`style`, `left: ` + pinX + `px; top: ` + pinY + `px;`);
    img.setAttribute(`src`, pin.author.avatar);
    img.setAttribute(`alt`, pin.offer.title);
    return pinElement;
  };

  const removeExistPin = function () {
    const mapAreaElement = mapArea.querySelector(`.map__card`);
    if (mapAreaElement) {
      const activatedPin = mapArea.querySelector(`.map__pin--active`);
      mapAreaElement.remove();
      activatedPin.classList.remove(`map__pin--active`);
    }
  };

  const onInfoPinKeydown = function (evt) {
    window.utility.isEscapeEvent(evt, function () {
      removeExistPin();
      document.removeEventListener(`keydown`, onInfoPinKeydown);
    });
  };

  const setExitButtonEvent = function () {
    const mapAreaElement = mapArea.querySelector(`.map__card`);
    const closePopupButton = mapAreaElement.querySelector(`.popup__close`);
    closePopupButton.addEventListener(`click`, function () {
      removeExistPin();
    });
  };

  const showPinsCard = function (pin) {
    removeExistPin();
    cardFragment.appendChild(window.card.fillCards(pin));
    mapArea.insertBefore(cardFragment, insertTargetElement);
    setExitButtonEvent();
    document.addEventListener(`keydown`, onInfoPinKeydown);
  };

  const renderPinCard = function (pinsArray) {
    const mapPinsList = mapArea.querySelectorAll(`.map__pin`);
    let exceptionCounter = 0;
    for (let i = 0; i < mapPinsList.length; i++) {
      if (!mapPinsList[i].classList.contains(EXCEPTION)) {
        const currentPin = pinsArray[i - exceptionCounter];
        mapPinsList[i].addEventListener(`click`, function () {
          showPinsCard(currentPin);
          mapPinsList[i].classList.add(`map__pin--active`);
        });
      } else {
        exceptionCounter++;
      }
    }
  };

  const removePins = function () {
    const mapPinsList = mapArea.querySelectorAll(`.map__pin`);
    for (let i = mapPinsList.length - 1; i > 0; i--) {
      if (!mapPinsList[i].classList.contains(EXCEPTION)) {
        mapPinsList[i].remove();
      }
    }
  };

  const returnPins = function (arr) {
    mapArea.classList.remove(`map--faded`);
    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(fillPins(arr[i]));
    }
    pinsList.appendChild(fragment);
    renderPinCard(arr);
  };

  const renderPins = function () {
    window.load.getData(returnPins, window.error.showError);
  };

  window.map = {
    renderPins,
    removeExistPin,
    removePins
  };
})();
