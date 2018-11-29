import {createDomElement} from '../create-dom-element';
import * as data from '../data/game-data';
import * as testData from '../data/test-data';
import {changeScreen, showResults} from '../util';
import {headerTemplate} from '../header';
import {showStatsScreen} from './stats';

const guessTemplate = (question) => `
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

const findPaintingTemplate = `
${data.questions[2][`answers`].map((it, i) => `
  <div class="game__option">
  <img src="${it.picture}" alt="Option ${i + 1}" width="304" height="455">
  </div>`).join(``)
}`;

export const showGameScreen = (gameType, gameState) => {
  let questionScreen;
  let gameForm;
  switch (gameType) {
    case `guessForEach`:
      questionScreen = createDomElement(`
      <p class="game__task">${data.questions[0][`title`]}</p>
      <form class="game__content">
        ${guessTemplate(data.questions[0])}
      </form>
      <ul class="stats">
        ${showResults(testData.testResults)}
      </ul>
      `, `game`);
      gameForm = questionScreen.querySelector(`.game__content`);
      gameForm.addEventListener(`change`, () => {
        if (gameForm.querySelector(`input[name="question1"]:checked`) && gameForm.querySelector(`input[name="question2"]:checked`)) {
          gameState.answersList.push(data.results.correct[0]);
          if (gameState.lives === data.LIVES.death || gameState.level === data.MAX_LEVEL || data.answersList.length === data.MAX_LEVEL) {
            changeScreen(showStatsScreen(gameState), headerTemplate(gameState));
          } else {
            gameState.level += 1;
            changeScreen(showGameScreen(data.questions[1][`task`], Object.assign({}, gameState)), headerTemplate(gameState));
          }
        }
      });
      break;
    case `guessForOne`:
      questionScreen = createDomElement(`
      <p class="game__task">${data.questions[1][`title`]}</p>
      <form class="game__content  game__content--wide">
        ${guessTemplate(data.questions[1])}
      </form>
      <ul class="stats">
        ${showResults(testData.testResults)}
      </ul>
      `, `game`);
      gameForm = questionScreen.querySelector(`.game__content`);
      gameForm.addEventListener(`change`, () => {
        if (gameForm.querySelector(`input[name="question1"]:checked`)) {
          gameState.answersList.push(data.results.wrong);
          if (gameState.lives === data.LIVES.death || gameState.level === data.MAX_LEVEL || data.answersList.length === data.MAX_LEVEL) {
            changeScreen(showStatsScreen(gameState), headerTemplate(gameState));
          } else {
            gameState.level += 1;
            gameState.lives -= 1;
            changeScreen(showGameScreen(data.questions[2][`task`], Object.assign(gameState)), headerTemplate(gameState));
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
        ${showResults(testData.testResults)}
      </ul>
      `, `game`);
      gameForm = questionScreen.querySelector(`.game__content`);
      const options = Array.from(gameForm.querySelectorAll(`img`));
      options.forEach((it) => {
        it.addEventListener(`click`, () => {
          gameState.answersList.push(data.results.wrong);
          if (gameState.lives === data.LIVES.death || gameState.level === data.MAX_LEVEL || data.answersList.length === data.MAX_LEVEL) {
            changeScreen(showStatsScreen(gameState), headerTemplate(gameState));
          } else {
            gameState.level += 1;
            gameState.lives -= 1;
            changeScreen(showGameScreen(data.questions[0][`task`], Object.assign(gameState)), headerTemplate(gameState));
          }
        });
      });
      break;
    default:
      throw new Error(`Указан некорректный тип игры`);
  }

  return questionScreen;
};

