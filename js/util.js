const mainElement = document.querySelector(`#main`);

export const changeScreen = (section) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(section);
};

export const showResults = (results) => {
  const resultsNode = [
    `<li class="stats__result stats__result--unknown"></li>`,
    `<li class="stats__result stats__result--unknown"></li>`,
    `<li class="stats__result stats__result--unknown"></li>`,
    `<li class="stats__result stats__result--unknown"></li>`,
    `<li class="stats__result stats__result--unknown"></li>`,
    `<li class="stats__result stats__result--unknown"></li>`,
    `<li class="stats__result stats__result--unknown"></li>`,
    `<li class="stats__result stats__result--unknown"></li>`,
    `<li class="stats__result stats__result--unknown"></li>`,
    `<li class="stats__result stats__result--unknown"></li>`
  ];

  results.map((it, i) => {
    it = `<li class="stats__result stats__result--${it}"></li>`;
    resultsNode[i] = it;
  });

  return resultsNode.join(``);
};
