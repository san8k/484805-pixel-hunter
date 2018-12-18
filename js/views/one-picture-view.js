import AbstractView from '../abstract-view';
import * as util from '../util';

export default class OnePictureView extends AbstractView {
  constructor(gameModel) {
    super();
    this.gameModel = gameModel;
    this.questionIndex = this.gameModel.index;
    this.questionsList = this.gameModel.questionsList;
  }

  get template() {
    return `
      <section class="game">
      <p class="game__task">${this.questionsList[this.questionIndex][`question`]}</p>
      <form class="game__content  game__content--wide">
        ${util.guessTemplate(this.questionsList[this.questionIndex], this.gameModel)}
      </form>
      ${util.getAnswersProgress(this.gameModel._state)}
      </section>
    `;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const answers = Array.from(gameForm.querySelectorAll(`input[type='radio']`));
    const image = gameForm.querySelector(`img`);
    answers.forEach((element) => {
      element.addEventListener(`change`, () => {
        this.onAnswer(element.value);
      });
    });
    image.addEventListener(`load`, () => {
      this.onResize(image);
    });
  }
  onResize() {}
  onAnswer() {}
}
