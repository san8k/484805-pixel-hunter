import * as gameData from './data/game-data';
import * as settings from './settings';

const mainElement = document.querySelector(`#main`);

export const changeScreen = (section) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(section);
};

export const showResults = (results) => {
  const resultsNode = Array.from({length: gameData.ANSWERS_NUMBER}).map((it, i) => {
    return `<li class="stats__result stats__result--${results[i] || `unknown`}"></li>`;
  });
  return resultsNode.join(``);
};

export const getAnswersProgress = (state) => `
  <ul class="stats">
    ${showResults(state.answersList)}
  </ul>
  `;

export const guessTemplate = (question, gameModel) => `
${question[`answers`].map((it, i) => `
  <div class="game__option">
  <img src="${it.image.url}" alt="Option ${i + 1}" width="${it.image.width}" height="${it.image.height}">
  <label class="game__answer game__answer--photo" ${settings.isDebug(gameModel.playerName) && it[`type`] === `photo` ? settings.DEBUG_STYLE : ``}>
    <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer game__answer--paint" ${settings.isDebug(gameModel.playerName) && it[`type`] === `painting` ? settings.DEBUG_STYLE : ``}>
    <input class="visually-hidden" name="question${i + 1}" type="radio" value="painting">
    <span>Рисунок</span>
  </label>
  </div>
  `).join(``)
}`;
