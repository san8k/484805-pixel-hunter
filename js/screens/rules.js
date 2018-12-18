import RulesView from '../views/rules-view';
import HeaderView from '../views/header-view';
import Application from '../application';

export default class RulesScreen {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this.header = new HeaderView();
    this.rules = new RulesView(gameModel);
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
    this.rules.saveName = () => {
      this.gameModel.playerName = mainNode.querySelector(`.rules__input`).value.trim();
    };
    return mainNode;
  }
}
