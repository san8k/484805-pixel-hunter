export const createDomElement = (template, ...classes) => {
  const domElement = document.createElement(`section`);
  domElement.classList.add(...classes);
  domElement.innerHTML = template;
  return domElement;
};
