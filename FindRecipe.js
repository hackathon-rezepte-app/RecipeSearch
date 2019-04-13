const static = [
  {
    name: "Fruit Salad",
    ingredients: ["banana", "apple", "strawberry"]
  },
  {
    name: "Vodka Energy",
    ingredients: ["Red Bull", "Vodka"]
  }
];

function getDifference(recipes, givenIngredients) {
  return recipes
    .map(recipe => ({
    ...recipe,
    uses: recipe.ingredients.filter(
      ingredient => givenIngredients.indexOf(ingredient) !== -1
    ),
    needs: recipe.ingredients.filter(
      ingredient => givenIngredients.indexOf(ingredient) === -1
    )
    }))
    .filter(recipe => recipe.uses.length > 0);
}

module.exports = async function(context, req) {
  if (req.query.name || (req.body && req.body.ingredients)) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        recipes: getDifference(static, req.body.ingredients)
      }
    };
  } else {
    context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    };
  }
};
