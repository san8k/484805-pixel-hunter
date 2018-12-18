import ConfirmView from '../views/confirm-view';
import Application from '../application';

export default class ConfirmScreen {
  constructor() {
    this.confirm = new ConfirmView();
    this.confirm.closeModal = () => {
      document.body.removeChild(this.confirm.element);
    };
    this.confirm.onGreeting = () => {
      document.body.removeChild(this.confirm.element);
      Application.showGreeting();
    };

    return this.confirm.element;
  }
}
