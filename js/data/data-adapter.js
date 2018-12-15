const preprocessQuestions = (question) => {

};

export const adaptServerData = (data) => {
  for (const currentQuestion of data) {
    currentQuestion = preprocessQuestions(currentQuestion);
  }

  return data;
};
