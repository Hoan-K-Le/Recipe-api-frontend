// STATE MODEL WHICH CONTAINS RECIPE/SEARCH/BOOKMARK AND EXPORTING IT TO OTHER JS FILE

import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {}
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

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
    console.log(recipe);
  } catch (err) {
    throw err;
  }
};
