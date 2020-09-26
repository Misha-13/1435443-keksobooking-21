'use strict';

let REALTY_TYPES = [`palace`, `flat`, `house`, `bungalow`];
let TIME_BOUNDS = [`12:00`, `13:00`, `14:00`];
let FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
let PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
let MIN_X = 10;
let MAX_X = 765;
let MIN_Y = 130;
let MAX_Y = 630;
let MIN_PRICE = 500;
let MAX_PRICE = 500000;
let MIN_ROOMS = 1;
let MAX_ROOMS = 5;
let MIN_GUESTS = 1;
let MAX_GUESTS = 10;
let X_SHIFT = 25;
let Y_SHIFT = 70;
let map = document.querySelector(`.map`);
let pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
let pinsList = document.querySelector(`.map__pins`);
let fragment = document.createDocumentFragment();

let generateIndices = function (iteration, exitValue = 1) {
  let indices = [];
  while (indices.length < iteration) {
    let randomIndex = Math.round(Math.random() * iteration);
    if (!indices.includes(randomIndex) && randomIndex !== 0) {
      indices.push(randomIndex);
    }
    if (Math.random() > exitValue) {
      return indices;
    }
  }
  return indices;
};

let generateAvatarsArr = function (iteration = 8) {
  let avatars = [];
  let imgIndices = generateIndices(iteration);
  for (let i = 0; i < iteration; i++) {
    avatars.push(`img/avatars/user0` + imgIndices[i] + `.png`);
  }
  return avatars;
};

let getRandomElement = function (currentArray) {
  let maxIndex = currentArray.length - 1;
  return Math.round(Math.random() * maxIndex);
};

let getElementByRandomIndex = function (currentArray) {
  let index = getRandomElement(currentArray);
  return currentArray[index];
};

let createValueInRange = function (minBound, maxBound) {
  let coordinate = Math.round(Math.random() * (maxBound - minBound) + minBound);
  return coordinate;
};

let generateRandomLenghtArr = function (currentArray) {
  let randomArr = [];
  let randomArrLength = getRandomElement(currentArray);
  for (let i = 0; i <= randomArrLength; i++) {
    randomArr.push(currentArray[i]);
  }
  return randomArr;
};

let createPins = function (elementQuantity = 8) {
  let pins = [];
  let avatars = generateAvatarsArr();
  for (let i = 0; i < elementQuantity; i++) {
    let x = createValueInRange(MIN_X, MAX_X);
    let y = createValueInRange(MIN_Y, MAX_Y);
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

let fillPins = function (pin) {
  let pinElement = pinTemplate.cloneNode(true);
  let img = pinElement.querySelector(`img`);
  let pinX = pin.location.x - X_SHIFT;
  let pinY = pin.location.y - Y_SHIFT;
  pinElement.setAttribute(`style`, `left: ` + pinX + `px; top: ` + pinY + `px;`);
  img.setAttribute(`src`, pin.author.avatar);
  img.setAttribute(`alt`, pin.offer.title);
  return pinElement;
};

let mapPins = createPins();
map.classList.remove(`map--faded`);
for (let i = 0; i < mapPins.length; i++) {
  fragment.appendChild(fillPins(mapPins[i]));
}
pinsList.appendChild(fragment);
