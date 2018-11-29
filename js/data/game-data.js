export const MAX_LEVEL = 10;

export const ANSWER_TIME = {
  fast: 10,
  slow: 20,
  max: 30
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
  level: 1,
  lives: LIVES.start,
  time: ANSWER_TIME.max,
  answersList: []
});

export const answersList = []; // не забыть удалить, только для теста
export const pictures = {
  paintings: [
    `https://k42.kn3.net/CF42609C8.jpg`,
    `https://k42.kn3.net/D2F0370D6.jpg`,
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    `http://i.imgur.com/1KegWPz.jpg`,
    `https://i.imgur.com/DiHM5Zb.jpg`,
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

export const results = {
  correct: [`correct`, `slow`, `fast`],
  wrong: `wrong`,
  unknown: `unknown`
};

export const questions = [
  {
    task: `guessForEach`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        picture: pictures.paintings[0],
        type: `paint`,
        width: 468,
        height: 458
      },
      {
        picture: pictures.photos[2],
        type: `photo`,
        width: 468,
        height: 458
      }
    ]
  },
  {
    task: `guessForOne`,
    title: `Угадай, фото или рисунок?`,
    answers: [
      {
        picture: pictures.paintings[1],
        type: `paint`,
        width: 705,
        height: 455
      }
    ]
  },
  {
    task: `findPainting`,
    title: `Найдите рисунок среди изображений`,
    answers: [
      {
        picture: pictures.paintings[2],
        type: `paint`
      },
      {
        picture: pictures.photos[0],
        type: `photo`
      },
      {
        picture: pictures.photos[1],
        type: `photo`
      }
    ]
  }
];

export const testResults = [
  results.correct[0],
  results.correct[1],
  results.correct[2],
  results.wrong,
  results.wrong,
  results.correct[0],
  results.correct[1],
  results.correct[2],
  results.unknown,
  results.unknown
];

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

const currentAnswerPoints = (currentAnswer) => {
  const {isCorrectAnswer, time} = currentAnswer;
  let answerPoints = POINTS.correct;
  if (!isCorrectAnswer || time > ANSWER_TIME.max) {
    return 0;
  }
  if (time < ANSWER_TIME.fast) {
    answerPoints += POINTS.fast;
  }
  if (time > ANSWER_TIME.slow) {
    answerPoints += POINTS.slow;
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
      newGame.points += POINTS.lifeBonus * 3;
      break;
    case 2:
      newGame.points += POINTS.lifeBonus * 2;
      break;
    case 1:
      newGame.points += POINTS.lifeBonus;
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


