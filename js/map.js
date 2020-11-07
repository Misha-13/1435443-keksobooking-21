'use strict';

(function () {
  const X_SHIFT = 25;
  const Y_SHIFT = 70;
  const EXCEPTION = `map__pin--main`;
  const MAX_PINS = 5;
  const cardFragment = document.createDocumentFragment();
  const mapArea = document.querySelector(`.map`);
  const insertTargetElement = mapArea.querySelector(`.map__filters-container`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const pinsList = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  let serverData = [];

  const fillPins = (pin) => {
    const pinElement = pinTemplate.cloneNode(true);
    const img = pinElement.querySelector(`img`);
    const pinX = pin.location.x - X_SHIFT;
    const pinY = pin.location.y - Y_SHIFT;
    pinElement.setAttribute(`style`, `left: ` + pinX + `px; top: ` + pinY + `px;`);
    img.setAttribute(`src`, pin.author.avatar);
    img.setAttribute(`alt`, pin.offer.title);
    return pinElement;
  };

  const removeExistPin = () => {
    const mapAreaElement = mapArea.querySelector(`.map__card`);
    if (mapAreaElement) {
      const activatedPin = mapArea.querySelector(`.map__pin--active`);
      mapAreaElement.remove();
      activatedPin.classList.remove(`map__pin--active`);
    }
  };

  const onInfoPinKeydown = (evt) => {
    window.utility.isEscapeEvent(evt, () => {
      removeExistPin();
      document.removeEventListener(`keydown`, onInfoPinKeydown);
    });
  };

  const setExitButtonEvent = () => {
    const mapAreaElement = mapArea.querySelector(`.map__card`);
    const closePopupButton = mapAreaElement.querySelector(`.popup__close`);
    closePopupButton.addEventListener(`click`, () => {
      removeExistPin();
    });
  };

  const showPinsCard = (pin) => {
    removeExistPin();
    cardFragment.appendChild(window.card.fillCards(pin));
    mapArea.insertBefore(cardFragment, insertTargetElement);
    setExitButtonEvent();
    document.addEventListener(`keydown`, onInfoPinKeydown);
  };

  const renderPinCard = (pinsArray) => {
    const mapPinsList = mapArea.querySelectorAll(`.map__pin`);
    let exceptionCounter = 0;
    for (let i = 0; i < mapPinsList.length; i++) {
      if (!mapPinsList[i].classList.contains(EXCEPTION)) {
        const currentPin = pinsArray[i - exceptionCounter];
        mapPinsList[i].addEventListener(`click`, () => {
          showPinsCard(currentPin);
          mapPinsList[i].classList.add(`map__pin--active`);
        });
      } else {
        exceptionCounter++;
      }
    }
  };

  const removePins = () => {
    const mapPinsList = mapArea.querySelectorAll(`.map__pin`);
    for (let i = mapPinsList.length - 1; i > 0; i--) {
      if (!mapPinsList[i].classList.contains(EXCEPTION)) {
        mapPinsList[i].remove();
      }
    }
  };

  const renderPins = (data) => {
    const takeLenght = data.length > MAX_PINS ? MAX_PINS : data.length;
    for (let i = 0; i < takeLenght; i++) {
      fragment.appendChild(fillPins(data[i]));
    }
    pinsList.appendChild(fragment);
    renderPinCard(data);
  };

  const saveServerData = (data) => {
    mapArea.classList.remove(`map--faded`);
    serverData = data;
    renderPins(data);
  };

  /* const applyFilter = (filterSelect = `any`) => {
    const filterFields = {
      type: pin.offer.type
    };
    const selectors = mapArea.querySelectorAll(`.map__filter`);
    for (let i = 0; i < selectors.length; i++) {
      alert(selectors[i].value);
    }
    removePins();
    let sameHouseType = serverData;
    if (filterSelect !== `any`) {
      sameHouseType = sameHouseType.filter((pin) => {
        return pin.offer.type === filterSelect;
      });
    }
    renderPins(sameHouseType);
  }; */

  const applyFilter = (filterSelect = `any`) => {
    /* const filterFields = [`type`, `price`, `rooms`, `guests`]; */
    const PriceValue = {
      LOW: `low`,
      MIDDLE: `middle`,
      HIGH: `high`,
    };
    const selectors = mapArea.querySelectorAll(`.map__filter`);
    let sameHouseType = serverData;
    removePins();
    for (let i = 0; i < selectors.length; i++) {
      /* alert(selectors[i].value); */
      if (i === 0) {
        if (selectors[i].value !== `any`) {
          sameHouseType = sameHouseType.filter((pin) => {
            return pin.offer.type === selectors[i].value;
          });
        }
      } else if (i === 1) {
        if (selectors[i].value !== `any`) {
          sameHouseType = sameHouseType.filter((pin) => {
            if (selectors[i].value === PriceValue.LOW) {
              return pin.offer.price < 10000;
            } else if (selectors[i].value === PriceValue.HIGH) {
              return pin.offer.price > 50000;
            }
            return pin.offer.price >= 10000 && pin.offer.price <= 50000;
          });
        }
      } else if (i === 2) {
        if (selectors[i].value !== `any`) {
          sameHouseType = sameHouseType.filter((pin) => {
            return pin.offer.rooms === parseInt(selectors[i].value, 10);
          });
        }
      } else if (i === 3) {
        if (selectors[i].value !== `any`) {
          sameHouseType = sameHouseType.filter((pin) => {
            return pin.offer.guests === parseInt(selectors[i].value, 10);
          });
        }
      }
    }
    const checks = mapArea.querySelectorAll(`.map__checkbox:checked`);
    for (let i = 0; i < checks.length; i++) {
      sameHouseType = sameHouseType.filter((pin) => {
        return pin.offer.features.includes(checks[i].value);
      });
    }
    renderPins(sameHouseType);
  };

  window.map = {
    renderPins,
    removeExistPin,
    removePins,
    saveServerData,
    applyFilter
  };
})();
