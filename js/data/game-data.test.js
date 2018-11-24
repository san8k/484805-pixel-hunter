import {assert} from 'chai';
import {INITIAL_GAME_DATA, calculatePoints, countExtraLives, changeLevel, calculateAnswerTime} from './game-data';
import * as data from './test-data';

describe(`Array`, () => {
  describe(`#indexOf()`, () => {
    it(`should return -1 when the value is not present`, () => {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

describe(`Статистика игры`, () => {
  describe(`Подсчет очков игрока`, () => {
    it(`Ответил меньше, чем на 10 вопросов`, () => {
      assert.equal(calculatePoints(INITIAL_GAME_DATA, data.userAnswersLessTen, 2), -1);
      assert.equal(calculatePoints(INITIAL_GAME_DATA, data.userAnswersLessTen, 1), -1);
      assert.equal(calculatePoints(INITIAL_GAME_DATA, data.userAnswersLessTen, 10), -1);
      assert.equal(calculatePoints(INITIAL_GAME_DATA, data.userAnswersLessTen, 0), -1);
    });
    it(`Ответил на все вопросы не быстро и не медленно`, () => {
      assert.equal(calculatePoints(INITIAL_GAME_DATA, data.userAnswers1150Points, 3), 1150);
    });
    it(`Ответил на все вопросы быстро и сохранил две жизни`, () => {
      assert.equal(calculatePoints(INITIAL_GAME_DATA, data.userAnswersAllFastTwoExtraLives, 2), 1600);
    });
    it(`Ответил на все вопросы медленно и не осталось жизней`, () => {
      assert.equal(calculatePoints(INITIAL_GAME_DATA, data.userAnswersAllSlowZeroExtraLives, 0), 500);
    });
  });
  describe(`Остаток жизней`, () => {
    it(`Осталось три жизни`, () => {
      assert.equal(countExtraLives(INITIAL_GAME_DATA, data.userThreeLives), 3);
    });
    it(`Осталось две жизни`, () => {
      assert.equal(countExtraLives(INITIAL_GAME_DATA, data.userTwoLives), 2);
    });
    it(`Осталось одна жизнь`, () => {
      assert.equal(countExtraLives(INITIAL_GAME_DATA, data.userOneLife), 1);
    });
    it(`Осталось ноль жизней`, () => {
      assert.equal(countExtraLives(INITIAL_GAME_DATA, data.userZeroLives), 0);
    });
    it(`Осталось минус две жизни`, () => {
      assert.equal(countExtraLives(INITIAL_GAME_DATA, data.userTwoLessZero), -2);
    });
  });
  describe(`Уровень игрока`, () => {
    it(`Игрок на третьем уровне`, () => {
      assert.equal(changeLevel(INITIAL_GAME_DATA, data.userLevelThree), 3);
    });
    it(`Игрок на пятом уровне`, () => {
      assert.equal(changeLevel(INITIAL_GAME_DATA, data.userLevelFive), 5);
    });
    it(`Игрок на шестом уровне`, () => {
      assert.equal(changeLevel(INITIAL_GAME_DATA, data.userLevelSeven), 7);
    });
  });
  describe(`Потрачено времени на вопрос`, () => {
    it(`Ответ получен за 12 секунд`, () => {
      assert.equal(calculateAnswerTime(12), 12);
    });
    it(`Ответ получен за 23 секунды`, () => {
      assert.equal(calculateAnswerTime(23), 23);
    });
    it(`Ответ получен за -123 секунды`, () => {
      assert.equal(calculateAnswerTime(-123), -1);
    });
    it(`Ответ получен за 38 секунд`, () => {
      assert.equal(calculateAnswerTime(38), -1);
    });
    it(`Ответ получен за 0 секунд`, () => {
      assert.equal(calculateAnswerTime(0), 0);
    });
  });
});
