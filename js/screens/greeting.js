import GreetingView from '../views/greeting-view';
import Application from '../application';

export default class GreetingScreen {
  constructor() {
    this.greeting = new GreetingView();
    this.greeting.onClickNext = () => {
      Application.showRules();
    };
    return this.greeting.element;
  }
}
