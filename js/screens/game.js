import * as data from '../data/game-data';
import {changeScreen} from '../util';
import showStats from './stats';
import * as gameView from '../views/game-view';
import showGreeting from './greeting';

export const showGame = (questions, index, state) => {

  const getNextIndex = () => {
    const MAX_INDEX = 2;
    if (index + 1 > MAX_INDEX) {
      return 0;
    }
    return index + 1;
  };

  const getTrueAnswer = () => {
    state.answersList.push(data.results.correct[0]);
    if (state[`lives`] === data.LIVES.death || state[`level`] === data.MAX_LEVEL || state[`answersList`].length === data.MAX_LEVEL) {
      changeScreen(showStats(state));
    } else {
      state.level += 1;
      changeScreen(showGame(questions, getNextIndex(), Object.assign({}, state)));
    }
  };

  const getFalseAnswer = () => {
    state.answersList.push(data.results.wrong);
    if (state[`lives`] === data.LIVES.death || state[`level`] === data.MAX_LEVEL || state[`answersList`].length === data.MAX_LEVEL) {
      changeScreen(showStats(state));
    } else {
      state.level += 1;
      state.lives -= 1;
      changeScreen(showGame(questions, getNextIndex(), Object.assign({}, state)));
    }
  };

  if (index === 0) {
    const gameScreen = new gameView.GuessForEach(questions, index, state);

    gameScreen.onChangeTrueAnswer = () => {
      getTrueAnswer();
    };

    gameScreen.onChangeFalseAnswer = () => {
      getFalseAnswer();
    };

    gameScreen.onCLickBack = () => {
      changeScreen(showGreeting());
    };

    return gameScreen.element;

  } else if (index === 1) {
    const gameScreen = new gameView.GuessForOne(questions, index, state);

    gameScreen.onChangeTrueAnswer = () => {
      getTrueAnswer();
    };

    gameScreen.onChangeFalseAnswer = () => {
      getFalseAnswer();
    };

    gameScreen.onCLickBack = () => {
      changeScreen(showGreeting());
    };

    return gameScreen.element;

  } else {
    const gameScreen = new gameView.FindPainting(questions, index, state);

    gameScreen.onChangeTrueAnswer = () => {
      getTrueAnswer();
    };

    gameScreen.onChangeFalseAnswer = () => {
      getFalseAnswer();
    };

    gameScreen.onCLickBack = () => {
      changeScreen(showGreeting());
    };

    return gameScreen.element;

  }
};
