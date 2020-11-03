'use strict';
(function () {
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
  const disabledPinCordX = X_DISABLED_PIN_POSITION + HALF_DISABLED_PIN_SIZE;
  const disabledPinCordY = Y_DISABLED_PIN_POSITION + HALF_DISABLED_PIN_SIZE;
  const moveablePinShiftY = HALF_DISABLED_PIN_SIZE + HALF_DISABLED_PIN_SIZE + MOVEABLE_PIN_TALE_SIZE;
  const capacitySelector = form.querySelector(`#capacity`);
  const roomsSelector = form.querySelector(`#room_number`);
  const TypeMinCostMatch = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALOW: 0
  };

  const getDisabledAddress = function () {
    addressInput.value = Math.round(disabledPinCordX) + `, ` + Math.round(disabledPinCordY);
  };

  const switchDisabledValue = function (currentCollection) {
    for (let i = 0; i < currentCollection.length; i++) {
      currentCollection[i].toggleAttribute(`disabled`);
    }
  };

  const getAddress = function (x, y) {
    const totalX = x + HALF_DISABLED_PIN_SIZE;
    const totalY = y + moveablePinShiftY;
    addressInput.value = Math.round(totalX) + `, ` + Math.round(totalY);
  };

  const activateElements = function () {
    switchDisabledValue(formFieldsets);
  };

  const onRealtySelectorCheck = function () {
    price.setAttribute(`min`, TypeMinCostMatch[realtyType.value.toUpperCase()]);
    price.setAttribute(`placeholder`, TypeMinCostMatch[realtyType.value.toUpperCase()]);
  };

  const setTimeEvent = function () {
    timein.addEventListener(`input`, function () {
      timeout.value = timein.value;
    });
    timeout.addEventListener(`input`, function () {
      timein.value = timeout.value;
    });
  };

  const onFormAfterReset = function () {
    onRealtySelectorCheck();
    mainPin.style.left = X_DISABLED_PIN_POSITION + `px`;
    mainPin.style.top = Y_DISABLED_PIN_POSITION + `px`;
    form.classList.add(`ad-form--disabled`);
    document.querySelector(`.map`).classList.add(`map--faded`);
    window.map.removeExistPin();
    window.map.removePins();
    blockPage();
  };

  const setValidation = function () {
    realtyType.addEventListener(`input`, onRealtySelectorCheck);
    setTimeEvent();
  };

  const activateForm = function () {
    form.classList.remove(`ad-form--disabled`);
    activateElements();
    window.map.renderPins();
    setValidation();
  };

  const onPinKeydown = function (evt) {
    window.utility.isEnterEvent(evt, activateForm);
  };

  const onPinMousedown = function (evt) {
    window.utility.isMainMouseEvent(evt, activateForm);
  };

  const activatePage = function () {
    mainPin.addEventListener(`mousedown`, onPinMousedown);
    mainPin.addEventListener(`keydown`, onPinKeydown);
  };

  const onActivatedEventsRemove = function () {
    mainPin.removeEventListener(`mousedown`, onPinMousedown);
    mainPin.removeEventListener(`keydown`, onPinKeydown);
    mainPin.removeEventListener(`mousedown`, onPinSecondMousedown);
  };

  const onPinSecondKeydown = function (evt) {
    window.utility.isEnterEvent(evt, onActivatedEventsRemove);
  };

  const onPinSecondMousedown = function (evt) {
    window.utility.isMainMouseEvent(evt, onActivatedEventsRemove);
  };

  const onSelectorsCheck = function () {
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

  form.addEventListener(`submit`, function (evt) {
    if (!capacitySelector.reportValidity()) {
      evt.preventDefault();
    } else {
      window.upload.uploadData(new FormData(form), function () {
        form.reset();
      });
      evt.preventDefault();
    }
  });

  form.addEventListener(`reset`, function () {
    setTimeout(onFormAfterReset, 100);
  });

  const blockPage = function () {
    getDisabledAddress();
    switchDisabledValue(formFieldsets);
    activatePage();
    mainPin.addEventListener(`mousedown`, onPinSecondMousedown);
    mainPin.addEventListener(`keydown`, onPinSecondKeydown);
    onRealtySelectorCheck();
  };

  window.page = {
    getAddress,
    blockPage
  };
})();
