'use strict';

const X_DISABLED_PIN_POSITION = 570;
const Y_DISABLED_PIN_POSITION = 375;
const HALF_DISABLED_PIN_SIZE = 32.5;
const MOVEABLE_PIN_TALE_SIZE = 22;
const form = document.querySelector(`.ad-form`);
const formFieldsets = form.querySelectorAll(`fieldset`);
const addressInput = form.querySelector(`#address`);
const mainPin = document.querySelector(`.map__pin--main`);
const realtyType = form.querySelector(`#type`);
const price = form.querySelector(`#price`);
const timein = form.querySelector(`#timein`);
const timeout = form.querySelector(`#timeout`);
const submitButton = form.querySelector(`.ad-form__submit`);
const disabledPinCordX = X_DISABLED_PIN_POSITION + HALF_DISABLED_PIN_SIZE;
const disabledPinCordY = Y_DISABLED_PIN_POSITION + HALF_DISABLED_PIN_SIZE;
const moveablePinShiftY = HALF_DISABLED_PIN_SIZE + HALF_DISABLED_PIN_SIZE + MOVEABLE_PIN_TALE_SIZE;
const capacitySelector = form.querySelector(`#capacity`);
const roomsSelector = form.querySelector(`#room_number`);
const filter = document.querySelector(`.map__filters`);
const filterFields = filter.children;
const realtyChooser = document.querySelector(`.ad-form__input`);
const realtyPreview = document.querySelector(`.ad-form__photo`);
const avatarChooser = document.querySelector(`.ad-form-header__input`);
const avatarPreview = document.querySelector(`.ad-form-header__preview`);
const TypeMinCostMatch = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALOW: 0
};

window.preview.showPreview(avatarChooser, avatarPreview);
window.preview.showPreview(realtyChooser, realtyPreview);

const onSelectorsChanged = () => {
  window.debounce.setDebounce(window.map.applyFilter);
};

filter.addEventListener(`change`, onSelectorsChanged);

const getDisabledAddress = () => {
  addressInput.value = Math.round(disabledPinCordX) + `, ` + Math.round(disabledPinCordY);
};

const switchDisabledValue = (currentCollection) => {
  for (let i = 0; i < currentCollection.length; i++) {
    currentCollection[i].toggleAttribute(`disabled`);
  }
};

const getAddress = (x, y) => {
  const totalX = x + HALF_DISABLED_PIN_SIZE;
  const totalY = y + moveablePinShiftY;
  addressInput.value = Math.round(totalX) + `, ` + Math.round(totalY);
};

const activateElements = () => {
  switchDisabledValue(formFieldsets);
  switchDisabledValue(filterFields);
};

const onRealtySelectorCheck = () => {
  price.setAttribute(`min`, TypeMinCostMatch[realtyType.value.toUpperCase()]);
  price.setAttribute(`placeholder`, TypeMinCostMatch[realtyType.value.toUpperCase()]);
};

const setTimeEvent = () => {
  timein.addEventListener(`input`, () => {
    timeout.value = timein.value;
  });
  timeout.addEventListener(`input`, () => {
    timein.value = timeout.value;
  });
};

const onFormAfterReset = () => {
  mainPin.style.left = X_DISABLED_PIN_POSITION + `px`;
  mainPin.style.top = Y_DISABLED_PIN_POSITION + `px`;
  form.classList.add(`ad-form--disabled`);
  document.querySelector(`.map`).classList.add(`map--faded`);
  window.map.removeExistPin();
  window.map.removePins();
  window.preview.removePreview(avatarPreview);
  window.preview.removePreview(realtyPreview);
  filter.reset();
  blockPage();
};

const setValidation = () => {
  realtyType.addEventListener(`input`, onRealtySelectorCheck);
  setTimeEvent();
};

const activateForm = () => {
  form.classList.remove(`ad-form--disabled`);
  getAddress(X_DISABLED_PIN_POSITION, Y_DISABLED_PIN_POSITION);
  activateElements();
  window.load.getData(window.map.saveServerData, window.error.showError);
  setValidation();
};

const onPinKeydown = (evt) => {
  window.utility.isEnterEvent(evt, activateForm);
};

const onPinMousedown = (evt) => {
  window.utility.isMainMouseEvent(evt, activateForm);
};

const activatePage = () => {
  mainPin.addEventListener(`mousedown`, onPinMousedown);
  mainPin.addEventListener(`keydown`, onPinKeydown);
};

const onActivatedEventsRemove = () => {
  mainPin.removeEventListener(`mousedown`, onPinMousedown);
  mainPin.removeEventListener(`keydown`, onPinKeydown);
  mainPin.removeEventListener(`mousedown`, onPinSecondMousedown);
};

const onPinSecondKeydown = (evt) => {
  window.utility.isEnterEvent(evt, onActivatedEventsRemove);
};

const onPinSecondMousedown = (evt) => {
  window.utility.isMainMouseEvent(evt, onActivatedEventsRemove);
};

const onSelectorsCheck = () => {
  const roomNum = +roomsSelector.value;
  const guestNum = +capacitySelector.value;
  const isValidChoice = roomNum === 100 ? (guestNum === 0) : (roomNum > guestNum && guestNum !== 0 || roomNum === guestNum);
  if (isValidChoice) {
    return capacitySelector.setCustomValidity(``);
  }
  return capacitySelector.setCustomValidity(`Число гостей не соответсвует числу комнат!`);
};

capacitySelector.addEventListener(`input`, onSelectorsCheck);

roomsSelector.addEventListener(`input`, onSelectorsCheck);

form.addEventListener(`submit`, (evt) => {
  onSelectorsCheck();
  if (capacitySelector.reportValidity()) {
    window.upload.uploadData(new FormData(form), () => {
      submitButton.focus();
      form.reset();
      submitButton.blur();
    });
  }
  evt.preventDefault();
});

form.addEventListener(`reset`, () => {
  setTimeout(onFormAfterReset, 100);
});

const blockPage = () => {
  getDisabledAddress();
  switchDisabledValue(formFieldsets);
  switchDisabledValue(filterFields);
  activatePage();
  mainPin.addEventListener(`mousedown`, onPinSecondMousedown);
  mainPin.addEventListener(`keydown`, onPinSecondKeydown);
  onRealtySelectorCheck();
};

window.page = {
  getAddress,
  blockPage
};
