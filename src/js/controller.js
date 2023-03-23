// CONTROLLER WILL ACT AS A BRIDGE

// imports everything from model.js file
import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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
    alert(`There is an ERRORRR ${err}`);
  }
};

// Only show recipe if the hash changes(#)
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
