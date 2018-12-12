import * as gameData from './data/game-data';
import * as game from './screens/game';

export default class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.questionsList = gameData.questions;
    this.restart();
    this.getQuestionIndex();
  }

  get state() {
    return this._state;
  }

  getQuestionIndex() {
    this.index = 0;
  }

  nextIndex() {
    this.index++;
    if (this.index > 2) {
      this.index = 0;
    }
  }

  nextLevel() {
    this._state.level++;
  }

  takeLife() {
    this._state.lives--;
  }

  isDead() {
    return this._state.lives < 0;
  }

  isMaxLevel() {
    return this._state.level === gameData.MAX_LEVEL;
  }

  startGame() {

  }

  restart() {
    this._state = Object.assign({}, gameData.INITIAL_GAME_DATA, {'answersList': []});
  }

  tick() {
    this._state = game.tick(this._state);
  }

  resetTimer() {
    this._state.time = gameData.ANSWER_TIME.max;
  }

  isTimeOut() {
    return this._state.time <= 0;
  }

}

