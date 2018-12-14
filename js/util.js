const mainElement = document.querySelector(`#main`);
import * as gameData from './data/game-data';

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

export const guessTemplate = (question) => `
${question[`answers`].map((it, i) => `
  <div class="game__option">
  <img src="${it.picture}" alt="Option ${i + 1}" width="${it.width}" height="${it.height}">
  <label class="game__answer game__answer--photo">
    <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer game__answer--paint">
    <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
    <span>Рисунок</span>
  </label>
  </div>
  `).join(``)
}`;

