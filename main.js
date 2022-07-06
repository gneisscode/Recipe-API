const recipe_btn = document.querySelector("#getRecipe");
const recipe_container = document.querySelector("#recipe");
const home=document.querySelector("#header");


recipe_btn.addEventListener("click", async () => {
  let recipe_data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  let recipe = await recipe_data.json();
  console.log(recipe);
  createRecipe(recipe.meals[0]);
});


const createRecipe = (recipe) => {
  const ingredients = [];
  // Get all the ingrdients from API upto 30 or less.
  for (let i = 1; i <= 30; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(
        `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
      );
    } else {
      // Stop the loop if there are no more ingredients.
      break;
    }
  }

  recipe_container.innerHTML = `
        <div class="cont">
            <div class="row">
                <div class="left">
                <h2>${recipe.strMeal}</h2>
                <img src="${
                  recipe.strMealThumb
                }" alt="recipe Image" class="recipe-image">
                ${
                  recipe.strCategory
                    ? `<p><strong>Category: </strong>${recipe.strCategory}</p>`
                    : ""
                }
                ${
                  recipe.strArea
                    ? `<p><strong>Area: </strong>${recipe.strArea}</p>`
                    : ""
                }
                ${
                  recipe.strTags
                    ? `<p><strong>Tags: </strong>${recipe.strTags
                        .split(",")
                        .join(", ")}</p>`
                    : ""
                }
                <h5>Ingredients: </h5>
                <ul>
                    ${ingredients
                      .map((ingredient) => `<li>${ingredient}</li>`)
                      .join("")}
                </ul>
                </div>
                <div class="right">
                <h3 class="instructions">Cooking Intructions</h3>
                <p>${recipe.strInstructions}</p>
            
                ${
                  recipe.strYoutube
                    ? `
                <h3 class= "video">Video Recipe</h3>
                <div class="videoWrapper">
                    <iframe width="420" height="315" src="https://www.youtube.com/embed/${recipe.strYoutube.slice(
                      -11
                    )}">
                </div>
                </div>
        </div>
        </div>
        `
                    : ""
                };
    `;
};
