import {changeScreen} from '../util';
import StatsView from '../views/stats-view';
import showGreeting from './greeting';

export default (state) => {
  const stats = new StatsView(state);
  stats.onClickBack = () => {
    changeScreen(showGreeting());
  };

  return stats.element;
};

