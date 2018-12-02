import {createDomTemplate} from '../create-dom-element';
import * as data from '../data/game-data';
import {changeScreen, showResults, activateBackButton} from '../util';
import showHeader from '../header';
import showStatsScreen from './stats';

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

export const showGameScreen = (questionsList, questionIndex, gameState) => {
  console.log(`AnswersList: ${gameState[`answersList`]}`);

  let questionScreen;
  let gameForm;

  const getNextIndex = () => {
    const MAX_INDEX = 2;
    if (questionIndex + 1 > MAX_INDEX) {
      return 0;
    }
    return questionIndex + 1;
  };

  const getTrueAnswer = () => {
    gameState.answersList.push(data.results.correct[0]);
    if (gameState[`lives`] === data.LIVES.death || gameState[`level`] === data.MAX_LEVEL || gameState[`answersList`].length === data.MAX_LEVEL) {
      changeScreen(showStatsScreen(gameState));
    } else {
      gameState.level += 1;
      changeScreen(showGameScreen(questionsList, getNextIndex(), Object.assign({}, gameState)));
    }
  };

  const getFalseAnswer = () => {
    gameState.answersList.push(data.results.wrong);
    if (gameState[`lives`] === data.LIVES.death || gameState[`level`] === data.MAX_LEVEL || gameState[`answersList`].length === data.MAX_LEVEL) {
      changeScreen(showStatsScreen(gameState));
    } else {
      gameState.level += 1;
      gameState.lives -= 1;
      changeScreen(showGameScreen(questionsList, getNextIndex(), Object.assign({}, gameState)));
    }
  };

  const getAnswer = () => {
    gameForm = questionScreen.querySelector(`.game__content`);

    if (questionIndex === 0) {
      let answerOne;
      let answerTwo;

      gameForm.elements.question1.forEach((element, i) => {
        element.addEventListener(`change`, () => {
          if (gameForm.elements.question1[i].value === questionsList[questionIndex][`answers`][0][`type`]) {
            answerOne = 1;
            if (answerTwo === 1) {
              getTrueAnswer();
            } else if (answerTwo !== undefined) {
              getFalseAnswer();
            }
          } else {
            answerOne = 0;
            if (answerTwo !== undefined) {
              getFalseAnswer();
            }
          }
        });
      });
      gameForm.elements.question2.forEach((element, i) => {
        element.addEventListener(`change`, () => {
          if (gameForm.elements.question2[i].value === questionsList[questionIndex][`answers`][1][`type`]) {
            answerTwo = 1;
            if (answerOne === 1) {
              getTrueAnswer();
            } else if (answerOne !== undefined) {
              getFalseAnswer();
            }
          } else {
            answerTwo = 0;
            if (answerOne !== undefined) {
              getFalseAnswer();
            }
          }
        });
      });

    } else if (questionIndex === 1) {
      gameForm.elements.question1.forEach((element, i) => {
        element.addEventListener(`change`, () => {
          if (gameForm.elements.question1[i].value === questionsList[questionIndex][`answers`][0][`type`]) {
            getTrueAnswer();
          } else {
            getFalseAnswer();
          }
        });
      });

    } else {
      const options = Array.from(gameForm.querySelectorAll(`img`));
      options.forEach((element, i) => {
        element.addEventListener(`click`, () => {
          if (questionsList[questionIndex][`answers`][i][`type`] === `paint`) {
            getTrueAnswer();
          } else {
            getFalseAnswer();
          }
        });
      });
    }

  };

  const getAnswersProgress = () => `
  <ul class="stats">
    ${showResults(gameState.answersList)}
  </ul>
  `;

  switch (questionIndex) {
    case 0:
      questionScreen = createDomTemplate(`
      ${showHeader(gameState)}
      <section class="game">
      <p class="game__task">${questionsList[questionIndex][`title`]}</p>
      <form class="game__content">
        ${guessTemplate(questionsList[questionIndex])}
      </form>
      ${getAnswersProgress()}
      </section>
      `);
      getAnswer();
      break;
    case 1:
      questionScreen = createDomTemplate(`
      ${showHeader(gameState)}
      <section class="game">
      <p class="game__task">${questionsList[questionIndex][`title`]}</p>
      <form class="game__content  game__content--wide">
        ${guessTemplate(questionsList[questionIndex])}
      </form>
      ${getAnswersProgress()}
      </section>
      `);
      getAnswer();
      break;
    case 2:
      questionScreen = createDomTemplate(`
      ${showHeader(gameState)}
      <section class="game">
      <p class="game__task">${questionsList[questionIndex][`title`]}</p>
      <form class="game__content  game__content--triple">
        ${findPaintingTemplate}
      </form>
      ${getAnswersProgress()}
      </section>
      `);
      getAnswer();
      break;
    default:
      throw new Error(`Указан некорректный тип игры`);
  }
  activateBackButton(questionScreen);

  return questionScreen;
};

