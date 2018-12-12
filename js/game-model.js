import * as gameData from './data/game-data';
import * as game from './screens/game';


export default class GameModel {
  constructor(playerName) {
    this.playerName = playerName;
    this.questionsList = gameData.questions;

    // this.name = ``;
    // this.state = Object.assign({}, gameData.INITIAL_GAME_DATA, {'answersList': []});
    // this.questionIndex = this.questionIndexC();
    this.restart();
    this.questionIndex();

  }

  get state() {
    return this._state;
  }

  questionIndex() {
    let currentIndex;
    if (this._state.level > 2) {
      if (this._state.level % 3 === 0) {
        currentIndex = 0;
      } else if (this._state.level === 4 || this.leve === 7) {
        currentIndex = 1;
      } else {
        currentIndex = 2;
      }
    } else {
      currentIndex = this._state.level;
    }
    this.index = currentIndex;
  }

  nextLevel() {
    this._state.level++;
  }

  // nextLevel() {
  //   this._state = changeLevel(this._state, this._state.level + 1);
  // }

  startGame() {

  }

  restart() {
    this._state = Object.assign({}, gameData.INITIAL_GAME_DATA, {'answersList': []});
  }

  tick() {
    this._state = game.tick(this._state);
  }

  resetTime() {
    this.currentGameState[`time`] = gameData.ANSWER_TIME.max;
  }
}
