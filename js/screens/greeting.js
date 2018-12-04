import {changeScreen} from '../util';
import showRules from './rules';
import GreetingView from '../views/greeting-view';

export default () => {
  const greeting = new GreetingView();
  greeting.onClickNext = () => {
    changeScreen(showRules());
  };

  return greeting.element;
};

