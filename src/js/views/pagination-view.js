import View from './view';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (this._data.resultsPerPage > this._data.results.length) return '';

    //first page
    if (this._data.page === 1 && numPages > 1) {
      return `
      <div class="pagination--space"></div>
      <div class="page-number"><span>${this._data.page}</span></div>
      <button data-goto="${
        this._data.page + 1
      }"  class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>
      `;
    }

    //last page
    if (this._data.page === numPages && numPages > 1) {
      return `
      <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
      </button>
      <div class="page-number"><span>${this._data.page}</span></div>
      <div class="pagination--space"></div>
      `;
    }

    //other pages
    if (this._data.page < numPages) {
      return `
      <button data-goto="${
        this._data.page - 1
      }"  class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
      <div class="page-number"><span>${this._data.page}</span></div>
      <button data-goto="${
        this._data.page + 1
      }"  class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
  }

  addPaginationHandler(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = +btn.dataset.goto;
      handler(goTo);
    });
  }
}

export default new paginationView();
