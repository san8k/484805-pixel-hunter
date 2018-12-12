import * as gameData from '../data/game-data';
import * as util from '../util';
import Application from '../application';
import HeaderView from '../views/header-view';
import TwoPicturesView from '../views/two-pictures-view';
import OnePictureView from '../views/one-picture-view';
import ThreePicturesView from '../views/three-pictures-view';

export default class GameScreen {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this.questionIndex = this.gameModel.index;
    this.header = new HeaderView(this.gameModel._state);
    this.currentQuestion = this.changeQuestion(this.gameModel.index);
    this.mainNode = document.createElement(`div`);
    this.start();

    this.header.onClickBack = () => {
      Application.showGreeting();
    };

    this.currentQuestion.onAnswer = (answers) => {
      let index = this.currentQuestion.questionIndex;

      switch (index) {
        case (0):
          if (answers[0] === this.gameModel.questionsList[0][`answers`][0][`type`] && answers[1] === this.gameModel.questionsList[0][`answers`][1][`type`]) {
            this.gameModel._state.answersList.push(gameData.results.correct[0]);
          } else {
            this.gameModel._state.answersList.push(gameData.results.wrong);
            this.gameModel.takeLife();
          }
          break;
        case (1):
          if (answers === this.gameModel.questionsList[1][`answers`][0][`type`]) {
            this.gameModel._state.answersList.push(gameData.results.correct[0]);
          } else {
            this.gameModel._state.answersList.push(gameData.results.wrong);
            this.gameModel.takeLife();
          }
          break;
        case (2):
          if (this.gameModel.questionsList[2][`answers`][answers][`type`] === `paint`) {
            this.gameModel._state.answersList.push(gameData.results.correct[0]);
          } else {
            this.gameModel._state.answersList.push(gameData.results.wrong);
            this.gameModel.takeLife();
          }
          break;
      }
      this.stopTimer();
      this.gameModel.nextIndex();
      this.gameModel.nextLevel();
      if (this.gameModel.isDead() || this.gameModel.isMaxLevel()) {
        Application.showStats(this.gameModel);
      } else {
        this.updateHeader();
        this.updateContent();
      // console.log(`next question
      // level: ${this.gameModel._state.level}
      // index model: ${this.gameModel.index}
      // lives: ${this.gameModel._state.lives}
      // answers: ${this.gameModel._state.answersList}`);
      }
    };
    return this.mainNode;
  }
  changeQuestion(index) {
    if (index === 0) {
      return new TwoPicturesView(this.gameModel);
    } else if (index === 1) {
      return new OnePictureView(this.gameModel);
    } else {
      return new ThreePicturesView(this.gameModel);
    }
  }

  start() {
    this.mainNode.innerHTML = ``;
    this.mainNode.appendChild(this.header.element);
    this.mainNode.appendChild(this.currentQuestion.element);
    this.startTimer();
  }

  updateContent() {
    this.gameModel.resetTimer();
    this.startTimer();

    this.currentQuestion = this.changeQuestion(this.gameModel.index);

    this.mainNode.appendChild(this.currentQuestion.element);
    util.changeScreen(this.mainNode);
  }

  updateHeader(state) {

    const newHeader = new HeaderView(state);
    this.mainNode.appendChild(newHeader.element);

  }

  tick() {
    this.gameModel._state.time--;
    this.updateHeader(this.gameModel._state);
    // console.log(this.gameModel._state.time);
  }

  startTimer() {
    this.timer = setTimeout(() => {
      this.tick();
      this.startTimer();
    }, 1000);
    if (this.gameModel._state.time === 0) {
      this.stopTimer();
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

}
