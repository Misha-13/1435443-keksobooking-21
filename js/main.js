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
    const x = createValueInRange(MIN_X + X_SHIFT, MAX_X - X_SHIFT);
    const y = createValueInRange(MIN_Y + Y_SHIFT, MAX_Y);
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

const mapPins = createPins();
map.classList.remove(`map--faded`);
for (let i = 0; i < mapPins.length; i++) {
  fragment.appendChild(fillPins(mapPins[i]));
}
pinsList.appendChild(fragment);


const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const cardFragment = document.createDocumentFragment();
const mapArea = document.querySelector(`.map`);
const insertTargetElement = mapArea.querySelector(`.map__filters-container`);

const fillCards = function (card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = card.offer.price + `₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = card.offer.type;
  cardElement.querySelector(`.popup__text--capacity`).textContent = card.offer.rooms + ` комнаты для ` + card.offer.guests + ` гостей`;
  cardElement.querySelector(`.popup__type`).textContent = `Заезд после ` + card.offer.checkin + `, выезд до ` + card.offer.checkout;
  for (let item of cardElement.querySelector(`.popup__features`).children) {
    let existFlag = true;
    for (let i = 0; i < card.offer.features.length; i++) {
      const currentFeature = card.offer.features[i];
      if (cardElement.querySelector(`.popup__features`).querySelector(`.popup__feature--` + currentFeature) === null) {
        existFlag = false;
      }
    }
    console.log(existFlag);
    if (existFlag === false) {
      // item.remove();
      console.log(item);
    }
  }
  console.log(card.offer.features);
  cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
  cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, card.author.avatar);
  return cardElement;
};

cardFragment.appendChild(fillCards(mapPins[0]));
mapArea.insertBefore(cardFragment, insertTargetElement);
