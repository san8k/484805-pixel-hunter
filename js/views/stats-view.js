import AbstractView from '../abstract-view';
import * as gameData from '../data/game-data';
import {showResults} from '../util';

export default class StatsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results;
  }
  get template() {

    const getGameResult = () => {
      if (this.results[this.results.length - 1].answers.length < gameData.ANSWERS_NUMBER) {
        return `Поражение :(`;
      } else {
        return `Победа!`;
      }
    };

    let resultsTemplates = [];
    this.results.forEach((result, i) => {
      if ((`lives` in result) && (`answers` in result)) {
        resultsTemplates.push(result.lives >= 0 ? this.getWinTemplate(result, i + 1) : this.getFailTemplate(result, i + 1));
      } else {
        resultsTemplates.push(this.getGameDataErrorTemplate(i + 1));
      }
    });

    return `
    <section class="result">
    <h2 class="result__title">${getGameResult()}</h2>
    ${resultsTemplates.join(``)}
    </section>
    `;
  }

  getGameDataErrorTemplate(number) {
    return `
    <table class="result__table">
    <tr>
      <td class="result__number">${number}.</td>
      <td>Ошибка данных игры</td>
    </tr>
    </table>
    `;
  }

  getWinTemplate(result, number) {
    const correctAnswersCount = result.answers.filter((it) => it === `correct`).length;
    const fastAnswersCount = result.answers.filter((it) => it === `fast`).length;
    const slowAnswersCount = result.answers.filter((it) => it === `slow`).length;
    const gameScore = gameData.calculateScore(result.answers, result.lives);

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
      if (result.lives < 0) {
        return 0;
      }
      return result.lives;
    };

    return `
    <table class="result__table">
    <tr>
      <td class="result__number">${number}.</td>
      <td colspan="2">
        <ul class="stats">
          ${showResults(result.answers)}
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
      <td class="result__total">${fastAnswersCount * gameData.POINTS.fast}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${getLives()} <span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${getLives() * gameData.POINTS.lifeBonus}</td>
    </tr>
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${slowAnswersCount} <span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${slowAnswersCount * gameData.POINTS.slow}</td>
    </tr>
    <tr>
      <td colspan="5" class="result__total  result__total--final">${getResultTotal()}</td>
    </tr>
  </table>
    `;
  }

  getFailTemplate(result, number) {
    return `
    <table class="result__table">
      <tr>
        <td class="result__number">${number}.</td>
        <td>
          <ul class="stats">
            ${showResults(result.answers)}
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    `;
  }

}
