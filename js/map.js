'use strict';

const X_SHIFT = 25;
const Y_SHIFT = 70;
const EXCEPTION = `map__pin--main`;
const MAX_PINS = 5;
const cardFragment = document.createDocumentFragment();
const map = document.querySelector(`.map`);
const target = map.querySelector(`.map__filters-container`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinsList = document.querySelector(`.map__pins`);
const fragment = document.createDocumentFragment();
const selectors = Array.from(map.querySelectorAll(`.map__filter`));
let serverData = [];
let filteredData;
const FilterSelectorsName = {
  TYPE: `housing-type`,
  PRICE: `housing-price`,
  ROOMS: `housing-rooms`,
  GUESTS: `housing-guests`
};
const PriceValue = {
  LOW: `low`,
  MIDDLE: `middle`,
  HIGH: `high`,
};
const PriceBound = {
  LOW: 10000,
  HIGH: 50000
};

const fillPins = (pinObject) => {
  const pin = pinTemplate.cloneNode(true);
  const img = pin.querySelector(`img`);
  const pinX = pinObject.location.x - X_SHIFT;
  const pinY = pinObject.location.y - Y_SHIFT;
  pin.setAttribute(`style`, `left: ` + pinX + `px; top: ` + pinY + `px;`);
  img.setAttribute(`src`, pinObject.author.avatar);
  img.setAttribute(`alt`, pinObject.offer.title);
  return pin;
};

const removeExistPin = () => {
  const mapArea = map.querySelector(`.map__card`);
  if (mapArea) {
    const activatedPin = map.querySelector(`.map__pin--active`);
    mapArea.remove();
    activatedPin.classList.remove(`map__pin--active`);
  }
};

const onInfoPinKeydown = (evt) => {
  window.utility.setEscapeEvent(evt, () => {
    removeExistPin();
    document.removeEventListener(`keydown`, onInfoPinKeydown);
  });
};

const setExitButtonEvent = () => {
  const mapArea = map.querySelector(`.map__card`);
  const closePopupButton = mapArea.querySelector(`.popup__close`);
  closePopupButton.addEventListener(`click`, () => {
    removeExistPin();
  });
};

const showPinsCard = (pin) => {
  removeExistPin();
  cardFragment.appendChild(window.card.fillCards(pin));
  map.insertBefore(cardFragment, target);
  setExitButtonEvent();
  document.addEventListener(`keydown`, onInfoPinKeydown);
};

const renderPinCard = (pinsArray) => {
  const mapPinsList = Array.from(map.querySelectorAll(`.map__pin`));
  let exceptionCounter = 0;
  mapPinsList.forEach((element, index) => {
    if (!element.classList.contains(EXCEPTION)) {
      const currentPin = pinsArray[index - exceptionCounter];
      element.addEventListener(`click`, () => {
        showPinsCard(currentPin);
        element.classList.add(`map__pin--active`);
      });
    } else {
      exceptionCounter++;
    }
  });
};

const removePins = () => {
  const mapPinsList = Array.from(map.querySelectorAll(`.map__pin`));
  mapPinsList.forEach((element) => {
    if (!element.classList.contains(EXCEPTION)) {
      element.remove();
    }
  });
};

const renderPins = (data) => {
  const takeLenght = data.length > MAX_PINS ? MAX_PINS : data.length;
  for (let i = 0; i < takeLenght; i++) {
    if (data[i].offer) {
      fragment.appendChild(fillPins(data[i]));
    }
  }
  pinsList.appendChild(fragment);
  renderPinCard(data);
};

const saveServerData = (data) => {
  map.classList.remove(`map--faded`);
  serverData = data;
  renderPins(data);
};

const setPriceFilter = (value) => {
  if (value !== `any`) {
    filteredData = filteredData.filter((pin) => {
      if (value === PriceValue.LOW) {
        return pin.offer.price < PriceBound.LOW;
      } else if (value === PriceValue.HIGH) {
        return pin.offer.price > PriceBound.HIGH;
      }
      return pin.offer.price >= PriceBound.LOW && pin.offer.price <= PriceBound.HIGH;
    });
  }
};

const setCommonFilter = (value, key) => {
  if (value !== `any`) {
    filteredData = filteredData.filter((pin) => {
      const pinValue = pin.offer[key];
      const filterValue = isNaN(value) ? value : +value;
      return pinValue === filterValue;
    });
  }
};

const setFeaturesFilter = () => {
  const checks = Array.from(map.querySelectorAll(`.map__checkbox:checked`));
  checks.forEach((element) => {
    filteredData = filteredData.filter((pin) => {
      return pin.offer.features.includes(element.value);
    });
  });
};

const applyFilter = () => {
  filteredData = serverData;
  removeExistPin();
  removePins();
  selectors.forEach((element) => {
    const {name, value} = element;
    switch (name) {
      case FilterSelectorsName.TYPE:
        setCommonFilter(value, `type`);
        break;
      case FilterSelectorsName.PRICE:
        setPriceFilter(value);
        break;
      case FilterSelectorsName.ROOMS:
        setCommonFilter(value, `rooms`);
        break;
      case FilterSelectorsName.GUESTS:
        setCommonFilter(value, `guests`);
        break;
    }
  });
  setFeaturesFilter();
  renderPins(filteredData);
};

window.map = {
  renderPins,
  removeExistPin,
  removePins,
  saveServerData,
  applyFilter
};
