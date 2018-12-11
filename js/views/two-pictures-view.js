import AbstractView from '../abstract-view';
import * as util from '../util';

export default class TwoPicturesView extends AbstractView {
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
      <form class="game__content">
        ${util.guessTemplate(this.questionsList[this.questionIndex])}
      </form>
      ${util.getAnswersProgress(this.gameState)}
      </section>
    `;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    // let answerOne;
    // let answerTwo;
    // gameForm.elements.question1.forEach((element, i) => {
    //   element.addEventListener(`change`, () => {

    //     if (gameForm.elements.question1[i].value === this.questionsList[this.questionIndex][`answers`][0][`type`]) {
    //       answerOne = 1;
    //       if (answerTwo === 1) {
    //         this.onChangeTrueAnswer();
    //       } else if (answerTwo !== undefined) {
    //         this.onChangeFalseAnswer();
    //       }
    //     } else {
    //       answerOne = 0;
    //       if (answerTwo !== undefined) {
    //         this.onChangeFalseAnswer();
    //       }
    //     }
    //   });
    // });
    // gameForm.elements.question2.forEach((element, i) => {
    //   element.addEventListener(`change`, () => {
    //     if (gameForm.elements.question2[i].value === this.questionsList[this.questionIndex][`answers`][1][`type`]) {
    //       answerTwo = 1;
    //       if (answerOne === 1) {
    //         this.onChangeTrueAnswer();
    //       } else if (answerOne !== undefined) {
    //         this.onChangeFalseAnswer();
    //       }
    //     } else {
    //       answerTwo = 0;
    //       if (answerOne !== undefined) {
    //         this.onChangeFalseAnswer();
    //       }
    //     }
    //   });
    // });

    gameForm.addEventListener(`change`, () => {
      const answers = Array.from(gameForm.querySelectorAll(`input[type='radio']:checked`)).map((it) => it.value);
      if (answers.length === this.questionsList[this.questionIndex][`answers`].length) {
        this.onAnswer(answers);
      }
    });
  }
  onAnswer() {}
  // onChangeTrueAnswer() {}
  // onChangeFalseAnswer() {}
}
