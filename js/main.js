'use strict';

const REALTY_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TIME_BOUNDS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MIN_X = 0;
const MAX_X = 1200;
const MIN_Y = 130;
const MAX_Y = 630;
const MIN_PRICE = 500;
const MAX_PRICE = 500000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const X_SHIFT = 25;
const Y_SHIFT = 70;
const X_DISABLED_PIN_POSITION = 575;
const Y_DISABLED_PIN_POSITION = 375;
const HALF_DISABLED_PIN_SIZE = 32.5;
const MOVEABLE_PIN_TALE_SIZE = 22;
const MAIN_MOUSE_BUTTON_CODE = 0;
const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinsList = document.querySelector(`.map__pins`);
const fragment = document.createDocumentFragment();

const generateIndices = function (iteration, exitValue = 1) {
  let indices = [];
  while (indices.length < iteration) {
    const randomIndex = Math.round(Math.random() * iteration);
    if (!indices.includes(randomIndex) && randomIndex !== 0) {
      indices.push(randomIndex);
    }
    if (Math.random() > exitValue) {
      return indices;
    }
  }
  return indices;
};

const generateAvatarsArr = function (iteration = 8) {
  let avatars = [];
  const imgIndices = generateIndices(iteration);
  for (let i = 0; i < iteration; i++) {
    avatars.push(`img/avatars/user0` + imgIndices[i] + `.png`);
  }
  return avatars;
};

const getRandomElement = function (currentArray) {
  const maxIndex = currentArray.length - 1;
  return Math.round(Math.random() * maxIndex);
};

const getElementByRandomIndex = function (currentArray) {
  const index = getRandomElement(currentArray);
  return currentArray[index];
};

const createValueInRange = function (minBound, maxBound) {
  const coordinate = Math.round(Math.random() * (maxBound - minBound) + minBound);
  return coordinate;
};

const generateRandomLenghtArr = function (currentArray) {
  let randomArr = [];
  const randomArrLength = getRandomElement(currentArray);
  for (let i = 0; i <= randomArrLength; i++) {
    randomArr.push(currentArray[i]);
  }
  return randomArr;
};

const createPins = function (elementQuantity = 8) {
  let pins = [];
  const avatars = generateAvatarsArr();
  for (let i = 0; i < elementQuantity; i++) {
    const x = createValueInRange(MIN_X, MAX_X);
    const y = createValueInRange(MIN_Y, MAX_Y);
    pins.push({
      'author': {
        'avatar': avatars[i]
      },
      'offer': {
        'title': `Тестовая строка заголовка ` + i,
        'address': x + `, ` + y,
        'price': createValueInRange(MIN_PRICE, MAX_PRICE),
        'type': getElementByRandomIndex(REALTY_TYPES),
        'rooms': createValueInRange(MIN_ROOMS, MAX_ROOMS),
        'guests': createValueInRange(MIN_GUESTS, MAX_GUESTS),
        'checkin': getElementByRandomIndex(TIME_BOUNDS),
        'checkout': getElementByRandomIndex(TIME_BOUNDS),
        'features': generateRandomLenghtArr(FEATURES),
        'description': `Тестовое описание ` + i,
        'photos': generateRandomLenghtArr(PHOTOS)
      },
      'location': {
        'x': x,
        'y': y,
      }
    });
  }
  return pins;
};

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


const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const cardFragment = document.createDocumentFragment();
const mapArea = document.querySelector(`.map`);
const insertTargetElement = mapArea.querySelector(`.map__filters-container`);

const delNotUseFeatures = function (currentArray) {
  const childrenElements = document.cardElement.querySelector(`.popup__features`).children;
  for (let i = childrenElements.length - 1; i >= 0; i--) {
    const childElement = childrenElements[i];
    let existFlag = false;
    for (let j = 0; j < currentArray.length; j++) {
      if (childElement.classList.contains(`popup__feature--` + currentArray[j])) {
        existFlag = true;
      }
    }
    if (existFlag === false) {
      childElement.remove();
    }
  }
};

const fillPhotos = function (template, photo) {
  const imgElement = template.cloneNode(true);
  imgElement.setAttribute(`src`, photo);
  return imgElement;
};

const fillPhotosBlock = function (imgArray) {
  const imgTemplate = document.cardElement.querySelector(`.popup__photos`).querySelector(`img`);
  const imgList = document.cardElement.querySelector(`.popup__photos`);
  const imgFragment = document.createDocumentFragment();
  document.cardElement.querySelector(`.popup__photos`).querySelector(`img`).setAttribute(`src`, imgArray[0]);
  for (let i = 1; i < imgArray.length; i++) {
    imgFragment.appendChild(fillPhotos(imgTemplate, imgArray[i]));
  }
  imgList.appendChild(imgFragment);
};

const fillTextBlock = function (currentObject) {
  const TypeRusMatch = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  document.cardElement.querySelector(`.popup__title`).textContent = currentObject.title;
  document.cardElement.querySelector(`.popup__text--address`).textContent = currentObject.address;
  document.cardElement.querySelector(`.popup__text--price`).textContent = currentObject.price + `₽/ночь`;
  document.cardElement.querySelector(`.popup__type`).textContent = TypeRusMatch[currentObject.type];
  document.cardElement.querySelector(`.popup__text--capacity`).textContent = currentObject.rooms + ` комнаты для ` + currentObject.guests + ` гостей`;
  document.cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + currentObject.checkin + `, выезд до ` + currentObject.checkout;
  document.cardElement.querySelector(`.popup__description`).textContent = currentObject.description;
};

const fillCards = function (card) {
  document.cardElement = cardTemplate.cloneNode(true);
  document.cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, card.author.avatar);
  fillTextBlock(card.offer);
  delNotUseFeatures(card.offer.features);
  fillPhotosBlock(card.offer.photos);
  return document.cardElement;
};

