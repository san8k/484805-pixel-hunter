// export const createDomElement = (template, ...classes) => {
//   const domElement = document.createElement(`section`);
//   domElement.classList.add(...classes);
//   domElement.innerHTML = template;
//   return domElement;
// };

// export const createHeader = (template) => {
//   const header = document.createElement(`header`);
//   header.classList.add(`header`);
//   header.innerHTML = template;
//   return header;
// };

export const createDomTemplate = (string) => {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content;
};
