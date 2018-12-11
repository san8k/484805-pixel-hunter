import * as gameData from '../data/game-data';
import RulesView from '../views/rules-view';
import HeaderView from '../views/header-view';
import Application from '../application';

export default class RulesScreen {
  constructor() {
    this.header = new HeaderView();
    this.rules = new RulesView();
    const mainNode = document.createElement(`div`);
    mainNode.
      appendChild(this.header.element).
      appendChild(this.rules.element);
    this.rules.onClickNext = () => {
      Application.showGame();
    };
    this.header.onClickBack = () => {
      Application.showGreeting();
    };
    return mainNode;
  }
}
// gameData.questions, 0, Object.assign({}, gameData.INITIAL_GAME_DATA, {'answersList': []})
