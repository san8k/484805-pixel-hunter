import * as gameData from '../data/game-data';
import * as util from '../util';
import showStats from './stats';
import showGreeting from './greeting';
import Application from '../application';
import HeaderView from '../views/header-view';
import TwoPicturesView from '../views/two-pictures-view';
import OnePictureView from '../views/one-picture-view';
import ThreePicturesView from '../views/three-pictures-view';

const getNextIndex = (index) => {
  const MAX_INDEX = 2;
  if (index + 1 > MAX_INDEX) {
    return 0;
  }
  return index + 1;
};

export default class GameScreen {
  constructor(gameModel) {
    this.gameModel = gameModel;
  }
  start() {

  }
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
//       changeScreen(showGame(questions, getNextIndex(), Object.assign({}, state)));
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


