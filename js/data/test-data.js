import * as data from './game-data';

export const testResults = [ // Тестовые данные для отображения шкалы ответов
  data.results.correct[0],
  data.results.correct[1],
  data.results.correct[2],
  data.results.wrong,
  data.results.wrong,
  data.results.correct[0],
  data.results.correct[1],
  data.results.correct[2],
  data.results.unknown,
  data.results.unknown
];

export const averageAnswers = [
  data.results.correct[0],
  data.results.correct[0],
  data.results.correct[0],
  data.results.correct[0],
  data.results.correct[0],
  data.results.correct[0],
  data.results.correct[0],
  data.results.correct[0],
  data.results.correct[0],
  data.results.correct[0]
];

export const failGame = [
  data.results.correct[0],
  data.results.correct[2],
  data.results.wrong,
  data.results.wrong,
  data.results.wrong,
  data.results.wrong
];
