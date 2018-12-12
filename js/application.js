import {changeScreen} from './util';
import GameModel from './game-model';
import IntroScreen from './screens/intro';
import GreetingScreen from './screens/greeting';
import RulesScreen from './screens/rules';
import GameScreen from './screens/game';
import StatsScreen from './screens/stats';

export default class Application {

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
    const game = new GameScreen(new GameModel());
    changeScreen(game);
  }

  static showStats(model) {
    const stats = new StatsScreen(model);
    changeScreen(stats);
  }
}
