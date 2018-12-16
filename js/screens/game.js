import * as gameData from '../data/game-data';
import Application from '../application';
import HeaderView from '../views/header-view';
import TwoPicturesView from '../views/two-pictures-view';
import OnePictureView from '../views/one-picture-view';
import ThreePicturesView from '../views/three-pictures-view';

const ONE_SECOND = 1000;

export default class GameScreen {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this.header = new HeaderView(this.gameModel._state);
    this.currentQuestion = this.changeQuestion(this.gameModel.questionsList[this.gameModel.index][`type`]);
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
    this.gameModel.resetTimer();
    this.header = new HeaderView(this.gameModel._state);
    this.mainNode.innerHTML = ``;
    this.mainNode.appendChild(this.header.element);
    this.currentQuestion = this.changeQuestion(this.gameModel.questionsList[this.gameModel.index][`type`]);
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
    this.header.updateTime();
    if (this.gameModel.isTimeOut()) {
      this.gameModel._state.answersList.push(gameData.RESULTS.wrong);
      this.gameModel.takeLife();
      this.checkState();
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.tick();
    }, ONE_SECOND);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  validateAnswers(answers) {

    switch (this.gameModel.questionsList[this.gameModel.index][`type`]) {
      case (`two-of-two`):
        if (answers[0] === this.gameModel.questionsList[this.gameModel.index][`answers`][0][`type`] && answers[1] === this.gameModel.questionsList[this.gameModel.index][`answers`][1][`type`]) {
          this.gameModel.getAnswerSpeedType();
        } else {
          this.gameModel._state.answersList.push(gameData.RESULTS.wrong);
          this.gameModel.takeLife();
        }
        break;
      case (`tinder-like`):
        if (answers === this.gameModel.questionsList[this.gameModel.index][`answers`][0][`type`]) {
          this.gameModel.getAnswerSpeedType();
        } else {
          this.gameModel._state.answersList.push(gameData.RESULTS.wrong);
          this.gameModel.takeLife();
        }
        break;
      case (`one-of-three`):
        if (this.gameModel.questionsList[this.gameModel.index][`answers`][answers][`type`] === this.defineOneOfThreeResult()) {
          this.gameModel.getAnswerSpeedType();
        } else {
          this.gameModel._state.answersList.push(gameData.RESULTS.wrong);
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

  defineOneOfThreeResult() {
    const resultsList = this.gameModel.questionsList[this.gameModel.index][`answers`].map((it) => {
      return it.type;
    });
    if (resultsList.sort()[1] === `photo`) {
      return `painting`;
    }
    return `photo`;
  }

}
