// CONTROLLER WILL ACT AS A BRIDGE
// MAIN JAVASCRIPT FILE

// imports everything from model.js file
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

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
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function() {
  recipeView.addHandleRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
