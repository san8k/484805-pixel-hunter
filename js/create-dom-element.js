export const createDomTemplate = (string) => {
  const div = document.createElement(`div`);
  div.innerHTML = string;
  return div;
};
