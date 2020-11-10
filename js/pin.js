'use strict';

const MIN_X = 0;
const MAX_X = 1200;
const MIN_Y = 130;
const MAX_Y = 630;
const HALF_PIN_SIZE = 32.5;
const PIN_TOP_BOTTOM_CORRECT = 65;
const mainPin = document.querySelector(`.map__pin--main`);

const checkXBound = (x) => {
  const maxX = MAX_X - HALF_PIN_SIZE;
  const minX = MIN_X - HALF_PIN_SIZE;
  if (x > maxX) {
    return maxX;
  }
  if (x < minX) {
    return minX;
  }
  return x;
};

const checkYBound = (y) => {
  const minY = MIN_Y - PIN_TOP_BOTTOM_CORRECT;
  if (y > MAX_Y) {
    return MAX_Y;
  }
  if (y < minY) {
    return minY;
  }
  return y;
};

const movePin = () => {
  mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    let startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      const shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      };

      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newX = mainPin.offsetLeft - shift.x;
      const newY = mainPin.offsetTop - shift.y;

      mainPin.style.left = checkXBound(newX) + `px`;
      mainPin.style.top = checkYBound(newY) + `px`;
      window.page.getAddress(mainPin.offsetLeft, mainPin.offsetTop);
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
};

window.pin = {
  movePin
};
