import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar"; 
import MealMatchGif from "../assets/MealMatch.gif"

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {}
      <NavBar />

      {}
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        {}
        <img src={MealMatchGif} alt="Meal Match Logo" className="w-32 mb-6" />

        <h2 className="text-3xl font-bold mb-4 text-center">Thank you for your order!</h2>
        <p className="text-lg text-center mb-6">Your ingredients will be delivered soon.</p>

        <button 
          onClick={() => navigate("/cuisine")}
          className="px-6 py-3 bg-[#F1A030] text-white font-bold rounded-md hover:bg-orange-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
