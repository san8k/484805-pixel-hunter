'use strict';

(function () {

  const body = document.querySelector(`body`);
  const mainNode = document.querySelector(`#main`);
  const intro = document.querySelector(`#intro`);
  const greeting = document.querySelector(`#greeting`);
  const rules = document.querySelector(`#rules`);
  const gameOne = document.querySelector(`#game-1`);
  const gameTwo = document.querySelector(`#game-2`);
  const gameThree = document.querySelector(`#game-3`);
  const stats = document.querySelector(`#stats`);

  const screensList = [intro, greeting, rules, gameOne, gameTwo, gameThree, stats];

  let currentScreenNumber = 1;

  const showScreen = (screenNumber) => {

    if (screenNumber < 0 || screenNumber > screensList.length - 1) {
      return;
    }

    mainNode.innerHTML = ``;
    currentScreenNumber = screenNumber;
    let currentTemplate = screensList[screenNumber]
      .content
      .cloneNode(true);
    mainNode.appendChild(currentTemplate);

  };

  const onClickArrow = (event) => {

    if (event.key === `ArrowLeft`) {
      event.preventDefault();
      showScreen(currentScreenNumber - 1);
    } else if (event.key === `ArrowRight`) {
      event.preventDefault();
      showScreen(currentScreenNumber + 1);
    }

  };

  document.addEventListener(`keydown`, onClickArrow);

  showScreen(currentScreenNumber);

  const arrowsButtons = document.createElement(`div`);
  arrowsButtons.classList.add(`arrows__wrap`);
  arrowsButtons.innerHTML = `
    <style>
      .arrows__wrap {
        position: absolute;
        top: 95px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>
  `;

  body.appendChild(arrowsButtons);
  const navigationArrows = document.querySelectorAll(`.arrows__btn`);

  navigationArrows[0].addEventListener(`click`, () => {
    showScreen(currentScreenNumber - 1);
  });

  navigationArrows[1].addEventListener(`click`, () => {
    showScreen(currentScreenNumber + 1);
  });

})();
