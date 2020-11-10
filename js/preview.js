'use strict';

const showPreview = () => {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const fileChooser = document.querySelector(`.ad-form__input`);
  const preview = document.querySelector(`.ad-form__photo`).querySelector(`img`);
  // const fileChooser = document.querySelector(`.ad-form-header__input`);
  // const preview = document.querySelector(`.ad-form-header__preview`).querySelector(`img`);
  fileChooser.addEventListener(`change`, () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((element) => {
      return fileName.endsWith(element);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

window.preview = {
  showPreview
};

