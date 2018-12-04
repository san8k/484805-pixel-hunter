import {createDomTemplate} from './create-dom-template';

export default class AbstractView {
  get template() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }

    return this._element;
  }

  render() {
    return createDomTemplate(this.template);
  }

  bind() {}

}
