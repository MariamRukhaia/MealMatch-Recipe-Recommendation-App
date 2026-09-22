import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;

const fetchRecipeByIngredientsArray = async (ingredients) => {
    let allRecipes = [];
    let offset = 0;
    const limit = 100;

    while (true) {
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            headers: { 'x-api-key': apiKey },
            params: {
                'ingredients': ingredients,
                'number': limit,
                'offset': offset
            },
        });

        const recipes = response.data;
        if (!recipes || recipes.length === 0) break;

        allRecipes = [...allRecipes, ...recipes];
        offset += limit;

        if (allRecipes.length >= 1000) break; // Adjust as needed
    }

    return allRecipes;
};

export default fetchRecipeByIngredientsArray;
