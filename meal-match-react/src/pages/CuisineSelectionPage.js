import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import CuisineSelectionForm from "../components/CuisineSelectionForm";

const CuisineSelectionPage = () => {
    const navigate = useNavigate();

    const handleCuisineSubmit = (selectedCuisines) => {
        const cuisinesString = selectedCuisines.map(cuisine => cuisine.toLowerCase()).join(",");
        console.log(cuisinesString);
        localStorage.setItem("selectedCuisines", cuisinesString);
        navigate("/ingredients");
    };    

    return (
        <div>
            {}
            <NavBar />

            {}
            <div className="flex flex-col items-center justify-center min-h-[80vh] mt-4">
                <p className="text-3xl font-bold mb-4 text-center text-[#F1A030]">
                    Welcome, Let’s Find A New Recipe!
                </p>
                <p className="text-lg mb-6 text-center">
                    What cuisine are you feeling today?
                </p>

                <CuisineSelectionForm onSubmit={handleCuisineSubmit} />
            </div>
        </div>
    );
};

export default CuisineSelectionPage;
