'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizardsList = document.querySelector('.setup-similar-list');
var userDialog = document.querySelector('.setup');
var setupWindow = document.querySelector('.setup-similar');

var getRandomElement = function (currentArray) {
  var maxIndex = currentArray.length - 1;
  return Math.round(Math.random() * maxIndex);
};

var getElementByRandomIndex = function (currentArray) {
  var index = getRandomElement(currentArray);
  return currentArray[index];
};

var getFullName = function (names, lastNames, changeBound = 0.3) {
  if (Math.random() < changeBound) {
    return getElementByRandomIndex(lastNames) + ' ' + getElementByRandomIndex(names);
  }
  return getElementByRandomIndex(names) + ' ' + getElementByRandomIndex(lastNames);
};

var createWizards = function (elementQuantity = 4) {
  var wizards = [];
  for (var i = 0; i < elementQuantity; i++) {
    wizards.push({
      name: getFullName(NAMES, LAST_NAMES),
      coatColor: getElementByRandomIndex(COATS),
      eyesColor: getElementByRandomIndex(EYES),
    });
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
var finalWizardsList = createWizards();
for (var i = 0; i < finalWizardsList.length; i++) {
  fragment.appendChild(renderWizard(finalWizardsList[i]));
}
wizardsList.appendChild(fragment);
userDialog.classList.remove('hidden');
setupWindow.classList.remove('hidden');
