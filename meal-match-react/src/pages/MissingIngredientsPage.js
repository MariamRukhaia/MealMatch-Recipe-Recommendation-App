import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useMemo } from "react";

const MissingIngredientsPage = () => {
  const [cart, setCart] = useState({});
  const [wholeFoodsProducts, setWholeFoodsProducts] = useState({});
  const location = useLocation();
  const missedIngredients = useMemo(() => location.state?.missedIngredients || [], [location.state?.missedIngredients]);
  const missedIngredientNames = missedIngredients.map(ingredient => ingredient.name);
  console.log(missedIngredientNames);
  const navigate = useNavigate();

  const firstRender = useRef(true); // ✅ Track if it's the first render

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // ✅ Mark first render as done
  
      if (missedIngredientNames.length === 0) return; // ✅ Prevent unnecessary API calls
  
      const fetchWholeFoodsProducts = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/api/search-products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients: missedIngredientNames }),
          });
  
          const data = await response.json();
          console.log(data)
          setWholeFoodsProducts(data);
        } catch (error) {
          console.error("Error fetching Whole Foods products:", error);
        }
      };
  
      fetchWholeFoodsProducts();
      console.log(wholeFoodsProducts)
    }
  }, [missedIngredientNames]);  

  const addToCart = (item, category) => {
    const uniqueKey = `${category}-${item.product_name}`; // Unique key for each item
  
    setCart((prevCart) => ({
      ...prevCart,
      [uniqueKey]: prevCart[uniqueKey]
        ? { ...prevCart[uniqueKey], quantity: prevCart[uniqueKey].quantity + 1 }
        : { ...item, quantity: 1 },
    }));
  };
  
  const removeFromCart = (item, category) => {
    const uniqueKey = `${category}-${item.product_name}`; // Unique key for each item
  
    setCart((prevCart) => {
      if (!prevCart[uniqueKey]) return prevCart;
      const updatedQuantity = prevCart[uniqueKey].quantity - 1;
  
      if (updatedQuantity <= 0) {
        const newCart = { ...prevCart };
        delete newCart[uniqueKey]; 
        return newCart;
      }
  
      return {
        ...prevCart,
        [uniqueKey]: { ...prevCart[uniqueKey], quantity: updatedQuantity },
      };
    });
  };
  

  const goToSummary = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/order-summary");
  };

  return (
    <>
      <NavBar />

      <div className="container mx-auto p-6 flex flex-col items-center">
        {/* 🛒 Cart Display */}
        <div className="flex justify-between items-center w-full mb-6 mt-6">
          <h2 className="text-3xl font-medium">Buy the ingredients you are missing for your recipe!</h2>
          <div className="bg-yellow-500 text-white font-bold px-5 py-3 rounded-lg text-xl flex items-center shadow-lg">
            🛒 : {Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </div>

        {/* 🔄 Render Whole Foods Products */}
        {Object.keys(wholeFoodsProducts).map((category) => {
          if (!wholeFoodsProducts[category] || wholeFoodsProducts[category].length === 0) {
            return null; // Skip rendering empty categories
          }

          return (
            <div key={category} className="mb-8 w-full max-w-6xl mt-8"> {/* Adjust max-width for more space */}
              <p className="text-xl font-semibold mb-4">
                {category.replace(/\b\w/g, (char) => char.toUpperCase())}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center"> {/* 5 items per row */}
                {wholeFoodsProducts[category].map((item) => (
                  <div 
                    key={item.id} 
                    className="border-2 border-zinc-300 rounded-lg p-6 flex flex-col items-center shadow-lg w-48"
                  >
                    <img src={item.image_url} alt={item.product_name} className="w-24 h-24 mb-2" />
                    <div className="flex flex-col justify-between items-center h-24">
                      <p className="text-sm text-center">{item.product_name}</p>
                      <p className="font-semibold text-lg">${item.price.toFixed(2)}</p>
                    </div>

                    {/* ➕ ➖ Buttons */}
                    <div className="flex gap-3 mt-3 justify-center items-center">
                      <button 
                        onClick={() => removeFromCart(item, category)} 
                        className="bg-red-500 text-white font-bold rounded-full w-10 h-10 text-xl flex items-center justify-center"
                      >
                        -
                      </button>

                      <span className="font-bold text-lg">{cart[`${category}-${item.product_name}`]?.quantity || 0}</span>

                      <button 
                        onClick={() => addToCart(item, category)} 
                        className="bg-yellow-500 text-white font-bold rounded-full w-10 h-10 text-xl flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          );
        })}


        {/* 🛒 Checkout Button */}
        <button
          onClick={goToSummary} 
          className="bg-orange-500 text-white text-xl px-8 py-4 rounded-md mt-10 shadow-md"
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default MissingIngredientsPage;
