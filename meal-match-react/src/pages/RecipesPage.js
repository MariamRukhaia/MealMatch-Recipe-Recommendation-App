// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

// const API_KEY = "b00ad537e8ee44d696dd0450de9a8a68"

// const RecipesPage = () => {
//     const [recipes, setRecipes] = useState([]);
//     const [searchParams] = useSearchParams();
//     const cuisines = searchParams.get("cuisines"); // Read selected cuisines from URL

//     useEffect(() => {
//         if (!cuisines) return;

//         const fetchRecipes = async () => {
//             try {
//                 const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
//                     params: {
//                         apiKey: API_KEY,
//                         cuisine: cuisines,
//                         number: 5 // Adjust the number of recipes displayed
//                     }
//                 });
//                 setRecipes(response.data.results);
//             } catch (error) {
//                 console.error("Error fetching recipes:", error);
//             }
//         };

//         fetchRecipes();
//     }, [cuisines]);

//     return (
//         <div>
//             <h2>Recipes for {cuisines}</h2>
//             <div className="recipe-container">
//                 {recipes.length > 0 ? (
//                     recipes.map((recipe) => (
//                         <div key={recipe.id} className="recipe-card">
//                             <img src={recipe.image} alt={recipe.title} />
//                             <h3>{recipe.title}</h3>
//                         </div>
//                     ))
//                 ) : (
//                     <p>Loading recipes...</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default RecipesPage;
