import * as gameData from '../data/game-data';
import * as util from '../util';
import showStats from './stats';
import showGreeting from './greeting';
import Application from '../application';
import HeaderView from '../views/header-view';
import TwoPicturesView from '../views/two-pictures-view';
import OnePictureView from '../views/one-picture-view';
import ThreePicturesView from '../views/three-pictures-view';

let game;
const tick = () => {
  game = Object.assign({}, game, {time: game.time - 1});
  updateHeader(game);
};

let timer;
const startTimer = () => {
  timer = setTimeout(() => {
    tick();
    startTimer();
  }, 1000);
};
const stopTimer = () => {
  clearTimeout(timer);
};

// const changeLevel = (ggame, level) => {
//   return Object.assign({}, ggame, {
//     level
//   });
// };

// const changeQuestion = (level) => {
//   let currentLevel = level;
//   if (currentLevel = 0) {

//   }
// };

const startGame = () => {
  game = Object.assign({}, gameData.INITIAL_GAME_DATA);
  startTimer();
};

const updateHeader = (state) => {

};

export default class GameScreen {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this.questionIndex = this.gameModel.index;
    this.header = new HeaderView(this.gameModel._state);
    this.currentQuestion = this.changeQuestion(this.gameModel._state.level);
    this.mainNode = document.createElement(`div`);
    this.start();

    this.header.onClickBack = () => {
      Application.showGreeting();
    };

    this.currentQuestion.onAnswer = (answers) => {
      let index = this.currentQuestion.questionIndex;
      // this.gameModel.nextLevel();
      // this.questionIndex++;
      // console.log(`level ` + this.gameModel._state.level);
      // Application.showGame();
      // console.log(`qindex ` + this.questionIndex);

      switch (index) {
        case (0):
          if (answers[0] === this.gameModel.questionsList[0][`answers`][0][`type`] && answers[1] === this.gameModel.questionsList[0][`answers`][1][`type`]) {
            this.gameModel._state.answersList.push(gameData.results.correct[0]);
          } else {
            this.gameModel._state.answersList.push(gameData.results.wrong);
          }
          break;
        case (1):
          if (answers === this.gameModel.questionsList[1][`answers`][0][`type`]) {
            this.gameModel._state.answersList.push(gameData.results.correct[0]);
          } else {
            this.gameModel._state.answersList.push(gameData.results.wrong);
          }
          break;
        case (2):
          if (this.gameModel.questionsList[2][`answers`][answers][`type`] === `paint`) {
            this.gameModel._state.answersList.push(gameData.results.correct[0]);
          } else {
            this.gameModel._state.answersList.push(gameData.results.wrong);
          }
          break;
      }


    };
    return this.mainNode;
  }

  changeQuestion() {
    if (this.questionIndex === 0) {
      return new TwoPicturesView(this.gameModel);
    } else if (this.questionIndex === 1) {
      return new OnePictureView(this.gameModel);
    } else {
      return new ThreePicturesView(this.gameModel);
    }
  }

  start() {
    this.mainNode.
      appendChild(this.header.element).
      appendChild(this.currentQuestion.element);
  }
}

{



const canContinue = (game) => game.lives - 1 > 0;

const die = (game) => {
  if (!canContinue(game)) {
    throw new Error(`You can't continue anymore`);
  }

  const lives = game.lives - 1;

  return Object.assign({}, game, {
    lives
  });
};

const getLevel = () => QUEST[`level-${game.level}`];

  const updateGame = (state) => {
    headerElement.innerHTML = renderHeader(state);
    levelElement.innerHTML = renderLevel(getLevel(state.level));
  };


}

// export const showGame = (questions, index, state) => {

//   const getNextIndex = () => {
//     const MAX_INDEX = 2;
//     if (index + 1 > MAX_INDEX) {
//       return 0;
//     }
//     return index + 1;
//   };

//   const getTrueAnswer = () => {
//     state.answersList.push(gameData.results.correct[0]);
//     if (state[`lives`] === gameData.LIVES.death || state[`level`] === gameData.MAX_LEVEL || state[`answersList`].length === gameData.MAX_LEVEL) {
//       changeScreen(showStats(state));
//     } else {
//       state.level += 1;
// changeScreen(showGame(questions, getNextIndex(), Object.assign({}, state)));
//     }
//   };

//   const getFalseAnswer = () => {
//     state.answersList.push(gameData.results.wrong);
//     if (state[`lives`] === gameData.LIVES.death || state[`level`] === gameData.MAX_LEVEL || state[`answersList`].length === gameData.MAX_LEVEL) {
//       changeScreen(showStats(state));
//     } else {
//       state.level += 1;
//       state.lives -= 1;
//       changeScreen(showGame(questions, getNextIndex(), Object.assign({}, state)));
//     }
//   };

//   if (index === 0) {
//     const gameScreen = new gameView.GuessForEach(questions, index, state);

//     gameScreen.onChangeTrueAnswer = () => {
//       getTrueAnswer();
//     };

//     gameScreen.onChangeFalseAnswer = () => {
//       getFalseAnswer();
//     };

//     gameScreen.onCLickBack = () => {
//       changeScreen(showGreeting());
//     };

//     return gameScreen.element;

//   } else if (index === 1) {
//     const gameScreen = new gameView.GuessForOne(questions, index, state);

//     gameScreen.onChangeTrueAnswer = () => {
//       getTrueAnswer();
//     };

//     gameScreen.onChangeFalseAnswer = () => {
//       getFalseAnswer();
//     };

//     gameScreen.onCLickBack = () => {
//       changeScreen(showGreeting());
//     };

//     return gameScreen.element;

//   } else {
//     const gameScreen = new gameView.FindPainting(questions, index, state);

//     gameScreen.onChangeTrueAnswer = () => {
//       getTrueAnswer();
//     };

//     gameScreen.onChangeFalseAnswer = () => {
//       getFalseAnswer();
//     };

//     gameScreen.onCLickBack = () => {
//       changeScreen(showGreeting());
//     };

//     return gameScreen.element;

//   }
// };


