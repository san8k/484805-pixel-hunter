import {changeScreen} from '../util';
import {showGame} from './game';
import * as data from '../data/game-data';
import RulesView from '../views/rules-view';
import showGreeting from './greeting';

export default () => {
  const rules = new RulesView();

  rules.onClickNext = () => {
    changeScreen(showGame(data.questions, 0, Object.assign({}, data.INITIAL_GAME_DATA, {'answersList': []})));
  };
  rules.onCLickBack = () => {
    changeScreen(showGreeting());
  };

  return rules.element;
};
