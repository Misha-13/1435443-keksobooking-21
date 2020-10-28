'use strict';

(function () {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

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

  const fillCards = function (card) {
    document.cardElement = cardTemplate.cloneNode(true);
    document.cardElement.querySelector(`.popup__avatar`).setAttribute(`src`, card.author.avatar);
    fillTextBlock(card.offer);
    delNotUseFeatures(card.offer.features);
    fillPhotosBlock(card.offer.photos);
    return document.cardElement;
  };

  window.card = {
    fillCards
  };
})();
