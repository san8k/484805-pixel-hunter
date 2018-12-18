import AbstractView from '../abstract-view';

export default class ConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="modal">
    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn">Ок</button>
        <button class="modal__btn">Отмена</button>
      </div>
    </form>
  </section>
    `;
  }

  bind() {
    const modalClose = this.element.querySelector(`.modal__close`);
    const modalButtons = this.element.querySelectorAll(`.modal__btn`);
    const modalConfirm = Array.from(modalButtons)[0];
    const modalReject = Array.from(modalButtons)[1];

    modalClose.addEventListener(`click`, () => {
      this.closeModal();
    });

    modalReject.addEventListener(`click`, () => {
      this.closeModal();
    });

    modalConfirm.addEventListener(`click`, () => {
      this.onGreeting();
    });
  }

  closeModal() {}
  onGreeting() {}
}
