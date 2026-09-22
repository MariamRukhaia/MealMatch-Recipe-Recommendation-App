import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;

const fetchIndividualRecipe = async (id) => {
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            headers: { 'x-api-key': apiKey },
            params: { 'includeNutrition': true }
        });

        const data = response.data;

        return {
            id: data.id,
            imgSrc: data.image,
            imgAlt: data.title,
            title: data.title,
            summary: data.summary,

            // Extract nutrition data
            calories: data.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || "N/A",
            caloriesUnit: data.nutrition?.nutrients?.find(n => n.name === "Calories")?.unit || "g",
            protein: data.nutrition?.nutrients?.find(n => n.name === "Protein")?.amount || "N/A",
            proteinUnit: data.nutrition?.nutrients?.find(n => n.name === "Protein")?.unit || "g",
            sugar: data.nutrition?.nutrients?.find(n => n.name === "Sugar")?.amount || "N/A",
            sugarUnit: data.nutrition?.nutrients?.find(n => n.name === "Sugar")?.unit || "g",
            fats: data.nutrition?.nutrients?.find(n => n.name === "Fat")?.amount || "N/A",
            fatsUnit: data.nutrition?.nutrients?.find(n => n.name === "Fat")?.unit || "g",
            vitC: data.nutrition?.nutrients?.find(n => n.name === "Vitamin C")?.amount || "N/A",
            vitCUnit: data.nutrition?.nutrients?.find(n => n.name === "Vitamin C")?.unit || "mg",

            // Steps
            steps: data.analyzedInstructions.length > 0 
                ? data.analyzedInstructions[0].steps 
                : []
        };
    } catch (error) {
        console.error("Error fetching recipe:", error);
        return null;
    }
};

export default fetchIndividualRecipe;
