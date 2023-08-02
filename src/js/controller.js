import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipe-view.js';
import searchView from './views/search-view.js';
import resultsView from './views/results-view.js';
import paginationView from './views/pagination-view.js';
import bookmarksView from './views/bookmarks-view.js';
import addRecipeView from './views/addRecipe-view.js';
import shoppingCartView from './views/shoppingCart-view.js';
import View from './views/view.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);
    const { recipe } = model.state;

    recipeView.render(recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    resultsView.renderError();
  }
}

function controlPagination(goTo) {
  resultsView.render(model.getSearchResultsPage(goTo));
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}

function controlBookmarks() {
  if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
    recipeView.update(model.state.recipe);
    controlSavedBookmarks();
    return;
  }

  model.addBookMark(model.state.recipe);
  recipeView.update(model.state.recipe);
  controlSavedBookmarks();
}

function controlSavedBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

async function controlAddRecipe(newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    bookmarksView.render(model.state.bookmarks);

    setTimeout(function () {
      addRecipeView.toggleWindow();
      addRecipeView._renderForm();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.validationError(err);
    // addRecipeView.renderError(err.message);
  }
}

function controlShoppingCart() {
  shoppingCartView.render(model.state.recipe);
}

function newFeature() {
  console.log('WELCOME TO APPLICATION!');
}

function init() {
  bookmarksView.addHandlerRender(controlSavedBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addBookmarkHandler(controlBookmarks);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addPaginationHandler(controlPagination);
  paginationView.addPaginationHandler(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  recipeView.addHandlerShopping(controlShoppingCart);
  newFeature();
}

init();
