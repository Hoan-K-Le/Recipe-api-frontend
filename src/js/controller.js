// CONTROLLER WILL ACT AS A BRIDGE
// MAIN JAVASCRIPT FILE

// imports everything from model.js file
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// parcel
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async () => {
  try {
    // Grabbing the id by the clicking on the recipe
    // and slicing the # in the beginning of the id
    const id = window.location.hash.slice(1);
    console.log(id);

    // if there is no id then render the page normally
    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering the recipe
    // receive the data from step 1 and passing it into the render method and then stores it in the this.#data in the recipeView js file
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// a function to search up the recipe
const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    console.log(resultsView);

    // 1) Get Search Query
    const query = searchView.getQuery();
    // If there isn't then keep going with the application
    if (!query) return;

    // 2) Load the search results(this file from model)
    // it is fetching the results with the query at the end of the api site
    await model.loadSearchResults(query);

    // 3) Render the results
    // All the results
    // resultsView.render(model.state.search.results);
    // Some of the results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function(goToPage) {
  // Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render NEW pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.render(model.state.recipe);
};

const init = function() {
  recipeView.addHandleRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  controlServings();
};
init();
