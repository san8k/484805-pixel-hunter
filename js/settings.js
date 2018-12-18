export const DEBUG_STYLE = `style="background-color:red;"`;

export const isDebug = (name) => {
  if (name === `tester`) {
    return true;
  }
  return false;
};
