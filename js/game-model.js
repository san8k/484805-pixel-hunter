import * as gameData from './data/game-data';

export default class GameModel {
  constructor(downloadedData, playerName = ``) {

    this.questionsList = downloadedData;
    this.playerName = playerName;
    this.restart();
    this.setQuestionIndex();
  }

  get state() {
    return this._state;
  }

  setQuestionIndex() {
    this.index = 0;
  }

  nextIndex() {
    this.index++;
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

  restart() {
    this._state = Object.assign({}, gameData.INITIAL_GAME_DATA, {'answersList': []});
  }

  resetTimer() {
    this._state.time = gameData.AnswerTime.MAX;
  }

  isTimeOut() {
    return this._state.time < 0;
  }

  getAnswerTime() {
    return gameData.AnswerTime.MAX - this._state.time;
  }

  getAnswerSpeedType() {
    if (this.getAnswerTime() <= gameData.AnswerTime.FAST) {
      this._state.answersList.push(gameData.Results.FAST);
    } else if (this.getAnswerTime() <= gameData.AnswerTime.SLOW) {
      this._state.answersList.push(gameData.Results.CORRECT);
    } else {
      this._state.answersList.push(gameData.Results.SLOW);
    }
  }

  getTimerId() {}

}

