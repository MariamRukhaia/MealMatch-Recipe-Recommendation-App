import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

const OnboardingForm = () => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [diet, setDiet] = useState("");
  const [allergies, setAllergies] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      alert("No user found. Redirecting to register.");
      navigate("/register");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const username = localStorage.getItem("username"); 
      if (!username) {
        alert("No user found. Redirecting to register.");
        navigate("/register");
        return;
      }

      const response = await axios.post("http://127.0.0.1:5000/api/onboarding", {
        username,
        dietary_restrictions: dietaryRestrictions,
        diet,
        allergies
      });

      if (response.status === 200) {
        alert("Onboarding completed! Redirecting to cuisine selection...");
        localStorage.removeItem("username"); 
        navigate("/cuisine"); 
      }
      
    } catch (error) {
      console.error("Onboarding error:", error);
      alert(error.response?.data?.error || "An error occurred during onboarding.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <p className="text-3xl font-bold mb-6">Set Up Your Dietary Preferences</p>
      <form onSubmit={handleSubmit} className="w-[400px]">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center w-full">
            <label htmlFor="dietaryRestrictions" className="font-bold text-[#F1A030] w-40">
              Dietary Restrictions
            </label>
            <input
              type="text"
              id="dietaryRestrictions"
              required
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="border-2 rounded-md px-2 py-3 w-full"
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <label htmlFor="diet" className="font-bold text-[#F1A030] w-40">
              Diet
            </label>
            <input
              type="text"
              id="diet"
              required
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="border-2 rounded-md px-2 py-3 w-full"
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <label htmlFor="allergies" className="font-bold text-[#F1A030] w-40">
              Allergies
            </label>
            <input
              type="text"
              id="allergies"
              required
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="border-2 rounded-md px-2 py-3 w-full"
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingForm;
