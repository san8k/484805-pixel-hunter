import ErrorView from '../views/error-view';

export default class ErrorScreen {
  constructor(error) {
    this.error = new ErrorView(error);

    return this.error.element;
  }
}


