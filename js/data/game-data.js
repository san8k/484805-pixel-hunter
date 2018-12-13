export const MAX_LEVEL = 10;

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
