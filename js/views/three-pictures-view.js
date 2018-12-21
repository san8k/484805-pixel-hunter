import AbstractView from '../abstract-view';
import * as util from '../util';
import * as settings from '../settings';

export default class ThreePicturesView extends AbstractView {
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
      <form class="game__content  game__content--triple">
      ${this.questionsList[this.questionIndex][`answers`].map((it, i) => `
      <div class="game__option" ${settings.isDebug(this.gameModel.playerName) && it[`type`] !== this.questionsList[this.questionIndex][`answers`][1][`type`] ? settings.DEBUG_STYLE : ``}>
      <img src="${it.image.url}" alt="Option ${i + 1}" width=${it.image.width} height=${it.image.height}>
      </div>`).join(``)}
      </form>
      ${util.getAnswersProgress(this.gameModel._state)}
      </section>
    `;
  }

  bind() {
    const gameForm = this.element.querySelector(`.game__content`);
    const options = Array.from(gameForm.querySelectorAll(`.game__option`));
    const images = Array.from(gameForm.querySelectorAll(`img`));
    images.forEach((element) => {
      element.addEventListener(`load`, () => {
        this.onResize(element);
      });
    });
    options.forEach((element, i) => {
      const onAnswerClick = () => {
        this.onAnswer(i);
        element.removeEventListener(`click`, onAnswerClick);
      };
      element.addEventListener(`click`, onAnswerClick);
    });
  }

  onResize() {}
  onAnswer() {}
}
