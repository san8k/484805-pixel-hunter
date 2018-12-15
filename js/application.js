import {changeScreen} from './util';
import GameModel from './game-model';
import IntroScreen from './screens/intro';
import GreetingScreen from './screens/greeting';
import RulesScreen from './screens/rules';
import GameScreen from './screens/game';
import StatsScreen from './screens/stats';
import ErrorScreen from './screens/error';

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
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`).
    then(checkStatus).
    then((response) => {
      return response.json();
    }).
    then((data) => {
      loadedData = data;
      return loadedData;
    }).
    then((response) => this.showGreeting()).
    catch(this.showError);
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
    const rules = new RulesScreen();
    changeScreen(rules);
  }

  static showGame() {
    const game = new GameScreen(new GameModel(loadedData));
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
