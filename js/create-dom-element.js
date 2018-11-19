export const createDomElement = (template, ...classes) => {
  const domElement = document.createElement(`section`);
  if (classes.length > 1) {
    for (let i = 0; i < classes.length; i++) {
      domElement.classList.add(classes[i]);
    }
  }
  domElement.classList.add(classes);
  domElement.innerHTML = template;
  return domElement;
};
