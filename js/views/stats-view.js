import AbstractView from '../abstract-view';
import * as data from '../data/game-data';
import {showResults} from '../util';

export default class StatsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results;
  }
  get template() {
    const correctAnswersCount = this.results[this.results.length - 1].answers.filter((it) => it === `correct`).length;
    const fastAnswersCount = this.results[this.results.length - 1].answers.filter((it) => it === `fast`).length;
    const slowAnswersCount = this.results[this.results.length - 1].answers.filter((it) => it === `slow`).length;
    const gameScore = data.calculateScore(this.results[this.results.length - 1].answers, this.results[this.results.length - 1].lives);
    const getGameResult = () => {
      if (gameScore !== -1) {
        return `Победа!`;
      } else {
        return `Поражение :(`;
      }
    };
    const getResultTotal = () => {
      if (gameScore !== -1) {
        return gameScore;
      } else {
        return `FAIL`;
      }
    };

    const getAnswersScore = () => {
      if (gameScore !== -1) {
        return (correctAnswersCount + slowAnswersCount + fastAnswersCount) * 100;
      } else {
        return `FAIL`;
      }
    };

    const getLives = () => {
      if (this.results[this.results.length - 1].lives < 0) {
        return 0;
      }
      return this.results[this.results.length - 1].lives;
    };

    return `
    <section class="result">
    <h2 class="result__title">${getGameResult()}</h2>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            ${showResults(this.results[this.results.length - 1].answers)}
          </ul>
        </td>
        <td class="result__points">× 100</td>
        <td class="result__total">${getAnswersScore()}</td>
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
        <td class="result__extra">${getLives()} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${getLives() * data.POINTS.lifeBonus}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswersCount} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${slowAnswersCount * data.POINTS.slow}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${getResultTotal()}</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            ${showResults(``)}
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
          ${showResults(``)}
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

}
