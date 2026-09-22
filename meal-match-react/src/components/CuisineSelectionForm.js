import React, { useState } from "react";

const cuisinesList = [
    "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese",
    "Eastern European", "French", "German", "Greek", "Indian", "Irish",
    "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean",
    "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
];

const CuisineSelectionForm = ({ onSubmit }) => {
    const [selectedCuisines, setSelectedCuisines] = useState([]);

    const handleCuisineChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue && !selectedCuisines.includes(selectedValue)) {
            setSelectedCuisines([...selectedCuisines, selectedValue]);
        }
    };

    const handleRemoveCuisine = (cuisine) => {
        setSelectedCuisines(selectedCuisines.filter((item) => item !== cuisine));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCuisines.length === 0) {
            alert("Please select at least one cuisine.");
            return;
        }
        onSubmit(selectedCuisines);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            {}
            <select onChange={handleCuisineChange} className="border-2 px-4 py-2 rounded-md w-80">
                <option value="">Select a Cuisine</option>
                {cuisinesList.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                        {cuisine}
                    </option>
                ))}
            </select>

            {}
            <div className="mt-4 flex flex-wrap justify-center">
                {selectedCuisines.map((cuisine) => (
                    <span 
                        key={cuisine} 
                        className="inline-flex items-center bg-[#F1A030] text-white px-3 py-1 rounded-full mr-2 mt-2 cursor-pointer"
                    >
                        {cuisine} 
                        <button 
                            onClick={() => handleRemoveCuisine(cuisine)} 
                            className="ml-2 text-white font-bold text-lg"
                        >
                            ✖
                        </button>
                    </span>
                ))}
            </div>

            {}
            <button 
                type="submit" 
                className="mt-6 px-6 py-2 bg-[#F1A030] text-white font-bold rounded-md">
                Next
            </button>
        </form>
    );
};

export default CuisineSelectionForm;
