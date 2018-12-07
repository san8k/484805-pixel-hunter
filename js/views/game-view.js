import AbstractView from '../abstract-view';
import showHeader from '../header';
import * as util from '../util';
import * as data from '../data/game-data';

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

const getAnswersProgress = (gameState) => `
  <ul class="stats">
    ${util.showResults(gameState.answersList)}
  </ul>
  `;

export class GuessForEach extends AbstractView {
  constructor(questions, index, state) {
    super();
    this.gameState = state;
    this.questionIndex = index;
    this.questionsList = questions;
  }

  get template() {
    return `
    ${showHeader(this.gameState)}
      <section class="game">
      <p class="game__task">${this.questionsList[this.questionIndex][`title`]}</p>
      <form class="game__content">
        ${guessTemplate(this.questionsList[this.questionIndex])}
      </form>
      ${getAnswersProgress(this.gameState)}
      </section>
    `;
  }

  bind() {
    const buttonBack = this.element.querySelector(`.back`);
    const gameForm = this.element.querySelector(`.game__content`);
    let answerOne;
    let answerTwo;
    gameForm.elements.question1.forEach((element, i) => {
      element.addEventListener(`change`, () => {

        if (gameForm.elements.question1[i].value === this.questionsList[this.questionIndex][`answers`][0][`type`]) {
          answerOne = 1;
          if (answerTwo === 1) {
            this.onChangeTrueAnswer();
          } else if (answerTwo !== undefined) {
            this.onChangeFalseAnswer();
          }
        } else {
          answerOne = 0;
          if (answerTwo !== undefined) {
            this.onChangeFalseAnswer();
          }
        }
      });
    });
    gameForm.elements.question2.forEach((element, i) => {
      element.addEventListener(`change`, () => {
        if (gameForm.elements.question2[i].value === this.questionsList[this.questionIndex][`answers`][1][`type`]) {
          answerTwo = 1;
          if (answerOne === 1) {
            this.onChangeTrueAnswer();
          } else if (answerOne !== undefined) {
            this.onChangeFalseAnswer();
          }
        } else {
          answerTwo = 0;
          if (answerOne !== undefined) {
            this.onChangeFalseAnswer();
          }
        }
      });
    });

    buttonBack.addEventListener(`click`, () => {
      this.onCLickBack();
    });
  }

  onChangeTrueAnswer() {}
  onChangeFalseAnswer() {}
  onCLickBack() {}
}

export class GuessForOne extends AbstractView {
  constructor(questions, index, state) {
    super();
    this.gameState = state;
    this.questionIndex = index;
    this.questionsList = questions;
  }

  get template() {
    return `
    ${showHeader(this.gameState)}
      <section class="game">
      <p class="game__task">${this.questionsList[this.questionIndex][`title`]}</p>
      <form class="game__content  game__content--wide">
        ${guessTemplate(this.questionsList[this.questionIndex])}
      </form>
      ${getAnswersProgress(this.gameState)}
      </section>
    `;
  }

  bind() {
    const buttonBack = this.element.querySelector(`.back`);
    const gameForm = this.element.querySelector(`.game__content`);
    gameForm.elements.question1.forEach((element, i) => {
      element.addEventListener(`change`, () => {
        if (gameForm.elements.question1[i].value === this.questionsList[this.questionIndex][`answers`][0][`type`]) {
          this.onChangeTrueAnswer();
        } else {
          this.onChangeFalseAnswer();
        }
      });
    });

    buttonBack.addEventListener(`click`, () => {
      this.onCLickBack();
    });
  }

  onChangeTrueAnswer() {}
  onChangeFalseAnswer() {}
  onCLickBack() {}
}

export class FindPainting extends AbstractView {
  constructor(questions, index, state) {
    super();
    this.gameState = state;
    this.questionIndex = index;
    this.questionsList = questions;
  }

  get template() {
    return `
    ${showHeader(this.gameState)}
      <section class="game">
      <p class="game__task">${this.questionsList[this.questionIndex][`title`]}</p>
      <form class="game__content  game__content--triple">
        ${findPaintingTemplate}
      </form>
      ${getAnswersProgress(this.gameState)}
      </section>
    `;
  }

  bind() {
    const buttonBack = this.element.querySelector(`.back`);
    const gameForm = this.element.querySelector(`.game__content`);
    const options = Array.from(gameForm.querySelectorAll(`img`));
    options.forEach((element, i) => {
      element.addEventListener(`click`, () => {
        if (this.questionsList[this.questionIndex][`answers`][i][`type`] === `paint`) {
          this.onChangeTrueAnswer();
        } else {
          this.onChangeFalseAnswer();
        }
      });
    });

    buttonBack.addEventListener(`click`, () => {
      this.onCLickBack();
    });
  }

  onChangeTrueAnswer() {}
  onChangeFalseAnswer() {}
  onCLickBack() {}
}
