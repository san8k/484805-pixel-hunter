import AbstractView from '../abstract-view';
import * as util from '../util';

export default class TwoPicturesView extends AbstractView {
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
      <form class="game__content">
        ${util.getGuessTemplate(this.questionsList[this.questionIndex], this.gameModel)}
      </form>
      ${util.getAnswersProgress(this.gameModel._state)}
      </section>
    `;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const images = gameForm.querySelectorAll(`img`);
    images.forEach((element) => {
      element.addEventListener(`load`, () => {
        this.onResize(element);
      });
    });
    const onAnswerClick = () => {
      const answers = Array.from(gameForm.querySelectorAll(`input[type='radio']:checked`)).map((it) => it.value);
      if (answers.length === this.questionsList[this.questionIndex][`answers`].length) {
        this.onAnswer(answers);
        gameForm.removeEventListener(`change`, onAnswerClick);
      }
    };
    gameForm.addEventListener(`change`, onAnswerClick);
  }

  onResize() {}
  onAnswer() {}
}
