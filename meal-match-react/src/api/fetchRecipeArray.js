import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;

const fetchRecipeArray = async (cuisine, diet, allergies) => {
    let allRecipes = [];
    let offset = 0;
    const limit = 100; // Max per request

    while (true) {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            headers: { 'x-api-key': apiKey },
            params: {
                'cuisine': cuisine,
                'diet': diet,
                'intolerances': allergies,
                'number': limit,
                'offset': offset
            },
        });

        const recipes = response.data.results;
        if (!recipes || recipes.length === 0) break; // Stop if no more results

        allRecipes = [...allRecipes, ...recipes];
        offset += limit;

        if (allRecipes.length >= 1000) break; // Adjust this limit as needed
    }

    return allRecipes;
};

export default fetchRecipeArray;
