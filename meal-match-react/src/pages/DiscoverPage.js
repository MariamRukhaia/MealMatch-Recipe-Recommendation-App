import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import RecipeCard from "../components/RecipeCard";
import fetchRecipeArray from "../api/fetchRecipeArray";
import fetchRecipeByIngredientsArray from "../api/fetchRecipeByIngredientsArray";
import fetchIndividualRecipe from "../api/fetchIndividualRecipe";

const DiscoverPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [diet, setDiet] = useState("");
  const [allergies, setAllergies] = useState("");

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/user-preferences", {withCredentials: true,});

        if (response.status === 200) {
          setDiet(response.data.diets || ""); 
          setAllergies(response.data.allergies || ""); 
        }
      } catch (error) {
        console.error("Error fetching user preferences:", error.response?.data?.error || error.message);
      }
    };

    fetchUserPreferences();
  }, []);

  useEffect(() => {
    if (!diet && !allergies) return; // ✅ Fetch recipes only after diet & allergies are loaded

    const fetchData = async () => {
      try {
        const cuisine = localStorage.getItem("selectedCuisines");
        const ingredients = localStorage.getItem("selectedIngredients");

        // Fetch recipes from both APIs
        const filteredRecipes = await fetchRecipeArray(cuisine, diet, allergies);
        const ingredientBasedRecipes = await fetchRecipeByIngredientsArray(ingredients);

        // ✅ Create a map of ID → missedIngredients
        const missedIngredientsMap = new Map(
          ingredientBasedRecipes.map(recipe => [recipe.id, recipe.missedIngredients || []])
        );

        const usedIngredientsMap = new Map(
          ingredientBasedRecipes.map(recipe => [recipe.id, recipe.usedIngredients || []])
        );

        // ✅ Find common recipes between both sources
        const filteredIDs = new Set(filteredRecipes.map(recipe => recipe.id));
        let commonRecipes = ingredientBasedRecipes.filter(recipe => filteredIDs.has(recipe.id));

        // ✅ Remove duplicates
        commonRecipes = Array.from(new Map(commonRecipes.map(recipe => [recipe.id, recipe])).values());

        console.log("Filtered Recipes:", filteredRecipes.length);
        console.log("Ingredient-Based Recipes:", ingredientBasedRecipes.length);
        console.log("Common Recipes (unique):", commonRecipes);

        // ✅ Fetch detailed recipe info & attach missedIngredients
        const detailedRecipePromises = commonRecipes.map(async (recipe) => {
          const detailedRecipe = await fetchIndividualRecipe(recipe.id);
          return {
            ...detailedRecipe,
            missedIngredients: missedIngredientsMap.get(recipe.id) || [],
            usedIngredients: usedIngredientsMap.get(recipe.id) || [],
          };
        });

        const detailedRecipes = await Promise.all(detailedRecipePromises);
        setRecipes(detailedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchData();
  }, [diet, allergies]); // ✅ Runs only after diet & allergies are set

  // ✅ Function to save recipe to cart & move to the next recipe
  const handleSaveToCartAndNext = (id, missedIngredients, title, imgSrc, imgAlt) => {
    const newEntry = { id, missedIngredients, title, imgSrc, imgAlt };
    setCart(prevCart => [...prevCart, newEntry]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  // ✅ Function to only move to next recipe (without saving to cart)
  const handleNextRecipe = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  return (
    <div>
      <NavBar cart={cart} />
      <div className="recipe-list">
        {recipes.length > 0 && (
          <RecipeCard
            {...recipes[currentIndex]}
            saveToCart={handleSaveToCartAndNext} // ✅ Save + Next
            nextRecipe={handleNextRecipe} // ✅ Just Next
          />
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;
