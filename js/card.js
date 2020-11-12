'use strict';

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const TypeRusMatch = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const fillPhotos = (template, photo) => {
  const imgElement = template.cloneNode(true);
  imgElement.setAttribute(`src`, photo);
  return imgElement;
};

const fillPhotosBlock = (imgArray) => {
  const imgTemplate = document.cardElement.querySelector(`.popup__photos`).querySelector(`img`);
  if (imgArray.length > 0) {
    const imgList = document.cardElement.querySelector(`.popup__photos`);
    const imgFragment = document.createDocumentFragment();
    document.cardElement.querySelector(`.popup__photos`).querySelector(`img`).setAttribute(`src`, imgArray[0]);
    for (let i = 1; i < imgArray.length; i++) {
      imgFragment.appendChild(fillPhotos(imgTemplate, imgArray[i]));
    }
    imgList.appendChild(imgFragment);
  } else {
    document.cardElement.querySelector(`.popup__photos`).remove();
  }
};

const setCardTitle = (objectKey) => {
  const cardTitle = document.cardElement.querySelector(`.popup__title`);
  if (objectKey) {
    cardTitle.textContent = objectKey;
  } else {
    cardTitle.remove();
  }
};

const setCardAddress = (objectKey) => {
  const cardAddress = document.cardElement.querySelector(`.popup__text--address`);
  if (objectKey) {
    cardAddress.textContent = objectKey;
  } else {
    cardAddress.remove();
  }
};

const setCardPrice = (objectKey) => {
  const cardPrice = document.cardElement.querySelector(`.popup__text--price`);
  if (objectKey) {
    cardPrice.textContent = objectKey + `₽/ночь`;
  } else {
    cardPrice.remove();
  }
};

const setCardType = (objectKey) => {
  const cardType = document.cardElement.querySelector(`.popup__type`);
  if (objectKey) {
    cardType.textContent = TypeRusMatch[objectKey];
  } else {
    cardType.remove();
  }
};

const setCardCapacity = (objectKeyRooms, objectKeyGuests) => {
  const cardCapacity = document.cardElement.querySelector(`.popup__text--capacity`);
  if (objectKeyRooms || objectKeyGuests) {
    cardCapacity.textContent = objectKeyRooms + ` комнаты для ` + objectKeyGuests + ` гостей`;
  } else {
    cardCapacity.remove();
  }
};

const setCardTime = (objectKeyTimeIn, objectKeyTimeOut) => {
  const cardTime = document.cardElement.querySelector(`.popup__text--time`);
  if (objectKeyTimeIn || objectKeyTimeOut) {
    cardTime.textContent = `Заезд после ` + objectKeyTimeIn + `, выезд до ` + objectKeyTimeOut;
  } else {
    cardTime.remove();
  }
};

const setCardDescription = (objectKey) => {
  const cardDescription = document.cardElement.querySelector(`.popup__description`);
  if (objectKey) {
    cardDescription.textContent = objectKey;
  } else {
    cardDescription.remove();
  }
};

const fillTextBlock = (currentObject) => {

  setCardTitle(currentObject.title);
  setCardAddress(currentObject.address);
  setCardPrice(currentObject.price);
  setCardType(currentObject.type);
  setCardCapacity(currentObject.rooms, currentObject.guests);
  setCardTime(currentObject.checkin, currentObject.checkout);
  setCardDescription(currentObject.description);

  /* document.cardElement.querySelector(`.popup__title`).textContent = currentObject.title; */
  /* document.cardElement.querySelector(`.popup__text--address`).textContent = currentObject.address; */
  /* document.cardElement.querySelector(`.popup__text--price`).textContent = currentObject.price + `₽/ночь`; */
  /* document.cardElement.querySelector(`.popup__type`).textContent = TypeRusMatch[currentObject.type]; */
  /* document.cardElement.querySelector(`.popup__text--capacity`).textContent = currentObject.rooms + ` комнаты для ` + currentObject.guests + ` гостей`; */
  /* document.cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + currentObject.checkin + `, выезд до ` + currentObject.checkout; */
  /* document.cardElement.querySelector(`.popup__description`).textContent = currentObject.description; */
};

const deleteFeatures = (currentArray) => {
  const featuresBlock = document.cardElement.querySelector(`.popup__features`);
  const childrenElements = document.cardElement.querySelector(`.popup__features`).children;
  const childrenArray = Array.from(childrenElements);
  if (currentArray.length > 0) {
    childrenArray.forEach((element) => {
      let existFlag = false;
      for (let j = 0; j < currentArray.length; j++) {
        if (element.classList.contains(`popup__feature--` + currentArray[j])) {
          existFlag = true;
          break;
        }
      }
      if (!existFlag) {
        element.remove();
      }
    });
  } else {
    featuresBlock.remove();
  }
};

const fillCards = (card) => {
  document.cardElement = cardTemplate.cloneNode(true);
  document.cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, card.author.avatar);
  fillTextBlock(card.offer);
  deleteFeatures(card.offer.features);
  fillPhotosBlock(card.offer.photos);
  return document.cardElement;
};

window.card = {
  fillCards
};
