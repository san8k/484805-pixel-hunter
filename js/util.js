import {showHeader, showHeaderGameInfo} from './header.js';

const mainElement = document.querySelector(`#main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
  const section = mainElement.querySelector(`section`);
  if (!section.classList.contains(`intro`) && !section.classList.contains(`greeting`)) {
    mainElement.insertBefore(showHeader(), section);
    if (section.classList.contains(`game`)) {
      showHeaderGameInfo();
    }
  }

};
