import View from './view';

import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';

class ShoppingCartView extends View {
  _parentElement = document.querySelector('.shopping-cart__list');

  _generateMarkup() {
    return `
    <h4 class="recipe-title"><a href="#${this._data.id}">${
      this._data.title
    }</a></h4>
    ${this._data.ingredients
      .map(
        ing => `
    <li class="shopping-cart__item">${
      ing.quantity ? fracty(ing.quantity) : ''
    } ${ing.unit ? ing.unit : ''} ${ing.description}</li>
    `
      )
      .join('')}
    `;
  }
}

export default new ShoppingCartView();
