import greetingScreen from './greeting.js';
import {changeScreen} from './util.js';

const header = document.createElement(`header`);
header.classList.add(`header`);

const headerButton = document.createElement(`button`);
headerButton.classList.add(`back`);
headerButton.innerHTML = `
  <span class="visually-hidden">Вернуться к началу</span>
  <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-left"></use>
  </svg>
  <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
    <use xlink:href="img/sprite.svg#logo-small"></use>
  </svg>
`;

const headerTimer = document.createElement(`div`);
headerTimer.classList.add(`game__timer`);
headerTimer.innerHTML = `NN`;

const headerLives = document.createElement(`div`);
headerLives.classList.add(`game__lives`);
headerLives.innerHTML = `
  <img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">
  <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
  <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
`;

headerButton.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});

const showHeader = () => {
  header.innerHTML = ``;
  header.appendChild(headerButton);
  return header;
};

const showHeaderGameInfo = () => {
  header.appendChild(headerTimer);
  header.appendChild(headerLives);
};

export {showHeader, showHeaderGameInfo};
