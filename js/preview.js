'use strict';

const AVATAR_SRC = `img/muffin-grey.svg`;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const showPreview = (photoInput, photoOutput) => {
  photoInput.addEventListener(`change`, () => {
    const file = photoInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((element) => {
      return fileName.endsWith(element);
    });

    if (matches) {
      const reader = new FileReader();
      let imgPreview = photoOutput.querySelector(`img`);

      if (!imgPreview) {
        const img = document.createElement(`img`);
        img.setAttribute(`width`, `40`);
        img.setAttribute(`height`, `44`);
        img.setAttribute(`alt`, `Фотография жилья`);
        photoOutput.setAttribute(`style`, `display:flex; align-items:center; justify-content:space-around;`);
        photoOutput.prepend(img);
        imgPreview = photoOutput.querySelector(`img`);
      }

      reader.addEventListener(`load`, () => {
        imgPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const removePreview = (photoOutput) => {
  const avatarBlock = document.querySelector(`.ad-form-header__preview`);
  let imgPreview = photoOutput.querySelector(`img`);

  if (photoOutput === avatarBlock) {
    imgPreview = avatarBlock.querySelector(`img`);
    imgPreview.src = AVATAR_SRC;
  } else {
    if (imgPreview) {
      photoOutput.removeAttribute(`style`);
      imgPreview.remove();
    }
  }
};

window.preview = {
  showPreview,
  removePreview
};

