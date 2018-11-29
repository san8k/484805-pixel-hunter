import {createDomElement} from '../create-dom-element';
import * as data from '../data/game-data';
import {changeScreen} from '../util';
import {headerTemplate} from '../header';
import statsScreen from './stats';

const guessForEachTemplate = `
${data.questions[0][`answers`].map((it, i) => `
  <div class="game__option">
  <img src="${it.picture}" alt="Option ${i + 1}" width="468" height="458">
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
const guessForOneTemplate = `
${data.questions[1][`answers`].map((it) => `
  <div class="game__option">
  <img src="${it.picture}" alt="Option 1" width="705" height="455">
  <label class="game__answer  game__answer--photo">
    <input class="visually-hidden" name="question1" type="radio" value="photo">
    <span>Фото</span>
  </label>
  <label class="game__answer  game__answer--paint">
    <input class="visually-hidden" name="question1" type="radio" value="paint">
    <span>Рисунок</span>
  </label>
  </div>`)
}`;
const findPaintingTemplate = `
${data.questions[2][`answers`].map((it, i) => `
  <div class="game__option">
  <img src="${it.picture}" alt="Option ${i + 1}" width="304" height="455">
  </div>`).join(``)
}`;


const showResults = (results) => {
  const resultsNode = [];
  results.map((it) => {
    it = `<li class="stats__result stats__result--${it}"></li>`;
    resultsNode.push(it);
  });
  return resultsNode.join(``);
};

export const showGameScreen = (gameType) => {
  let questionScreen;
  let gameForm;
  switch (gameType) {
    case `guessForEach`:
      questionScreen = createDomElement(`
      <p class="game__task">${data.questions[0][`title`]}</p>
      <form class="game__content">
        ${guessForEachTemplate}
      </form>
      <ul class="stats">
        ${showResults(data.testResults)}
      </ul>
      `, `game`);
      gameForm = questionScreen.querySelector(`.game__content`);
      gameForm.addEventListener(`change`, () => {
        if (gameForm.querySelector(`input[name="question1"]:checked`) && gameForm.querySelector(`input[name="question2"]:checked`)) {
          data.answersList.push(data.results.correct[0]);
          // добавить + уровень в копию объекта + время ответа + управление жизнями
          if (data.INITIAL_GAME_DATA.lives === 0 || data.INITIAL_GAME_DATA.level === 9 || data.answersList.length === 10) {
            changeScreen(statsScreen, headerTemplate(data.INITIAL_GAME_DATA));
          } else {
            changeScreen(showGameScreen(data.questions[1][`task`]), headerTemplate(data.INITIAL_GAME_DATA));
          }
        }
      });
      break;
    case `guessForOne`:
      questionScreen = createDomElement(`
      <p class="game__task">${data.questions[1][`title`]}</p>
      <form class="game__content  game__content--wide">
        ${guessForOneTemplate}
      </form>
      <ul class="stats">
        ${showResults(data.testResults)}
      </ul>
      `, `game`);
      gameForm = questionScreen.querySelector(`.game__content`);
      gameForm.addEventListener(`change`, () => {
        if (gameForm.querySelector(`input[name="question1"]:checked`)) {
          data.answersList.push(data.results.correct[0]);
          if (data.INITIAL_GAME_DATA.lives === 0 || data.INITIAL_GAME_DATA.level === 9 || data.answersList.length === 10) {
            changeScreen(statsScreen, headerTemplate(data.INITIAL_GAME_DATA));
          } else {
            changeScreen(showGameScreen(data.questions[2][`task`]), headerTemplate(data.INITIAL_GAME_DATA));
          }
        }
      });
      break;
    case `findPainting`:
      questionScreen = createDomElement(`
      <p class="game__task">${data.questions[2][`title`]}</p>
      <form class="game__content  game__content--triple">
        ${findPaintingTemplate}
      </form>
      <ul class="stats">
        ${showResults(data.testResults)}
      </ul>
      `, `game`);
      gameForm = questionScreen.querySelector(`.game__content`);
      const options = Array.from(gameForm.querySelectorAll(`img`));
      options.forEach((it) => {
        it.addEventListener(`click`, () => {
          data.answersList.push(data.results.correct[0]);
          if (data.INITIAL_GAME_DATA.lives === 0 || data.INITIAL_GAME_DATA.level === 9 || data.answersList.length === 10) {
            changeScreen(statsScreen, headerTemplate(data.INITIAL_GAME_DATA));
          } else {
            changeScreen(showGameScreen(data.questions[0][`task`]), headerTemplate(data.INITIAL_GAME_DATA));
          }
        });
      });
      break;
    default:
      throw new Error(`Указан некорректный тип игры`);
  }

  return questionScreen;
};

