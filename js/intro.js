import {changeScreen} from './util';
import {createDomElement} from './create-dom-element';
import greetingScreen from './greeting';

const moduleContent = createDomElement(`
  <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
`, `intro`);

const asterisk = moduleContent.querySelector(`.intro__asterisk`);
asterisk.addEventListener(`click`, () => {
  changeScreen(greetingScreen);
});

export default moduleContent;
