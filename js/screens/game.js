import * as gameData from '../data/game-data';
import Application from '../application';
import HeaderView from '../views/header-view';
import TwoPicturesView from '../views/two-pictures-view';
import OnePictureView from '../views/one-picture-view';
import ThreePicturesView from '../views/three-pictures-view';

export default class GameScreen {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this.questionIndex = this.gameModel.index;
    this.questionType = this.gameModel.questionsList[this.questionIndex][`type`];
    this.header = new HeaderView(this.gameModel._state);
    this.currentQuestion = this.changeQuestion(this.questionType);
    this.mainNode = document.createElement(`div`);
    this.start();

    this.header.onClickBack = () => {
      Application.showGreeting();
    };

    this.currentQuestion.onAnswer = (answers) => {
      this.validateAnswers(answers);
    };

    return this.mainNode;
  }
  changeQuestion(type) {
    if (type === `two-of-two`) {
      return new TwoPicturesView(this.gameModel);
    } else if (type === `tinder-like`) {
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
    this.header = new HeaderView(this.gameModel._state);
    this.gameModel.resetTimer();
    this.mainNode.innerHTML = ``;
    this.mainNode.appendChild(this.header.element);
    this.currentQuestion = this.changeQuestion(this.gameModel.index);
    this.mainNode.appendChild(this.currentQuestion.element);
    this.currentQuestion.onAnswer = (answers) => {
      this.validateAnswers(answers);
    };
    this.header.onClickBack = () => {
      Application.showGreeting();
    };
  }

  tick() {
    this.gameModel._state.time--;
    this.header.updateTime(this.gameModel._state);
    if (this.gameModel.isTimeOut()) {
      this.gameModel._state.answersList.push(gameData.results.wrong);
      this.gameModel.takeLife();
      this.checkState();
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.tick();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  validateAnswers(answers) {
    let index = this.currentQuestion.questionIndex;
    switch (index) {
      case (0):
        if (answers[0] === this.gameModel.questionsList[0][`answers`][0][`type`] && answers[1] === this.gameModel.questionsList[0][`answers`][1][`type`]) {
          this.gameModel.getAnswerSpeedType();
        } else {
          this.gameModel._state.answersList.push(gameData.results.wrong);
          this.gameModel.takeLife();
        }
        break;
      case (1):
        if (answers === this.gameModel.questionsList[1][`answers`][0][`type`]) {
          this.gameModel.getAnswerSpeedType();
        } else {
          this.gameModel._state.answersList.push(gameData.results.wrong);
          this.gameModel.takeLife();
        }
        break;
      case (2):
        if (this.gameModel.questionsList[2][`answers`][answers][`type`] === `paint`) {
          this.gameModel.getAnswerSpeedType();
        } else {
          this.gameModel._state.answersList.push(gameData.results.wrong);
          this.gameModel.takeLife();
        }
        break;
    }
    this.checkState();
  }

  checkState() {
    this.stopTimer();
    this.gameModel.nextIndex();
    this.gameModel.nextLevel();
    if (this.gameModel.isDead() || this.gameModel.isMaxLevel()) {
      Application.showStats(this.gameModel);
    } else {
      this.updateContent();
      this.startTimer();
    }
  }

}
