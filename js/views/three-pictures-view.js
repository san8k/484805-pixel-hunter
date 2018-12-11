import AbstractView from '../abstract-view';
import * as util from '../util';
import * as gameData from '../data/game-data';

const findPaintingTemplate = `
${gameData.questions[2][`answers`].map((it, i) => `
  <div class="game__option">
  <img src="${it.picture}" alt="Option ${i + 1}" width="304" height="455">
  </div>`).join(``)
}`;

export default class ThreePicturesView extends AbstractView {
  constructor(questions, index, state) {
    super();
    this.gameState = state;
    this.questionIndex = index;
    this.questionsList = questions;
  }

  get template() {
    return `
      <section class="game">
      <p class="game__task">${this.questionsList[this.questionIndex][`title`]}</p>
      <form class="game__content  game__content--triple">
        ${findPaintingTemplate}
      </form>
      ${util.getAnswersProgress(this.gameState)}
      </section>
    `;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const options = Array.from(gameForm.querySelectorAll(`img`));
    options.forEach((element, i) => {
      element.addEventListener(`click`, () => {
        // if (this.questionsList[this.questionIndex][`answers`][i][`type`] === `paint`) {
        //   this.onChangeTrueAnswer();
        // } else {
        //   this.onChangeFalseAnswer();
        // }
        this.onAnswer(i);
      });
    });

  }
  onAnswer() {}
  // onChangeTrueAnswer() {}
  // onChangeFalseAnswer() {}
}
