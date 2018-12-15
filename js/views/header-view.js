import AbstractView from '../abstract-view';

const BLINK_TIME = 5;
const BLINK_PERIOD = 500;

export default class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.gameState = state;
    this.timer = this.element.querySelector(`.game__timer`);
  }

  get template() {
    if (this.gameState) {
      return `
      <header class="header">
      ${this.backButtonTemplate()}
      <div class="game__timer">${this.gameState.time}</div>
      <div class="game__lives">
      ${`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`.repeat(3 - this.gameState.lives)}
      ${`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`
        .repeat(this.gameState.lives)}
     </div>
      </header>
      `;
    }
    return `
    <header class="header">
    ${this.backButtonTemplate()}
    </header>
    `;
  }

  backButtonTemplate() {
    return `
    <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
    </button>
    `;
  }

  bind() {
    const buttonBack = this.element.querySelector(`.back`);
    buttonBack.addEventListener(`click`, () => {
      this.onClickBack();
    });
  }

  onClickBack() {}

  updateTime() {
    if (this.gameState.time <= BLINK_TIME) {
      let flag = false;
      setInterval(() => {
        if (flag) {
          this.timer.style = `color: #dd4f52;`;
          flag = false;
        } else {
          this.timer.style = `color: black;`;
          flag = true;
        }
      }, BLINK_PERIOD);
    }
    this.timer.textContent = this.gameState.time;
  }
}
