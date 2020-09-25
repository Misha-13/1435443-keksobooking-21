'use strict';
let REALTY_TYPES = ['palace', 'flat', 'house', 'bungalow'];
let TIME_BOUNDS = ['12:00', '13:00', '14:00'];
let FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
let PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
let MIN_X = 10;
let MAX_X = 765;
let MIN_Y = 130;
let MAX_Y = 630;

let generateIndices = function (iteration) {
  let indices = [];
  while (indices.length < iteration) {
    let randomIndex = Math.round(Math.random() * iteration);
    if (!indices.includes(randomIndex) && randomIndex !== 0) {
      indices.push(randomIndex);
    }
  }
  return indices;
};

let generateAvatarsArr = function (iteration = 8) {
  let avatars = [];
  let imgIndices = generateIndices(iteration);
  for (let i = 0; i < iteration; i++) {
    avatars.push('img/avatars/user0' + imgIndices[i] + '.png');
  }
  return avatars;
};

var getRandomElement = function (currentArray) {
  var maxIndex = currentArray.length - 1;
  return Math.round(Math.random() * maxIndex);
};

var getElementByRandomIndex = function (currentArray) {
  var index = getRandomElement(currentArray);
  return currentArray[index];
};

let createTopics = function (elementQuantity = 8) {
  let topics = [];
  let avatars = generateAvatarsArr();
  for (let i = 0; i < elementQuantity; i++) {
    topics.push({
      'author': {
        'avatar': avatars[i]
      },
      'offer': {
        'title': строка, заголовок предложения
        'address': строка, адрес предложения. Для простоты пусть пока представляет собой запись вида '{{location.x}}, {{location.y}}', например, '600, 350'
        'price': число, стоимость
        'type': строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
        'rooms': число, количество комнат
        'guests': число, количество гостей, которое можно разместить
        'checkin': строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        'checkout': строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        'features': массив строк случайной длины из ниже предложенных: 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
        'description': строка с описанием,
        'photos': массив строк случайной длины, содержащий адреса фотографий 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      },
      'location': {
        'x': случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка. 788
        'y': случайное число, координата y метки на карте от 130 до 630.
      }
    });
  }
  return topics;
};
