const static = [
  {
    name: "Fruid Salad",
    ingredients: ["Banana", "Apple", "Orange"],
    preparation:
      "Wash fruits, peel them (if necessary) and layer them in a bowl. Mix em up and enjoy.",
    image: "/images/fruitsalad.png"
  },
  {
    name: "Vodka Energy",
    ingredients: ["Vodka", "Red_Bull"],
    preparation: "Mix 10cl Red Bull and 4cl Vodka together. Enjoy",
    image: "/images/drink.png"
  },
  {
    name: "Banana pie",
    ingredients: [
      "Banana",
      "Butter",
      "Sugar",
      "Egg",
      "Flour",
      "Backing Powder"
    ],
    preparation:
      "Preheat the ofen (200 degrees celsius. Stir 125g butter, 125g sugar and 2 eggs until foamy. Mash 2 bananas and stir them in. Mix the 175g flour and 1/2 pack of baking powder and stir in the mixture. Grease a small baking sheet and spread the dough on it. Bake until gold brown for 15 minutes.",
    image: "/images/bananapie.png"
  }
];

function getDifference(recipes, givenIngredients) {
  return recipes
    .map(recipe => ({
      ...recipe,
      ingredients: recipe.ingredients.map(item => item.toLowerCase())
    }))
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
