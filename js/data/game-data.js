const ANSWER_TIMER = 30;
const QUICK_ANSWER_TIME = 10;
const LONG_ANSWER_TIME = 20;
const ANSWER_POINTS = 100;
const QUICK_ANSWER_POINTS = 50;
const LONG_ANSWER_POINTS = -50;
const EXTRA_LIFE_POINTS = 50;

export const INITIAL_GAME_DATA = Object.freeze({
  level: 0,
  points: 0,
  lives: 3,
});

const currentAnswerPoints = (currentAnswer) => {
  const {isCorrectAnswer, time} = currentAnswer;
  let answerPoints = ANSWER_POINTS;
  if (!isCorrectAnswer || time > ANSWER_TIMER) {
    return 0;
  }
  if (time < QUICK_ANSWER_TIME) {
    answerPoints += QUICK_ANSWER_POINTS;
  }
  if (time > LONG_ANSWER_TIME) {
    answerPoints += LONG_ANSWER_POINTS;
  }
  return answerPoints;
};

export const calculatePoints = (gameData, answers, lives) => {
  const answersCount = answers.length;
  const newGame = Object.assign({}, gameData, {answersCount}, {lives});

  if (newGame.answersCount < 10) {
    return -1;
  }
  answers.forEach((answer) => {
    newGame.points += currentAnswerPoints(answer);
  });
  switch (lives) {
    case 3:
      newGame.points += EXTRA_LIFE_POINTS * 3;
      break;
    case 2:
      newGame.points += EXTRA_LIFE_POINTS * 2;
      break;
    case 1:
      newGame.points += EXTRA_LIFE_POINTS;
      break;
    default:
      break;
  }

  return newGame.points;
};

export const countExtraLives = (gameData, answers) => {
  const newGame = Object.assign({}, gameData);
  answers.forEach((answer) => {
    const {isCorrectAnswer} = answer;
    if (!isCorrectAnswer) {
      newGame.lives -= 1;
    }
  });
  return newGame.lives;
};

export const changeLevel = (gameData, answers) => {
  const newGame = Object.assign({}, gameData);
  for (let i = 0; i < answers.length; i++) {
    newGame.level += 1;
  }
  return newGame.level;
};

export const calculateAnswerTime = (clickTime) => {
  const startGame = new Date().getTime();
  const answerTime = new Date().getTime() + clickTime * 1000;
  const timerId = setTimeout(() => {
    // Время истекло
    // Вызов функции перехода на следующий экран
  }, 30000);
  if (clickTime >= 0 && clickTime <= 30) {
    clearTimeout(timerId);
    return Math.round((answerTime - startGame) / 1000);
  } else {
    return -1;
  }
};
