import AbstractView from '../abstract-view';
import showHeader from '../header';
import * as data from '../data/game-data';
import * as testData from '../data/test-data';
import {showResults} from '../util';

const gameState = {}; // временно, чтоб не было ошибки

export default class StatsView extends AbstractView {
  get template() {
    const fastAnswersCount = gameState.answersList.filter((it) => it === `fast`).length;
    const slowAnswersCount = gameState.answersList.filter((it) => it === `slow`).length;
    const gameScore = data.calculateScore(gameState.answersList, gameState.lives);
    const gameResult = () => {
      if (gameScore !== -1) {
        return `Победа!`;
      } else {
        return `Поражение :(`;
      }
    };
    const resultTotal = () => {
      if (gameScore !== -1) {
        return gameScore;
      } else {
        return `FAIL`;
      }
    };

    return `
    ${showHeader()}
    <section class="result">
    <h2 class="result__title">${gameResult()}</h2>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            ${showResults(gameState.answersList)}
          </ul>
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${resultTotal()}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswersCount} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${fastAnswersCount * data.POINTS.fast}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${gameState.lives} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${gameState.lives * data.POINTS.lifeBonus}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswersCount} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${slowAnswersCount * data.POINTS.slow}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${resultTotal()}</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            ${showResults(testData.testResults)}
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
          ${showResults(testData.testResults)}
          </ul>
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
    </section>
    `;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);
    backButton.addEventListener(`click`, () => {
      this.onClickBack();
    });
  }

  onClickBack() {}

}
