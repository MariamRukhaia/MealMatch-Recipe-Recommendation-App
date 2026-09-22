import React, { useState } from "react";
import Button from "./Button";

const ingredientsCategories = {
  Vegetables: ["Carrot", "Broccoli", "Spinach", "Potato", "Onion", "Tomato", "Garlic", "Pepper"],
  Fruits: ["Apple", "Banana", "Orange", "Strawberry", "Blueberry", "Pineapple", "Mango"],
  Dairy: ["Milk", "Cheese", "Butter", "Yogurt", "Cream", "Eggs"],
  Meat: ["Chicken", "Beef", "Pork", "Fish", "Turkey", "Lamb"],
  Grains: ["Rice", "Pasta", "Bread", "Oats", "Corn"],
  Spices: ["Salt", "Pepper", "Cinnamon", "Chili Powder", "Turmeric", "Basil"],
};

const IngredientsSelectionForm = ({ onSubmit }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((item) => item !== ingredient)
        : [...prevSelected, ingredient]
    );
  };

  const handleSubmit = () => {
    if (selectedIngredients.length === 0) {
      alert("Please select at least one ingredient.");
      return;
    }
    onSubmit(selectedIngredients);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="cuisine-selector w-[400px]">
        {Object.keys(ingredientsCategories).map((category) => (
          <div key={category} className="mb-4">
            <p className="font-bold">{category}</p>
            {ingredientsCategories[category].map((ingredient) => (
              <label key={ingredient} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={ingredient}
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={() => handleIngredientChange(ingredient)}
                />
                {ingredient}
              </label>
            ))}
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit}>Next</Button>
    </div>
  );
};

export default IngredientsSelectionForm;
