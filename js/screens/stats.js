import StatsView from '../views/stats-view';
import HeaderView from '../views/header-view';
import Application from '../application';

export default class StateScreen {
  constructor(results) {
    this.header = new HeaderView();
    this.stats = new StatsView(results);
    const mainNode = document.createElement(`div`);
    mainNode.
      appendChild(this.header.element).
      appendChild(this.stats.element);
    this.header.onClickBack = () => {
      Application.showGreeting();
    };
    return mainNode;
  }
}
