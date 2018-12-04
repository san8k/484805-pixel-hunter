import {changeScreen} from '../util';
import StatsView from '../views/stats-view';
import showGreeting from './greeting';

export default () => {
  const stats = new StatsView();
  stats.onClickBack = () => {
    changeScreen(showGreeting());
  };

  return stats.element;
};

