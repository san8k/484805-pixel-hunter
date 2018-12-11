import * as gameData from './data/game-data';

export default class GameModel {
  constructor(data) {
    this.data = data;
    this.resetGame();
  }

  get currentGameState() {
    return this.currentGameState;
  }

  resetGame() {
    this.currentGameState = {
      level: 1,
      lives: gameData.LIVES.start,
      time: gameData.ANSWER_TIME.max,
      answersList: []
    };
  }

  tick() {
    this.currentGameState[`time`]--;
  }

  resetTime() {
    this.currentGameState[`time`] = gameData.ANSWER_TIME.max;
  }
}
