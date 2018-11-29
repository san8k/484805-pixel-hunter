import {changeScreen} from '../util';
import {createDomElement} from '../create-dom-element';
import gameTwoScreen from './game-2';
import {headerTemplate} from '../header';
import {INITIAL_GAME_DATA} from '../data/game-data';

const moduleContent = createDomElement(`
  <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
  <form class="game__content">
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question1" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question1" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
    <div class="game__option">
      <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question2" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question2" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>
  </form>
  <ul class="stats">
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--correct"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--unknown"></li>
  </ul>
`, `game`);

let flagQuestionOne = false;
let flagQuestionTwo = false;

const answersOne = moduleContent.querySelectorAll(`input[name="question1"]`);
const answersTwo = moduleContent.querySelectorAll(`input[name="question2"]`);

Array.from(answersOne).forEach((elem) => {
  elem.addEventListener(`change`, () => {
    if (elem.checked === true) {
      flagQuestionOne = true;
      if (flagQuestionTwo) {
        changeScreen(gameTwoScreen, headerTemplate(INITIAL_GAME_DATA));
      }
    }
  });
});

Array.from(answersTwo).forEach((elem) => {
  elem.addEventListener(`change`, () => {
    if (elem.checked === true) {
      flagQuestionTwo = true;
      if (flagQuestionOne) {
        changeScreen(gameTwoScreen, headerTemplate(INITIAL_GAME_DATA));
      }
    }
  });
});

export default moduleContent;
