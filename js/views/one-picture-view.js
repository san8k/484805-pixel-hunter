import AbstractView from '../abstract-view';
import * as util from '../util';

export default class OnePictureView extends AbstractView {
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
      <form class="game__content  game__content--wide">
        ${util.guessTemplate(this.questionsList[this.questionIndex])}
      </form>
      ${util.getAnswersProgress(this.gameState)}
      </section>
    `;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    // gameForm.elements.question1.forEach((element, i) => {
    //   element.addEventListener(`change`, () => {
    //     // if (gameForm.elements.question1[i].value === this.questionsList[this.questionIndex][`answers`][0][`type`]) {
    //     //   this.onChangeTrueAnswer();
    //     // } else {
    //     //   this.onChangeFalseAnswer();
    //     // }
    //     this.onAnswer();
    //   });
    // });
    const answers = Array.from(gameForm.querySelectorAll(`input[type='radio']`));
    answers.forEach((element) => {
      element.addEventListener(`change`, () => {
        this.onAnswer(element.value);
      });
    });
  }
  onAnswer() {}
  // onChangeTrueAnswer() {}
  // onChangeFalseAnswer() {}
}
