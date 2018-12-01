import {changeScreen} from '../util';
import {createDomTemplate} from '../create-dom-element';
import showGreetingScreen from './greeting';

export default () => {
  const moduleContent = createDomTemplate(`
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
  `);

  const asterisk = moduleContent.querySelector(`.intro__asterisk`);
  asterisk.addEventListener(`click`, () => {
    changeScreen(showGreetingScreen());
  });

  return moduleContent;
};

