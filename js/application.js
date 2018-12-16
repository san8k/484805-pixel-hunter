import {changeScreen} from './util';
import GameModel from './game-model';
import IntroScreen from './screens/intro';
import GreetingScreen from './screens/greeting';
import RulesScreen from './screens/rules';
import GameScreen from './screens/game';
import StatsScreen from './screens/stats';
import ErrorScreen from './screens/error';

const DATA_URL = `https://es.dump.academy/pixel-hunter/questions`;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }
};

let loadedData;

export default class Application {

  static start() {
    Application.showIntro();
    window.fetch(DATA_URL).
    then(checkStatus).
    then((response) => {
      return response.json();
    }).
    then((data) => {
      loadedData = data;
      return loadedData;
    }).
    then(() => this.showGreeting()).
    catch(this.showError);

  }

  static getGameModel() {
    this.gameModel = new GameModel(loadedData);
  }

  static showIntro() {
    const intro = new IntroScreen();
    changeScreen(intro);
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    changeScreen(greeting);
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
    const stats = new StatsScreen(model);
    changeScreen(stats);
  }

  static showError(error) {
    const errorScreen = new ErrorScreen(error);
    const body = document.querySelector(`body`);
    body.appendChild(errorScreen);
  }
}
