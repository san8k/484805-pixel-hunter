import {changeScreen} from '../util';
import showGreeting from './greeting';
import IntroView from '../views/intro-view';

export default () => {
  const intro = new IntroView();
  intro.onClickNext = () => {
    changeScreen(showGreeting());
  };

  return intro.element;
};

