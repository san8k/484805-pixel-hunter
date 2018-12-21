import ConfirmView from '../views/confirm-view';
import Application from '../application';

export default class ConfirmScreen {
  constructor(timerId) {
    this.timerId = timerId;
    this.confirm = new ConfirmView();
    this.confirm.closeModal = () => {
      document.body.removeChild(this.confirm.element);
    };
    this.confirm.onGreeting = () => {
      clearTimeout(this.timerId);
      document.body.removeChild(this.confirm.element);
      Application.showGreeting();
    };

    return this.confirm.element;
  }
}
