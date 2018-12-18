import {assert} from 'chai';
import * as data from './game-data';
import * as testData from './test-data';
import resize from '../resizer';

const createTestForFrame = (frame) => {
  const assertRatio = (given, expected) => {
    const actual = resize(frame, given);
    assert.deepEqual(actual, expected);
  };

  const createTest = (expected, multiplier) => {
    const given = {
      width: Math.floor(expected.width * multiplier),
      height: Math.floor(expected.height * multiplier)
    };
    it(`shrink ${multiplier}x: ${given.width}x${given.height} => ${expected.width}x${expected.height}`, () => {
      assertRatio(given, expected);
    });
  };

  const sequence = (expected) => {
    createTest(expected, 8);
    createTest(expected, 7);
    createTest(expected, 5);
    createTest(expected, 4);
    createTest(expected, 3);
    createTest(expected, 2);
    createTest(expected, 1);
  };

  describe(`Resize into frame: ${frame.width}x${frame.height}`, () => {

    describe(`when "width === height"`, () => {
      sequence({width: frame.width, height: frame.height});
    });

    describe(`when "width > height"`, () => {
      sequence({width: frame.width, height: Math.floor(frame.height / 2)});
    });

    describe(`when "width < height"`, () => {
      sequence({width: Math.floor(frame.width / 2), height: frame.height});
    });

  });
};

createTestForFrame({width: 256, height: 256});
createTestForFrame({width: 256, height: 128});

createTestForFrame({width: 468, height: 458});
createTestForFrame({width: 705, height: 455});
createTestForFrame({width: 304, height: 455});


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
});

