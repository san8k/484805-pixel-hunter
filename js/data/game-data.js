export const MAX_LEVEL = 10;
export const ANSWERS_NUMBER = 10;


export const AnswerTime = {
  FAST: 10,
  SLOW: 20,
  MAX: 30,
  TICK: 1000
};

export const Lives = {
  START: 3,
  DEATH: 0
};

export const INITIAL_GAME_DATA = Object.freeze({
  level: 0,
  lives: Lives.START,
  time: AnswerTime.MAX,
  answersList: []
});

export const Points = {
  CORRECT: 100,
  FAST: 50,
  SLOW: -50,
  LIFE_BONUS: 50
};


export const Results = {
  CORRECT: `correct`,
  SLOW: `slow`,
  FAST: `fast`,
  WRONG: `wrong`
};

export const calculateScore = (answers, lives) => {
  if (answers.length < MAX_LEVEL || lives < 0) {
    return -1;
  }
  let scores = lives * Points.LIFE_BONUS;
  answers.forEach((it) => {
    switch (it) {
      case Results.CORRECT:
        scores += Points.CORRECT;
        break;
      case Results.SLOW:
        scores += Points.CORRECT + Points.SLOW;
        break;
      case Results.FAST:
        scores += Points.CORRECT + Points.FAST;
        break;
    }
  });

  return scores;
};
