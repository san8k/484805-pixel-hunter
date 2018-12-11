import IntroView from '../views/intro-view';
import Application from '../application';

export default class IntroScreen {
  constructor() {
    this.intro = new IntroView();
    this.intro.onClickNext = () => {
      Application.showGreeting();
    };
    return this.intro.element;
  }
}
