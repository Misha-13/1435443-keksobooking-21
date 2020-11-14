'use strict';

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const TypeRusMatch = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const fillPhotos = (template, photo) => {
  const img = template.cloneNode(true);
  img.setAttribute(`src`, photo);
  return img;
};

const fillPhotosBlock = (photos) => {
  const imgTemplate = document.card.querySelector(`.popup__photos`).querySelector(`img`);
  if (photos && photos.length > 0) {
    const imgList = document.card.querySelector(`.popup__photos`);
    const imgFragment = document.createDocumentFragment();
    document.card.querySelector(`.popup__photos`).querySelector(`img`).setAttribute(`src`, photos[0]);
    for (let i = 1; i < photos.length; i++) {
      imgFragment.appendChild(fillPhotos(imgTemplate, photos[i]));
    }
    imgList.appendChild(imgFragment);
  } else {
    document.card.querySelector(`.popup__photos`).remove();
  }
};

const setSingleBlock = (objectKey, tag, value) => {
  const card = document.card.querySelector(tag);
  if (objectKey) {
    card.textContent = value;
  } else {
    card.remove();
  }
};

const setFullFields = (element, fistValue, secondValue) => {
  element.textContent = fistValue + secondValue;
};

const setPartField = (element, firstKey, fistValue, secondValue) => {
  element.textContent = firstKey ? fistValue : secondValue;
};

const setMultipleBlocks = (firstObjectKey, firstValue, secondObjectKey, secondValue, tag) => {
  const card = document.card.querySelector(tag);
  if (firstObjectKey && secondObjectKey) {
    return setFullFields(card, firstValue, secondValue);
  }
  if (firstObjectKey || secondObjectKey) {
    return setPartField(card, firstObjectKey, firstValue, secondValue);
  }
  return card.remove();
};

const fillTextBlock = ({title, address, price, type, rooms, guests, checkin, checkout, description}) => {
  setSingleBlock(title, `.popup__title`, title);
  setSingleBlock(address, `.popup__text--address`, address);
  setSingleBlock(price, `.popup__text--price`, `${price} ₽/ночь`);
  setSingleBlock(type, `.popup__type`, TypeRusMatch[type]);
  setMultipleBlocks(rooms, `${rooms} комнаты(-а) `, guests, ` для ${guests}  гостей(-я)`, `.popup__text--capacity`);
  setMultipleBlocks(checkin, `Заезд после ${checkin}`, checkout, ` выезд до ${checkout}`, `.popup__text--time`);
  setSingleBlock(description, `.popup__description`, description);
};

const deleteFeatures = (features) => {
  const featuresBlock = document.card.querySelector(`.popup__features`);
  if (features && features.length > 0) {
    const children = document.card.querySelector(`.popup__features`).children;
    const childrenArray = Array.from(children);
    childrenArray.forEach((element) => {
      let existFlag = false;
      for (let j = 0; j < features.length; j++) {
        if (element.classList.contains(`popup__feature--` + features[j])) {
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
  document.card = cardTemplate.cloneNode(true);
  document.card.querySelector(`.popup__avatar`).setAttribute(`src`, card.author.avatar);
  fillTextBlock(card.offer);
  deleteFeatures(card.offer.features);
  fillPhotosBlock(card.offer.photos);
  return document.card;
};

window.card = {
  fillCards
};
