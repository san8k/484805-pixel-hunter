import {changeScreen} from './util';
import GameModel from './game-model';
import IntroScreen from './screens/intro';
import GreetingScreen from './screens/greeting';
import RulesScreen from './screens/rules';
import GameScreen from './screens/game';
import StatsScreen from './screens/stats';
import ErrorScreen from './screens/error';
import Loader, {loadedData} from './loader';
import ConfirmScreen from './screens/confirm';

export default class Application {

  static start() {
    Application.showIntro();
    Loader.loadData();
  }

  static getGameModel() {
    this.gameModel = new GameModel(loadedData);
  }

  static showIntro() {
    this.intro = new IntroScreen();
    changeScreen(this.intro);
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    changeScreen(greeting);
    greeting.classList.add(`greeting__show`);
  }

  static showRules() {
    this.getGameModel();
    const rules = new RulesScreen(this.gameModel);
    changeScreen(rules);
  }

  static showGame() {
    const game = new GameScreen(this.gameModel);
    changeScreen(game);
  }

  static showStats(model) {
    const playerName = model.playerName;
    const postData = {
      'playerName': playerName,
      'answers': model._state.answersList,
      'lives': model._state.lives
    };

    Loader.saveResults(postData, playerName).
    then(() => Loader.loadResults(playerName)).
    then((resultsData) => {
      const stats = new StatsScreen(resultsData);
      changeScreen(stats);
    }).
    catch(Application.showError);
  }

  static showError(error) {
    const errorPopup = new ErrorScreen(error);
    const body = document.querySelector(`body`);
    body.appendChild(errorPopup);
  }

  static showConfirm() {
    const confirmPopup = new ConfirmScreen();
    const body = document.querySelector(`body`);
    body.appendChild(confirmPopup);
  }

  static introToGreeting() {
    this.intro.classList.add(`intro__out`);
    setTimeout(() => {
      this.showGreeting();
    }, 1000);
  }
}
