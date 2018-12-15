export const MAX_LEVEL = 10;
export const ANSWERS_NUMBER = 10;

export const ANSWER_TIME = {
  fast: 10,
  slow: 20,
  max: 30,
  tick: 1000
};

export const LIVES = {
  start: 3,
  death: 0
};

export const POINTS = {
  correct: 100,
  fast: 50,
  slow: -50,
  lifeBonus: 50
};

export const INITIAL_GAME_DATA = Object.freeze({
  level: 0,
  lives: LIVES.start,
  time: ANSWER_TIME.max,
  answersList: []
});

export const results = {
  correct: [`correct`, `slow`, `fast`],
  wrong: `wrong`,
  unknown: `unknown`
};

export const calculateScore = (answers, lives) => {
  if (answers.length < MAX_LEVEL || lives < 0) {
    return -1;
  }
  let scores = lives * POINTS.lifeBonus;
  answers.forEach((it) => {
    switch (it) {
      case results.correct[0]:
        scores += POINTS.correct;
        break;
      case results.correct[1]:
        scores += POINTS.correct + POINTS.slow;
        break;
      case results.correct[2]:
        scores += POINTS.correct + POINTS.fast;
        break;
    }
  });

  return scores;
};
