const ANSWER_TIMER = 30;
const QUICK_ANSWER_TIME = 10;
const LONG_ANSWER_TIME = 20;
const ANSWER_POINTS = 100;
const QUICK_ANSWER_POINTS = 50;
const LONG_ANSWER_POINTS = -50;
const EXTRA_LIFE_POINTS = 50;


export const INITIAL_GAME_DATA = Object.freeze({
  level: 0,
  lives: 3,
  time: ANSWER_TIMER,
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
        type: `paint`
      },
      {
        picture: pictures.photos[2],
        type: `photo`
      }
    ]
  },
  {
    task: `guessForOne`,
    title: `Угадай, фото или рисунок?`,
    answers: [
      {
        picture: pictures.paintings[1],
        type: `paint`
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


