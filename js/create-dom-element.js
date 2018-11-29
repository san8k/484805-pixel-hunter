export const createDomElement = (template, ...classes) => {
  const domElement = document.createElement(`section`);
  domElement.classList.add(...classes);
  domElement.innerHTML = template;
  return domElement;
};

export const createHeader = (template) => {
  const header = document.createElement(`header`);
  header.classList.add(`header`);
  header.innerHTML = template;
  return header;
};
