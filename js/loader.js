import Application from './application';

const APP_ID = `16051988`;
const DATA_URL = `https://es.dump.academy/pixel-hunter/questions`;

const getResultUrl = (playerName) => `https://es.dump.academy/pixel-hunter/stats/${APP_ID}-${playerName}`;

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => response.json();

export const downloadedData = {};

export default class Loader {

  static loadData() {

    window.fetch(DATA_URL).
    then(checkStatus).
    then((response) => {
      return response.json();
    }).
    then((data) => {
      downloadedData.questions = data;
      return downloadedData;
    }).
    then(() => Application.introToGreeting()).
    catch(Application.showError);
  }

  static loadResults(name) {
    return fetch(getResultUrl(name)).
    then(checkStatus).
    then(toJSON);
  }

  static saveResults(data, name) {
    return fetch(getResultUrl(name), {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify(data)
    }).
    then(checkStatus);
  }
}
