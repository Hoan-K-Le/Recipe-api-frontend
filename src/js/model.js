// STATE MODEL WHICH CONTAINS RECIPE/SEARCH/BOOKMARK AND EXPORTING IT TO OTHER JS FILE

import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

// State will contain all the data to build our application
export const state = {
  recipe: {},
  // search state to look up the recipe
  search: {
    query: '',
    results: []
  }
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    // Destructoring so it does not get long(Ex.. data.data.recipe => {recipe} = data.data)
    const { recipe } = data.data;

    // creating an object so we do not have to write long code
    // For example(recipe.cooking_time)
    // Making it an object will make it shorter and easier (recipe.cookingTime)
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    };
  } catch (err) {
    throw err;
  }
};

// SEARCH
// Step 1 grab the api to search for a recipe/or items that matches the search input value
// Then import the data to the controller file
export const loadSearchResults = async query => {
  try {
    // store the data into the query, so we can search for the recipe
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    // Putting the data into the search object, and then into the results array
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url
      };
    });
  } catch (err) {
    console.log(`${err} error`);
    throw err;
  }
};
