import {assert} from 'chai';
import * as data from './game-data';
import * as testData from './test-data';

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
      assert.equal(data.calculateScore(testData.failGame, 0), -1);
    });
    it(`Ответил на все вопросы не быстро и не медленно`, () => {
      assert.equal(data.calculateScore(testData.averageAnswers, 3), 1150);
    });
  });
  describe(`Остаток жизней`, () => {
    it(`Осталось три жизни`, () => {
      assert.equal(Object.assign({}, data.INITIAL_GAME_DATA).lives, 3);
    });
    it(`Осталось две жизни`, () => {
      assert.equal(Object.assign({}, data.INITIAL_GAME_DATA, {'lives': 2}).lives, 2);
    });
  });
  describe(`Уровень игрока`, () => {
    it(`Игрок на третьем уровне`, () => {
      assert.equal(Object.assign({}, data.INITIAL_GAME_DATA, {'level': 3}).level, 3);
    });
  });
  describe(`Потрачено времени на вопрос`, () => {
    it(`Ответ получен за 12 секунд`, () => {
      assert.equal(data.calculateAnswerTime(12), 12);
    });
    it(`Ответ получен за 23 секунды`, () => {
      assert.equal(data.calculateAnswerTime(23), 23);
    });
    it(`Ответ получен за -123 секунды`, () => {
      assert.equal(data.calculateAnswerTime(-123), -1);
    });
    it(`Ответ получен за 38 секунд`, () => {
      assert.equal(data.calculateAnswerTime(38), -1);
    });
    it(`Ответ получен за 0 секунд`, () => {
      assert.equal(data.calculateAnswerTime(0), 0);
    });
  });
});