const form = document.querySelector(`.ad-form`);
const formFieldsets = form.querySelectorAll(`fieldset`);
const addressInput = form.querySelector(`#address`);
const capacitySelector = form.querySelector(`#capacity`);
const roomsSelector = form.querySelector(`#room_number`);
const mainPin = map.querySelector(`.map__pin--main`);
const disabledPinCordX = X_DISABLED_PIN_POSITION + HALF_DISABLED_PIN_SIZE;
const disabledPinCordY = Y_DISABLED_PIN_POSITION + HALF_DISABLED_PIN_SIZE;
const moveablePinShiftY = HALF_DISABLED_PIN_SIZE + HALF_DISABLED_PIN_SIZE + MOVEABLE_PIN_TALE_SIZE;
const realtyType = form.querySelector(`#type`);
const price = form.querySelector(`#price`);
const timein = form.querySelector(`#timein`);
const timeout = form.querySelector(`#timeout`);
const TypeMinCostMatch = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0
};
let selectingPin = [];

const setTimeEvent = function () {
  timein.addEventListener(`input`, function () {
    timeout.value = timein.value;
  });
  timeout.addEventListener(`input`, function () {
    timein.value = timeout.value;
  });
};

const onRealtySelectorCheck = function () {
  price.setAttribute(`min`, TypeMinCostMatch[realtyType.value]);
  price.setAttribute(`placeholder`, TypeMinCostMatch[realtyType.value]);
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
  onSelectorsCheck();
  if (!capacitySelector.reportValidity()) {
    evt.preventDefault();
  }
});

const switchDisabledValue = function (currentCollection) {
  for (let i = 0; i < currentCollection.length; i++) {
    currentCollection[i].toggleAttribute(`disabled`);
  }
};

const getDisabledAddress = function () {
  addressInput.value = Math.round(disabledPinCordX) + `, ` + Math.round(disabledPinCordY);
};

const getAddress = function (x, y) {
  const totalX = x + HALF_DISABLED_PIN_SIZE;
  const totalY = y + moveablePinShiftY;
  addressInput.value = Math.round(totalX) + `, ` + Math.round(totalY);
};

const onInfoPinKeydown = function (evt) {
  if (evt.key === `Escape`) {
    document.mapAreaElement.remove();
    document.removeEventListener(`keydown`, onInfoPinKeydown);
  }
};

const removeExistPin = function () {
  document.mapAreaElement = mapArea.querySelector(`.map__card`);
  if (document.mapAreaElement) {
    document.mapAreaElement.remove();
  }
};

const onExitButtonClick = function () {
  document.mapAreaElement = mapArea.querySelector(`.map__card`);
  const closePopupButton = document.mapAreaElement.querySelector(`.popup__close`);
  closePopupButton.addEventListener(`click`, function () {
    document.mapAreaElement.remove();
  });
};

const setPinEvent = function (currentArr, exception) {
  let exceptionCounter = 0;
  for (let i = 0; i < currentArr.length; i++) {
    if (!currentArr[i].classList.contains(exception)) {
      currentArr[i].addEventListener(`click`, function () {
        removeExistPin();
        cardFragment.appendChild(fillCards(document.mapPins[i - exceptionCounter]));
        mapArea.insertBefore(cardFragment, insertTargetElement);
        onExitButtonClick();
        document.addEventListener(`keydown`, onInfoPinKeydown);
      });
    } else {
      exceptionCounter++;
    }
  }
};

const onFormAfterReset = function () {
  onRealtySelectorCheck();
  getAddress(X_DISABLED_PIN_POSITION, Y_DISABLED_PIN_POSITION);
};

const onFormElementsActivate = function () {
  form.classList.remove(`ad-form--disabled`);
  getAddress(X_DISABLED_PIN_POSITION, Y_DISABLED_PIN_POSITION);
  switchDisabledValue(formFieldsets);
  document.mapPins = createPins();
  map.classList.remove(`map--faded`);
  for (let i = 0; i < document.mapPins.length; i++) {
    fragment.appendChild(fillPins(document.mapPins[i]));
  }
  pinsList.appendChild(fragment);
  selectingPin = map.querySelectorAll(`.map__pin`);
  setPinEvent(selectingPin, `map__pin--main`);
  realtyType.addEventListener(`input`, onRealtySelectorCheck);
  setTimeEvent();
  form.addEventListener(`reset`, function () {
    setTimeout(onFormAfterReset, 100);
  });
};

const onPinKeydown = function (evt) {
  if (evt.key === `Enter`) {
    onFormElementsActivate();
  }
};

const onPinMousedown = function (evt) {
  if (evt.button === MAIN_MOUSE_BUTTON_CODE) {
    onFormElementsActivate();
  }
};

const onPageActivate = function () {
  mainPin.addEventListener(`mousedown`, onPinMousedown);
  mainPin.addEventListener(`keydown`, onPinKeydown);
};

const onActivatedEventsRemove = function () {
  mainPin.removeEventListener(`mousedown`, onPinMousedown);
  mainPin.removeEventListener(`keydown`, onPinKeydown);
};

const onPinSecondKeydown = function (evt) {
  if (evt.key === `Enter`) {
    onActivatedEventsRemove();
  }
};

const onPinSecondMousedown = function (evt) {
  if (evt.button === MAIN_MOUSE_BUTTON_CODE) {
    onActivatedEventsRemove();
  }
};

const blockPage = function () {
  getDisabledAddress();
  switchDisabledValue(formFieldsets);
  onPageActivate();
  mainPin.addEventListener(`mousedown`, onPinSecondMousedown);
  mainPin.addEventListener(`keydown`, onPinSecondKeydown);
  onRealtySelectorCheck();
};

blockPage();

