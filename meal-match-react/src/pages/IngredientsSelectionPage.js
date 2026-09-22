import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";


const ingredientOptions = {
  Vegetables: ["Carrot", "Broccoli", "Spinach", "Potato", "Onion", "Tomato", "Garlic", "Pepper"],
  Fruits: ["Apple", "Banana", "Orange", "Strawberry", "Blueberry", "Pineapple", "Mango"],
  Dairy: ["Milk", "Cheese", "Butter", "Yogurt", "Cream", "Eggs"],
  Meat: ["Chicken", "Beef", "Pork", "Fish", "Shrimp"],
  "Grains & Bread": ["Rice", "Pasta", "Bread", "Cereal", "Oats"],
  "Canned Goods": ["Beans", "Corn", "Tuna", "Peas", "Tomato Sauce"],
};
const IngredientsSelectionPage = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const navigate = useNavigate();

  const handleIngredientChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue && !selectedIngredients.includes(selectedValue)) {
      setSelectedIngredients([...selectedIngredients, selectedValue]);
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
  };

  const handleSubmit = async () => {
    if (selectedIngredients.length === 0) {
      alert("Please select at least one ingredient.");
      return;
    }

    const ingredientsString = selectedIngredients.join(",");


    console.log(ingredientsString);
    localStorage.setItem("selectedIngredients", ingredientsString.toLowerCase());
    navigate(`/discover`);
  }
  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/api/missing-ingredients", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ ingredients: ingredientsString }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       navigate(`/discover`);
  //     } else {
  //       alert("Error: " + data.error);
  //     }
  //   } catch (error) {
  //     console.error("Failed to process ingredients:", error);
  //   }
  // };


  return (
    <div className="flex flex-col items-center">
      <NavBar />
      <div className="mt-40 w-[600px] text-center">
        <p className="text-3xl font-bold mb-4 text-center text-[#F1A030]">What ingredients do you already have?</p>
        
        {}
        <select onChange={handleIngredientChange} className="border-2 px-4 py-2 rounded-md w-80">
          <option value="">Select an Ingredient</option>
          {Object.keys(ingredientOptions).map((category) => (
            <optgroup key={category} label={category}>
              {ingredientOptions[category].map((ingredient) => (
                <option key={ingredient} value={ingredient}>
                  {ingredient}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        {}
        <div className="mt-4">
          {selectedIngredients.map((ingredient) => (
            <span
              key={ingredient}
              className="inline-block bg-[#F1A030] text-white px-3 py-1 rounded-full mr-2 mt-2 cursor-pointer"
              onClick={() => handleRemoveIngredient(ingredient)}
            >
              {ingredient} ✖
            </span>
          ))}
        </div>

        {}
        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-2 bg-[#F1A030] text-white font-bold rounded-md hover:bg-orange-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IngredientsSelectionPage;
