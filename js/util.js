import {createHeader} from './create-dom-element';
import moduleContent from './screens/greeting';

const mainElement = document.querySelector(`#main`);

const activateBackButton = () => {
  const button = document.querySelector(`.back`);
  button.addEventListener(`click`, () => {
    changeScreen(moduleContent);
  });
};

const hideGameState = () => {
  const header = document.querySelector(`header`);
  while (header.children.length > 1) {
    header.removeChild(header.lastChild);
  }
};

export const changeScreen = (section, header) => {
  mainElement.innerHTML = ``;
  if (header) {
    mainElement.appendChild(createHeader(header));
    activateBackButton();
  }
  mainElement.appendChild(section);
  const screenNode = document.querySelector(`section`);
  if (screenNode.classList.contains(`rules`) || screenNode.classList.contains(`result`)) {
    hideGameState();
  }
};

export const showResults = (results) => {
  const resultsNode = [];
  results.map((it) => {
    it = `<li class="stats__result stats__result--${it}"></li>`;
    resultsNode.push(it);
  });
  return resultsNode.join(``);
};
