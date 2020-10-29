'use strict';

(function () {
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

  window.data = {
    createPins
  };
})();
