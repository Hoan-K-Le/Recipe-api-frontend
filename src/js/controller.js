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

const showRecipe = async () => {
  try {
    const res = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc13'
    );
    const data = await res.json();
    // Throws a new error
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Destructoring so it does not get long(Ex.. data.data.recipe => {recipe} = data.data)
    let { recipe } = data.data;

    // creating an object so we do not have to write long code
    // For example(recipe.cooking_time)
    // Making it an object will make it shorter and easier (recipe.cookingTime)
    recipe = {
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
    alert(`There is an ERRORRR ${err}`);
  }
};

showRecipe();
